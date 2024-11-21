from __future__ import annotations

import pandas as pd
from api.models import ChartModel, FieldModel

from .get_manual_chart import get_manual_chart

chart_cache: dict[tuple[FieldModel, ...], ChartModel] = {}


def get_chart(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> ChartModel | None:
  # if fields in chart_cache:
  #   cached_chart = chart_cache[fields]
  #   return ChartModel(fields=fields, specs=cached_chart.specs) if cached_chart else None

  # facts = get_facts_from_fields(df, fields)
  # specs = get_specs_from_facts(df, facts)
  # chart = ChartModel(fields=fields, specs=specs) if specs else None
  # if chart:
  #   chart_cache[fields] = chart
  # return chart
  print(fields)
  return get_manual_chart(df, fields)
