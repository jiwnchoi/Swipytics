import draco
import pandas as pd
from api.models import FieldModel
from api.utils import rescale_field_to_32bit


def _get_base_facts() -> list[str]:
  return [
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    # Exclude tick mark
    ":- attribute((mark,type),m0, tick).",
    # Exclude Faceted Chart
    ":- {entity(facet,_,_)} > 0.",
  ]


def _get_attribute_facts(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[[f.clingo_name for f in fields]])
  base_scheme = {
    **base_scheme,
    "field": [rescale_field_to_32bit(f) for f in base_scheme["field"]],
  }
  facts = draco.dict_to_facts(base_scheme)
  return facts


def _get_encoding_facts(fields: tuple["FieldModel", ...]) -> list[str]:
  facts = [
    f
    for i, field in enumerate(fields)
    for f in [
      f"entity(encoding,m0,e{i}).",
      f"attribute((encoding,field),e{i},{field.clingo_name}).",
    ]
  ]

  if len(fields) == 3:
    facts.append(":- attribute((encoding,channel),e2,x).")
    facts.append(":- attribute((encoding,channel),e2,y).")

  return facts


def get_facts_from_fields(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  facts = _get_base_facts() + _get_attribute_facts(df, fields) + _get_encoding_facts(fields)

  return facts
