from __future__ import annotations

from dataclasses import dataclass, field

import draco
import pandas as pd

from .Session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list[Session] = field(default_factory=list)

  def get_base_facts(self):
    base_scheme = draco.schema_from_dataframe(self.df)
    base_facts = draco.dict_to_facts(base_scheme)

    return [
      *base_facts,
      "entity(view,root,v0).",
      "entity(mark,v0,m).",
    ]
