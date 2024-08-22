from __future__ import annotations

from dataclasses import dataclass, field

import pandas as pd

from .Session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list[Session] = field(default_factory=list)
