from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import pandas as pd
from api.utils import get_file_extension
from api.utils.field_name import get_clingo_field_name
from vega_datasets import data

if TYPE_CHECKING:
  from api.models.session import Session


def is_name_attribute(series: pd.Series) -> bool:
  return series.nunique() >= 30 and not pd.api.types.is_numeric_dtype(series)


def load_data(session: "Session", filename: str | None = None) -> None:
  df: pd.DataFrame
  if filename is None:
    session.filename = "Cars"
    df = pd.DataFrame(data.cars())
  else:
    session.filename = filename
    extension = get_file_extension(filename)
    df = getattr(pd, f"read_{extension}")(Path("./", filename))

  # Identify name attributes
  name_attributes = [col for col in df.columns if is_name_attribute(df[col])]

  # Filter out name attributes from field_name
  session.field_name = [col for col in df.columns if col not in name_attributes]
  session.clingo_field_name = get_clingo_field_name(session.field_name)

  # Rename columns for the dataframe
  rename_dict = {
    col: get_clingo_field_name([col])[0] for col in session.field_name
  }
  session.df = df.rename(columns=rename_dict)
