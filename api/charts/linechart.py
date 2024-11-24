from typing import TYPE_CHECKING

import altair as alt
import pandas as pd

if TYPE_CHECKING:
  from api.models import FieldModel, TimeUnitType


def linechart_ct(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
):
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for linechart")

  categorical_field = fields[0] if fields[0].type == "categorical" else fields[1]
  temporal_field = fields[1] if fields[0].type == "categorical" else fields[0]

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=alt.Y("count()"),
      color=categorical_field.clingo_name,
    )
  )


def linechart_nt(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
) -> alt.Chart:
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for linechart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  temporal_field = fields[1] if fields[0].type == "numeric" else fields[0]

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=alt.Y(numeric_field.clingo_name, aggregate="mean"),
    )
  )


def linechart_nt_c(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
) -> alt.Chart:
  if len(fields) != 3:
    raise ValueError("Invalid number of fields for linechart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  temporal_field = fields[1] if fields[0].type == "numeric" else fields[0]
  categorical_field = fields[2]

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=alt.Y(numeric_field.clingo_name, aggregate="mean"),
      color=categorical_field.clingo_name,
    )
  )


def linechart_t(
  df: pd.DataFrame,
  fields: tuple["FieldModel", ...],
) -> alt.Chart:
  if len(fields) != 1 and fields[0].type != "datetime":
    raise ValueError("Invalid field type for linechart_t")

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        fields[0].clingo_name,
        type="temporal",
      ),
      y="count()",
    )
  )
