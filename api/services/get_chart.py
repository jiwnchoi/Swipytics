from __future__ import annotations

import pandas as pd
from api.models import ChartModel, FieldModel

from .get_facts import get_facts_from_fields
from .get_specs import get_specs_from_facts

chart_cache = {}


def get_chart(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> ChartModel | None:
  if fields in chart_cache:
    return chart_cache[fields]

  facts = get_facts_from_fields(df, fields)
  specs = get_specs_from_facts(df, facts)
  chart = ChartModel(fields=fields, specs=specs) if specs else None
  chart_cache[fields] = chart

  return chart
