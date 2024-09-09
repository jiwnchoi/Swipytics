import draco
import pandas as pd
from api.models import DataFieldModel


def _get_base_facts() -> list[str]:
  return [
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    ":- {entity(mark,_,_)} != 1.",
    # Exclude tick mark
    ":- attribute((mark,type),m0, tick).",
  ]


def _get_attribute_facts(df: pd.DataFrame, fields: list[str]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[fields])
  return draco.dict_to_facts(base_scheme)


def _get_encoding_facts(fields: list[str]) -> list[str]:
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


def get_facts_from_fields(df: pd.DataFrame, fields: list["DataFieldModel"]) -> list[str]:
  clingo_names = [field.clingo_name for field in fields]
  return (
    _get_base_facts() + _get_attribute_facts(df, clingo_names) + _get_encoding_facts(clingo_names)
  )
