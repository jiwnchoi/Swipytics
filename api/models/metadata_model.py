from typing import Literal

from api.models.model_config import DefaultConfig
from pydantic import BaseModel

FieldType = Literal["categorical", "datetime", "numeric", "name"]


class MetadataBase(BaseModel):
  type: Literal["categorical", "datetime", "numeric", "name"]
  count: int
  unique: int
  missing: int

  model_config = DefaultConfig


class MetadataNumeric(MetadataBase):
  type: Literal["numeric"]
  min: float
  max: float
  mean: float
  median: float
  std: float


class MetadataCategorical(MetadataBase):
  type: Literal["categorical"]
  top: str
  freq: int


class MetadataDatetime(MetadataBase):
  type: Literal["datetime"]
  min: str
  max: str


MetadataModel = MetadataBase | MetadataNumeric | MetadataCategorical | MetadataDatetime
