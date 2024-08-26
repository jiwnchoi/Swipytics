from __future__ import annotations

from dataclasses import field
from typing import TYPE_CHECKING

import pandas as pd

from .base import dataclass

if TYPE_CHECKING:
  from .session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list["Session"] = field(default_factory=list)

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
