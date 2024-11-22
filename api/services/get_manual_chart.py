from __future__ import annotations

from typing import Any

import pandas as pd
from api.models import ChartModel, FieldModel
from api.utils.field_name import replace_clingo_field_name

from .charts import chart_map

chart_cache: dict[tuple[FieldModel, ...], ChartModel] = {}
SpecModel = dict[str, Any]


def _clean_spec(spec: SpecModel) -> SpecModel:
  return {k: v for k, v in spec.items() if k not in ["data", "datasets", "$schema"]}


def get_manual_chart(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> ChartModel | None:
  key = "_".join([f.type for f in fields])
  try:
    if key in chart_map:
      spec = replace_clingo_field_name(_clean_spec(chart_map[key](df, fields).to_dict()))
      return ChartModel(fields=fields, spec=spec)
  except ValueError as V:
    print(key)
    print(V)
  except KeyError as K:
    print(key)
    print(K)
  return None
