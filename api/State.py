from __future__ import annotations

from dataclasses import field

import pandas as pd
from altair import TopLevelUnitSpec
from pydantic.dataclasses import dataclass


@dataclass
class Chart:
  key: str
  title: str
  description: str
  spec: TopLevelUnitSpec


@dataclass
class Session:
  time_stamp: int
  key: str
  charts: list[Chart]
  grounding_attributes: list[str]


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list[Session] = field(default_factory=list)


__all__ = [
  "State",
  "Session",
  "Chart",
]
