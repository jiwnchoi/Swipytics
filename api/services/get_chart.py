from __future__ import annotations

import pandas as pd
from api.models import ChartModel, DataFieldModel

from .get_facts import get_facts_from_fields
from .get_specs import get_specs_from_facts


def get_chart(df: pd.DataFrame, fields: tuple[DataFieldModel, ...]) -> ChartModel | None:
  facts = get_facts_from_fields(df, fields)
  specs = get_specs_from_facts(df, facts)
  return None if not specs else ChartModel(fields=fields, specs=specs)
