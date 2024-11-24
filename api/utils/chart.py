from __future__ import annotations

from typing import TYPE_CHECKING, Any, Optional

import pandas as pd

if TYPE_CHECKING:
  from api.models import ChartModel, FieldModel

from api.charts import chart_map
from api.utils.field_name import replace_clingo_field_name

chart_cache: dict[tuple["FieldModel", ...], "ChartModel"] = {}
SpecModel = dict[str, Any]


def _clean_spec(spec: SpecModel) -> SpecModel:
  return {k: v for k, v in spec.items() if k not in ["data", "datasets", "$schema"]}


def get_spec(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> Optional["ChartModel"]:
  key = "_".join([f.type for f in fields])
  try:
    if key in chart_map:
      spec = replace_clingo_field_name(_clean_spec(chart_map[key](df, fields).to_dict()))
      return spec
  except ValueError as V:
    print(key)
    print(V)
  except KeyError as K:
    print(key)
    print(K)

  return None


def check_fields(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> bool:
  key = "_".join([f.type for f in fields])
  if key in chart_map:
    return True
  return False
