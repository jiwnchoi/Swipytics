from api.models.chart_model import ChartModel
from api.models.session_model import SessionModel
from api.services import get_chart


def browse_charts(state: SessionModel, field_names: list[str]) -> list[ChartModel]:
  if not (field_names and (0 < len(field_names) <= 3)):
    raise ValueError("Invalid number of fields to browse")

  # Input fields
  all_fields = state.fields

  input_fields = (field for field in state.fields if field.name in field_names)

  # Add one more fields
  additional_fields = [field for field in all_fields if field not in input_fields]

  browse_fields = [
    input_fields,
    *[(*input_fields, field) for field in additional_fields],
  ]

  return [get_chart(state.df, fields) for fields in browse_fields]
