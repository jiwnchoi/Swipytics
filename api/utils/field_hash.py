from typing import TYPE_CHECKING, Sequence

if TYPE_CHECKING:
  from api.models import FieldModel


def get_fields_hash(fields: Sequence["FieldModel"]) -> int:
  names = tuple(field.name for field in fields)
  if len(names) == 1:
    return hash(names)
  elif len(names) in (2, 3):
    return hash(tuple(sorted(names[:2]))) + (hash(names[2]) if len(names) == 3 else 0)
  return 0
