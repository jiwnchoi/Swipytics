import altair as alt
import pandas as pd
from api.models import TimeUnitType
from api.models.field_model import FieldModel


def heatmap_cc(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if len(fields) != 2 or fields[0].type != "categorical" or fields[1].type != "categorical":
    raise ValueError("Invalid number of fields for heatmap")
  return (
    alt.Chart(df)
    .mark_rect()
    .encode(x=fields[0].clingo_name, y=fields[1].clingo_name, color="count()")
  )


def heatmap_cc_n(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if (
    len(fields) != 3
    or fields[0].type != "categorical"
    or fields[1].type != "categorical"
    or fields[2].type != "numeric"
  ):
    raise ValueError("Invalid number of fields for heatmap")
  return (
    alt.Chart(df)
    .mark_rect()
    .encode(
      x=fields[0].clingo_name,
      y=fields[1].clingo_name,
      color=alt.Color(fields[2].clingo_name, aggregate="mean"),
    )
  )


def heatmap_ct(
  df: pd.DataFrame, fields: tuple[FieldModel, ...], time_unit: TimeUnitType = "year"
) -> alt.Chart:
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for heatmap")

  categorical_field = fields[0] if fields[0].type == "categorical" else fields[1]
  temporal_field = fields[1] if fields[0].type == "categorical" else fields[0]

  return (
    alt.Chart(df)
    .mark_rect()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=categorical_field.clingo_name,
      color="count()",
    )
  )


def heatmap_ct_n(
  df: pd.DataFrame, fields: tuple[FieldModel, ...], time_unit: TimeUnitType = "year"
) -> alt.Chart:
  if len(fields) != 3:
    raise ValueError("Invalid number of fields for heatmap")

  categorical_field = fields[0] if fields[0].type == "categorical" else fields[1]
  temporal_field = fields[1] if fields[0].type == "categorical" else fields[0]
  numeric_field = fields[2]

  return (
    alt.Chart(df)
    .mark_rect()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=categorical_field.clingo_name,
      color=alt.Color(numeric_field.clingo_name, aggregate="mean"),
    )
  )
