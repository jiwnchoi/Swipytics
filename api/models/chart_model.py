from typing import Any, Dict, List, Self

from api.utils import get_timestamp
from pydantic import BaseModel, Field, model_validator

from .data_field_model import DataFieldModel
from .model_config import DefaultConfig


class ChartModel(BaseModel):
  fields: tuple[DataFieldModel, ...] = Field(default_factory=tuple)
  specs: List[Dict[str, Any]] = Field(default_factory=list)
  title: str = Field(default="")
  description: str = Field(default="")

  spec_index: int = Field(default=0, init=False)
  preferred: bool = Field(default=False, init=False)
  timestamp: int = Field(default_factory=get_timestamp, init=False)

  attributes: tuple[str, ...] = Field(default_factory=tuple, init=False)
  key: str = Field(default="", init=False, repr=False)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def after(self) -> Self:
    self.attributes = tuple([field.name for field in self.fields])
    self.key = f"chart-{str([field for field in self.attributes])}-{self.timestamp}"
    return self

  def __hash__(self):
    return hash(self.fields)
