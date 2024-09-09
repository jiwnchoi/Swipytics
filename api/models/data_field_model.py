import pandas as pd
from api.models.model_config import DefaultConfig
from api.utils.field_name import get_clingo_field_name
from pydantic import BaseModel

from .metadata_model import (
  FieldType,
  MetadataBase,
  MetadataCategorical,
  MetadataDatetime,
  MetadataModel,
  MetadataNumeric,
)


def get_field_type(df: pd.DataFrame, name: str) -> FieldType:
  dtype = df[name].dtype

  if "date" in str(dtype):
    return "datetime"

  if pd.api.types.is_numeric_dtype(dtype):
    return "numeric"

  if df[name].nunique() > 100:
    return "name"

  return "categorical"


def get_field_metadata(df: pd.DataFrame, name: str) -> MetadataModel:
  type = get_field_type(df, name)

  if type == "numeric":
    return MetadataNumeric(
      type=type,
      count=len(df),
      unique=df[name].nunique(),
      missing=df[name].isnull().sum(),
      min=df[name].min(),
      max=df[name].max(),
      mean=df[name].mean(),
      median=df[name].median(),
      std=df[name].std(),
    )

  if type == "categorical":
    return MetadataCategorical(
      type=type,
      count=len(df),
      unique=df[name].nunique(),
      missing=df[name].isnull().sum(),
      top=str(df[name].mode().iloc[0]),
      freq=int(df[name].value_counts().iloc[0]),
    )

  if type == "datetime":
    return MetadataDatetime(
      type=type,
      count=len(df),
      unique=df[name].nunique(),
      missing=df[name].isnull().sum(),
      min=str(df[name].min()),
      max=str(df[name].max()),
    )

  return MetadataBase(
    type=type,
    count=len(df),
    unique=df[name].nunique(),
    missing=df[name].isnull().sum(),
  )


class DataFieldModel(BaseModel):
  name: str
  type: FieldType
  clingo_name: str
  metadata: MetadataModel

  model_config = DefaultConfig

  @classmethod
  def from_dataframe(cls, df: pd.DataFrame, name: str):
    metadata = get_field_metadata(df, name)
    return cls(
      name=name,
      type=metadata.type,
      clingo_name=get_clingo_field_name(name),
      metadata=metadata,
    )

  def __hash__(self) -> int:
    return hash(self.name)
