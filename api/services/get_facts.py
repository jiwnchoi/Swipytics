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
    "attribute(task,root,summary).",
  ]


def _get_attribute_facts(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[[f.clingo_name for f in fields]])
  base_scheme = {
    **base_scheme,
    "field": [rescale_field_to_32bit(f) for f in base_scheme["field"]],
  }
  return draco.dict_to_facts(base_scheme)


def _get_encoding_facts(fields: tuple["FieldModel", ...]) -> list[str]:
  return [
    f
    for i, (field, channel) in enumerate(zip(fields, ["x", "y", "color"]))
    for f in [
      f"entity(encoding,m0,e{i}).",
      f"attribute((encoding,field),e{i},{field.clingo_name}).",
      f"attribute((encoding,channel),e{i},{channel}).",
      # no bin if field type is datetime
      f":- attribute((encoding,binning),e{i},_)." if field.type == "datetime" else None,
      f"entity(scale,v0,s{i})." if field.scale and field.type != "datetime" else None,
      f"attribute((scale,channel),s{i},{channel})."
      if field.scale and field.type != "datetime"
      else None,
      f"attribute((scale,type),s{i},{'ordinal' if channel in ['x', 'y'] else field.scale})."
      if field.scale and field.type != "datetime"
      else None,
    ]
    if f is not None
  ]


def get_facts_from_fields(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  return _get_base_facts() + _get_attribute_facts(df, fields) + _get_encoding_facts(fields)
