from __future__ import annotations

from typing import Self

import pandas as pd
from anyio import Path
from api.utils import (
  clear_field_name_cache,
  get_clingo_field_name,
  get_file_extension,
  get_timestamp,
)
from pydantic import BaseModel, ConfigDict, Field, model_validator

from .chart import Chart
from .data_field import DataField

NEW_FIELD_P = 0.2


class Session(BaseModel):
  df: pd.DataFrame = Field(default=None, repr=False)
  filename: str = Field(default="")
  timestamp: int = Field(default_factory=get_timestamp, init=False)
  charts: list["Chart"] = Field(default_factory=list, init=False)
  fields: list["DataField"] = Field(default_factory=list, init=False)

  model_config = ConfigDict(arbitrary_types_allowed=True)

  base_field: "DataField" | None = Field(default=None, init=False, repr=False)

  @model_validator(mode="after")
  def prosess_df(self) -> Self:
    clear_field_name_cache()
    if self.df is None:
      extension = get_file_extension(self.filename)
      self.df = getattr(pd, f"read_{extension}")(Path("./", self.filename))
      self.df = self.df if len(self.df) <= 5000 else self.df.sample(5000)
    self.fields = [
      DataField.from_dataframe(self.df, name) for name in self.df.columns
    ]
    self.df.rename(columns=get_clingo_field_name, inplace=True)
    return self
