from api.models import ChartModel, SessionModel

from .get_chart import get_chart


def browse_charts(state: SessionModel, field_names: list[str]) -> list[ChartModel]:
  if not (field_names and (0 < len(field_names) <= 3)):
    raise ValueError("Invalid number of fields to browse")

  browsed_fields = [
    field_tuple
    for field_tuple in state.available_fields
    if len(field_tuple) <= (len(field_names) + 1)
    if all(field_name in [f.name for f in field_tuple] for field_name in field_names)
  ]

  browsed_fields = sorted(browsed_fields, key=lambda field_tuple: len(field_tuple))
  charts = [get_chart(state.df, fields) for fields in browsed_fields]
  return [chart for chart in charts if chart]
