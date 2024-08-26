from __future__ import annotations

from dataclasses import dataclass, field
from typing import TYPE_CHECKING

import pandas as pd
from api.utils import get_timestamp

if TYPE_CHECKING:
  from .session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list["Session"] = field(default_factory=list)

  timestamp: int = field(default_factory=get_timestamp)

  @property
  def undiscovered_attributes(self) -> list[str]:
    return [
      column
      for column in self.df.columns
      if column
      not in sum((session.groundingAttributes for session in self.sessions), [])
    ]
