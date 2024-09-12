import draco
import pandas as pd
from api.models import DataFieldModel
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


def _get_attribute_facts(df: pd.DataFrame, fields: list[str]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[fields])
  base_scheme = {
    **base_scheme,
    "field": [rescale_field_to_32bit(f) for f in base_scheme["field"]],
  }
  facts = draco.dict_to_facts(base_scheme)
  return facts


def _get_encoding_facts(fields: list[str]) -> list[str]:
  facts = [
    f
    for i, field in enumerate(fields)
    for f in [f"entity(encoding,m0,e{i}).", f"attribute((encoding,field),e{i},{field})."]
  ]
  facts.extend(
    f"attribute((encoding,channel),e{i},{'x' if i == 0 else 'y'})."
    for i in range(min(2, len(fields)))
  )
  return facts


def get_facts_from_fields(df: pd.DataFrame, fields: tuple["DataFieldModel", ...]) -> list[str]:
  clingo_names = [field.clingo_name for field in fields]
  facts = (
    _get_base_facts() + _get_attribute_facts(df, clingo_names) + _get_encoding_facts(clingo_names)
  )
  return facts
