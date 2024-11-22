from __future__ import annotations

import pandas as pd
from api.models import ChartModel, FieldModel
from api.utils import get_spec

chart_cache: dict[tuple[FieldModel, ...], ChartModel] = {}


def get_chart(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> ChartModel | None:
  if fields in chart_cache:
    cached_chart = chart_cache[fields]
    return ChartModel(fields=fields, spec=cached_chart.spec) if cached_chart else None

  # facts = get_facts_from_fields(df, fields)
  # specs = get_specs_from_facts(df, facts)
  spec = get_spec(df, fields)
  chart = ChartModel(fields=fields, spec=spec) if spec else None
  if chart:
    chart_cache[fields] = chart
  return chart
