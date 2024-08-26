from dataclasses import field

from api.store import state
from api.utils import get_time_stamp
from numpy.random import choice

from .base import dataclass
from .Chart import Chart


@dataclass
class Session:
  charts: list[Chart]
  grounding_attributes: list[str]
  time_stamp: int = field(default_factory=get_time_stamp)

  @property
  def key(self):
    return f"session-{self.time_stamp}-{str(self.grounding_attributes)}"

  def get_sub_attribute(self, n=1) -> list[str]:
    if len(self.grounding_attributes) + n > 3:
      raise ValueError("Too many attributes")

    all_attributes = state.df.columns
    attributes = [
      attr for attr in all_attributes if attr not in self.grounding_attributes
    ]

    return choice(attributes, n, replace=False).tolist()
