from __future__ import annotations

from functools import cached_property
from pathlib import Path
from typing import Self

import pandas as pd
from api.utils import (
  get_clingo_field_name,
  get_file_extension,
  get_timestamp,
)
from api.utils.chart import check_fields
from pydantic import BaseModel, Field, model_validator

from .chart_model import ChartModel
from .field_model import FieldModel
from .model_config import DefaultConfig

NEW_FIELD_P = 0.2


class SessionModel(BaseModel):
  filename: str = Field(default="")
  df: pd.DataFrame = Field(default=None, repr=False, exclude=True)
  timestamp: int = Field(default_factory=get_timestamp, init=False)
  charts: list["ChartModel"] = Field(default_factory=list, init=False)
  fields: list["FieldModel"] = Field(default_factory=list, init=False)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def prosess_df(self) -> Self:
    if self.filename == "":
      return self

    if self.df is None:
      extension = get_file_extension(self.filename)
      self.df = getattr(pd, f"read_{extension}")(Path("data", self.filename))
      self.df = self.df if len(self.df) <= 5000 else self.df.sample(5000)
    self.fields = [FieldModel.from_dataframe(self.df, name) for name in self.df.columns]
    self.df.rename(columns=get_clingo_field_name, inplace=True)

    return self

  def get_attributes(self) -> list[tuple]:
    return [chart.attributes for chart in self.charts]

  @cached_property
  def available_fields(self) -> list[tuple[FieldModel, ...]]:
    len_1_fields = [(field,) for field in self.fields if field.type != "name"]

    len_2_fields = [
      (*field1, *field2)
      for i, field1 in enumerate(len_1_fields)
      for field2 in len_1_fields[i + 1 :]
    ]

    len_3_fields = [
      (*positional_fields, *extra_field)
      for positional_fields in len_2_fields
      for extra_field in len_1_fields
      if extra_field[0] not in positional_fields
    ]
    fields = [*len_1_fields, *len_2_fields, *len_3_fields]

    fields = [f for f in fields if check_fields(self.df, f)]
    print(len(fields))
    return fields

  @cached_property
  def visualizable_fields(self) -> list[FieldModel]:
    print(self.fields)
    return [field for field in self.fields if field.type != "name"]
