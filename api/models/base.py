import re
from dataclasses import MISSING, fields
from dataclasses import dataclass as dataclass_base
from typing import Any, Dict


def snake_to_camel(string: str) -> str:
  return re.sub(r"_([a-z])", lambda m: m.group(1).upper(), string)


def convert_dict_keys_to_camel_case(d: Dict[str, Any]) -> Dict[str, Any]:
  new_dict = {}
  for key, value in d.items():
    if isinstance(value, dict):
      value = convert_dict_keys_to_camel_case(value)
    elif isinstance(value, list):
      value = [
        convert_dict_keys_to_camel_case(v) if isinstance(v, dict) else v
        for v in value
      ]
    new_dict[snake_to_camel(key)] = value
  return new_dict


def dataclass(_cls=None, **kwargs):
  def wrap(cls):
    cls = dataclass_base(cls, **kwargs)

    def __post_init__(self):
      for field in fields(self):
        if field.default is not MISSING or field.default_factory is not MISSING:
          continue
        if not hasattr(self, field.name):
          setattr(self, field.name, None)

      if hasattr(self, "post_init_hook"):
        self.post_init_hook()

    def to_dict(self):
      return convert_dict_keys_to_camel_case(
        {f.name: getattr(self, f.name) for f in fields(self)}
      )

    def __iter__(self):
      for key, value in self.to_dict().items():
        yield key, value

    cls.__post_init__ = __post_init__
    cls.to_dict = to_dict
    cls.__iter__ = __iter__
    return cls

  if _cls is None:
    return wrap
  return wrap(_cls)
