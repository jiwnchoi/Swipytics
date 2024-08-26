from dataclasses import field
from typing import Any

from api.utils import get_time_stamp

from .base import dataclass


@dataclass
class Chart:
  facts: list[str]

  title: str = field(default="")
  description: str = field(default="")

  specs: list[dict[str, Any]] = field(default_factory=list)
  attributes: list[str] = field(default_factory=list)

  time_stamp: int = field(default=get_time_stamp)

  @property
  def key(self) -> str:
    return f"chart-{self.time_stamp}-{str(self.attributes)}"
