from __future__ import annotations

from typing import Literal

import pandas as pd
from api.utils import get_clingo_field_name
from pydantic import BaseModel

from .metadata_model import (
  FieldType,
  MetadataBase,
  MetadataCategorical,
  MetadataDatetime,
  MetadataModel,
  MetadataNumeric,
)
from .model_config import DefaultConfig

# warnings.filterwarnings("ignore")


def get_series_and_type(series: pd.Series) -> tuple[pd.Series, FieldType]:
  if pd.api.types.is_numeric_dtype(series):
    return series, "numeric"

  if pd.api.types.is_datetime64_any_dtype(series):
    return series, "datetime"

  try:
    return pd.to_datetime(series, errors="raise", format="mixed"), "datetime"
  except Exception:
    if series.nunique() > 10:
      return series, "name"

    return series, "categorical"


def get_field_metadata(series: pd.Series, type: FieldType) -> MetadataModel:
  if type == "numeric":
    return MetadataNumeric(
      type=type,
      count=len(series),
      unique=series.nunique(),
      missing=series.isnull().sum(),
      min=series.min(),
      max=series.max(),
      mean=series.mean(),
      median=series.median(),
      std=series.std(),
    )

  if type == "categorical":
    return MetadataCategorical(
      type=type,
      count=len(series),
      unique=series.nunique(),
      missing=series.isnull().sum(),
      top=str(series.mode().iloc[0]),
      freq=int(series.value_counts().iloc[0]),
    )

  if type == "datetime":
    return MetadataDatetime(
      type=type,
      count=len(series),
      unique=series.nunique(),
      missing=series.isnull().sum(),
      min=str(series.min()),
      max=str(series.max()),
      year_unique=series.dt.year.nunique(),
      month_unique=series.dt.month.nunique(),
      day_unique=series.dt.day.nunique(),
      hours_unique=series.dt.hour.nunique(),
    )

  return MetadataBase(
    type=type,
    count=len(series),
    unique=series.nunique(),
    missing=series.isnull().sum(),
  )


class FieldModel(BaseModel):
  name: str
  type: FieldType
  clingo_name: str
  metadata: MetadataModel

  model_config = DefaultConfig

  @classmethod
  def from_dataframe(cls, df: pd.DataFrame, name: str):
    series, series_type = get_series_and_type(df[name])
    metadata = get_field_metadata(series, series_type)
    clingo_name = get_clingo_field_name(name)
    series = series.rename(clingo_name)
    df[name] = series

    return cls(
      name=name,
      type=series_type,
      clingo_name=clingo_name,
      metadata=metadata,
    )

  @property
  def scale(self) -> Literal["ordinal", "categorical", "linear"] | None:
    if self.type == "numeric" and self.metadata.unique < 30:
      return "ordinal"
    if self.type == "categorical":
      return "categorical"
    return None

  def __hash__(self) -> int:
    return hash(self.name)
