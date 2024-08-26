from __future__ import annotations

from dataclasses import field
from functools import wraps
from typing import Any

import pandas as pd
from numpy.random import choice

from .base import dataclass
from .Chart import Chart
from .Session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list[Session] = field(default_factory=list)

  @property
  def undiscovered_attributes(self) -> list[str]:
    return [
      column
      for column in self.df.columns
      if column
      not in sum(
        (session.grounding_attributes for session in self.sessions), []
      )
    ]

  def get_next_session(self) -> Session:
    # grounding attribute 추후 변경 필요
    grounding_attribute = choice(self.undiscovered_attributes)

    session = Session(
      charts=[],
      grounding_attributes=[grounding_attribute],
    )
    self.sessions.append(session)
    return session
