from __future__ import annotations

from typing import TYPE_CHECKING, Any, Self, cast

from api.utils import get_fields_hash, get_timestamp
from numpy import argmax
from pydantic import BaseModel, Field, model_validator

from .field_model import FieldModel
from .model_config import DefaultConfig

if TYPE_CHECKING:
  from .metadata_model import MetadataDatetime

timeFormats = {
  "year": "%Y",
  "month": "%b",
  "day": "%a",
  "hours": "%H",
}


class ChartModel(BaseModel):
  fields: tuple[FieldModel, ...] = Field(default_factory=tuple)
  spec: Any = Field(default_factory=dict)
  title: str = Field(default="")
  description: str = Field(default="")

  preferred: bool = Field(default=False, init=False)
  timestamp: int = Field(default_factory=get_timestamp, init=False)

  attributes: tuple[str, ...] = Field(default_factory=tuple, init=False)
  key: str = Field(default="", init=False, repr=False)

  time_unit: str | None = Field(default=None)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def after(self) -> Self:
    self.attributes = tuple([field.clingo_name for field in self.fields])
    self.key = f"chart-{str([field for field in self.attributes])}-{self.timestamp}"
    self.title = " & ".join([field.clingo_name for field in self.fields])

    if "datetime" in [field.type for field in self.fields]:
      datetimefield = [field for field in self.fields if field.type == "datetime"][0]
      metadata = cast("MetadataDatetime", datetimefield.metadata)
      self.time_unit = ["year", "month", "day", "hours"][
        argmax(
          [
            metadata.year_unique,
            metadata.month_unique,
            metadata.day_unique,
            metadata.hours_unique,
          ]
        )
      ]

      self.spec = {
        **self.spec,
        "config": {
          **self.spec.get("config", {}),
          "axisTemporal": {
            "format": timeFormats[self.time_unit],
          },
        },
        "transform": [
          {
            "timeUnit": self.time_unit,
            "field": datetimefield.name,
            "as": datetimefield.name,
          },
        ],
      }

    return self

  def __hash__(self):
    return get_fields_hash(self.fields)
