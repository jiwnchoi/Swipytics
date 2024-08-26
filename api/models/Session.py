from dataclasses import field

from api.utils import get_time_stamp

from .base import dataclass
from .chart import Chart


@dataclass
class Session:
  charts: list[Chart]
  grounding_attributes: list[str]
  time_stamp: int = field(default_factory=get_time_stamp)

  @property
  def key(self):
    return f"session-{self.time_stamp}-{str(self.grounding_attributes)}"
