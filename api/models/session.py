from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any, cast

import numpy as np
import pandas as pd
from api.utils import df_required, find_index, get_timestamp
from numpy.random import choice

if TYPE_CHECKING:
  from .chart import Chart

NEW_FIELD_P = 0.2


@dataclass
class Session:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  charts: list["Chart"] = field(default_factory=list)

  timestamp: int = field(default_factory=get_timestamp, init=False)
  used_charts: defaultdict[str, set] = cast(
    defaultdict[str, set],
    field(default_factory=lambda: defaultdict(set), init=False, repr=False),
  )
  field_name: list[str] = field(default_factory=list, init=False, repr=False)
  clingo_field_name: list[str] = field(
    default_factory=list, init=False, repr=False
  )

  base_field: str | None = field(default=None, init=False, repr=False)

  def asdict(self) -> dict[str, Any]:
    return {
      "filename": self.filename,
      "timestamp": self.timestamp,
      "charts": [chart.to_dict() for chart in self.charts],
    }

  def __asdict__(self) -> dict[str, Any]:
    return self.asdict()

  @df_required
  def convert_name(self, name: str) -> str:
    if name.startswith("field_"):
      return self.field_name[
        find_index(self.clingo_field_name, lambda x: x == name)
      ]
    else:
      return self.clingo_field_name[
        find_index(self.field_name, lambda x: x == name)
      ]

  def _get_base_field(self) -> str:
    base_fields = self.clingo_field_name

    # 확률 처리 알고리즘
    p = np.full(len(base_fields), 1 / len(base_fields))

    return choice(base_fields, 1, p=p).tolist()[0]

  def _get_rest_fields(self, fields: list[str], n: int = 1) -> list[str]:
    new_fields = [
      field for field in self.clingo_field_name if field not in fields
    ]

    if len(new_fields) == 0:
      raise ValueError("No new fields")

    p = np.full(len(new_fields), 1 / len(new_fields))

    return [*choice(new_fields, n, p=p).tolist()]

  @df_required
  def get_fields(self) -> list[str]:
    if self.base_field is None:
      self.base_field = self._get_base_field()
      return [self.base_field]

    if len(self.used_charts[self.base_field]) == self.clingo_field_name:
      self.base_field = self._get_base_field()
      return [self.base_field]

    # Routing to the new base field
    if choice([True, False], 1, p=[NEW_FIELD_P, 1 - NEW_FIELD_P])[0]:
      print("New base field")
      self.base_field = self._get_base_field()
      return [self.base_field]

    return [self.base_field, *self._get_rest_fields([self.base_field])]
