from __future__ import annotations

from dataclasses import dataclass, field
from typing import TYPE_CHECKING, cast

import numpy as np
import pandas as pd
from api.utils import get_clingo_field_name, get_timestamp
from numpy.random import choice

if TYPE_CHECKING:
  from .chart import Chart


@dataclass
class Session:
  df: pd.DataFrame
  filename: str
  charts: list["Chart"] = field(default_factory=list)

  timestamp: int = field(default_factory=get_timestamp, init=False)
  used_charts = field(default_factory=set, init=False, repr=False)

  current_base_field: str = field(init=False, repr=False)

  def __post_init__(self):
    self.field_name = list(self.df.columns)
    self.clingo_field_name = get_clingo_field_name(self.field_name)

    self.current_base_field = cast(str, choice(self.clingo_field_name, 1)[0])

    self.p_base_field = np.full(
      len(self.clingo_field_name), 1 / len(self.clingo_field_name)
    )

  def append_chart(self):
    pass
