from dataclasses import dataclass, field

from api.utils import get_timestamp

from .chart import Chart


@dataclass
class Session:
  charts: list[Chart]
  groundingAttributes: list[str]
  timestamp: int = field(default_factory=get_timestamp)
  key: str = field(default="")

  def __post_init__(self):
    self.key = f"session-{self.timestamp}-{str(self.groundingAttributes)}"
