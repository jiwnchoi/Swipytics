import draco
from api.state import state


def get_base_facts() -> list[str]:
  return [
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    ":- {entity(mark,_,_)} != 1.",
  ]


def get_attribute_facts(fields: list[str]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(state.df[fields])
  return draco.dict_to_facts(base_scheme)


def get_encoding_facts(fields: list[str]) -> list[str]:
  return sum(
    [
      [
        f"entity(encoding,m0,e{code}).",
        f"attribute((encoding,field),e{code},{field}).",
      ]
      for code, field in enumerate(fields)
    ],
    [],
  )


def get_facts(fields: list[str]) -> list[str]:
  print(fields, type(fields))
  return (
    get_base_facts() + get_attribute_facts(fields) + get_encoding_facts(fields)
  )


__all__ = [
  "get_base_facts",
  "get_encoding_facts",
  "get_attribute_facts",
  "get_facts",
]
