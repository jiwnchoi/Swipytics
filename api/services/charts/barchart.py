import altair as alt
import pandas as pd
from api.models.field_model import FieldModel


def barchart_n(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if len(fields) != 1 and fields[0].type != "numeric":
    raise ValueError("Invalid field type for histogram")

  return (
    alt.Chart(df)
    .mark_bar()
    .encode(
      x=alt.X(
        fields[0].clingo_name,
        bin=True if fields[0].metadata.unique > 20 else False,
        type="quantitative" if fields[0].metadata.unique > 20 else "ordinal",
      ),
      y="count()",
    )
  )


def barchart_c(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if len(fields) != 1 and fields[0].type != "categorical":
    raise ValueError("Invalid field type for barchart_categorical")

  return alt.Chart(df).mark_bar().encode(x=alt.X(fields[0].clingo_name), y="count()")


# Bivariate
def barchart_nc(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for barchart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  categorical_field = fields[1] if fields[0].type == "numeric" else fields[0]

  return (
    alt.Chart(df)
    .mark_bar()
    .encode(x=categorical_field.clingo_name, y=alt.Y(numeric_field.clingo_name, aggregate="mean"))
  )


# Trivariate
def barchart_nc_c(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if len(fields) != 3:
    raise ValueError("Invalid number of fields for barchart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  categorical_field = fields[1] if fields[0].type == "numeric" else fields[0]
  color_field = fields[2]

  return (
    alt.Chart(df)
    .mark_bar()
    .encode(
      x=categorical_field.clingo_name,
      y=alt.Y(numeric_field.clingo_name, aggregate="mean"),
      color=color_field.clingo_name,
      xOffset=color_field.clingo_name,
    )
  )
