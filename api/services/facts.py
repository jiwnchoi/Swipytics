import draco
import pandas as pd


def get_base_facts(df: pd.DataFrame) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df)
  base_facts = draco.dict_to_facts(base_scheme)

  return [
    *base_facts,
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    ":- {entity(mark,_,_)} != 1.",
  ]


def get_attribute_facts(field: str, code: int = 0) -> list[str]:
  field = field.replace(" ", "_")
  field = field[0].lower() + field[1:]

  return [
    f"entity(encoding,m0,e{code}).",
    f"attribute((encoding,field),e{code},{field}).",
  ]


__all__ = ["get_base_facts", "get_attribute_facts"]
