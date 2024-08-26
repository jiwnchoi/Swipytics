from dataclasses import dataclass, field
from typing import Any

from api.utils import get_timestamp


@dataclass
class Chart:
  facts: list[str]

  title: str = field(default="")
  description: str = field(default="")

  specs: list[dict[str, Any]] = field(default_factory=list)
  attributes: list[str] = field(default_factory=list)

  timestamp: int = field(default_factory=get_timestamp)
  key: str = field(default="")

  def __post_init__(self):
    self.key = f"chart-{self.timestamp}-{str(self.attributes)}"
