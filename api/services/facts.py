import draco
import pandas as pd
from api.utils import get_clingo_field_name


def get_base_facts(df: pd.DataFrame) -> list[str]:
  df.columns = [get_clingo_field_name(col) for col in df.columns]
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
  return [
    f"entity(encoding,m0,e{code}).",
    f"attribute((encoding,field),e{code},{get_clingo_field_name(field)}).",
  ]


__all__ = ["get_base_facts", "get_attribute_facts"]
