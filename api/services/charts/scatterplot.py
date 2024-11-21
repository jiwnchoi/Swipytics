import altair as alt
import pandas as pd
from api.models.field_model import FieldModel

# Bivariate


def scatterplot_nn(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if len(fields) != 2 or fields[0].type != "numeric" or fields[1].type != "numeric":
    raise ValueError("Invalid number of fields for scatterplot")
  return alt.Chart(df).mark_point().encode(x=fields[0].clingo_name, y=fields[1].clingo_name)


# Trivariate
def scatterplot_nnn(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if (
    len(fields) != 3
    or fields[0].type != "numeric"
    or fields[1].type != "numeric"
    or fields[2].type != "numeric"
  ):
    raise ValueError("Invalid number of fields for scatterplot")
  return (
    alt.Chart(df)
    .mark_point()
    .encode(x=fields[0].clingo_name, y=fields[1].clingo_name, size=fields[2].clingo_name)
  )


def scatterplot_nn_c(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> alt.Chart:
  if (
    len(fields) != 3
    or fields[0].type != "numeric"
    or fields[1].type != "numeric"
    or fields[2].type != "categorical"
  ):
    raise ValueError("Invalid number of fields for scatterplot")
  return (
    alt.Chart(df)
    .mark_point()
    .encode(x=fields[0].clingo_name, y=fields[1].clingo_name, color=fields[2].clingo_name)
  )
