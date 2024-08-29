from dataclasses import dataclass, field
from typing import Any

from api.utils import get_timestamp


@dataclass
class Chart:
  facts: list[str] = field(default_factory=list)

  title: str = field(default="")
  description: str = field(default="")

  specs: list[dict[str, Any]] = field(default_factory=list)
  attributes: list[str] = field(default_factory=list)

  timestamp: int = field(
    default_factory=get_timestamp, init=False, repr=False, compare=False
  )
  key: str = field(init=False, repr=False, compare=False)

  def __post_init__(self):
    self.key = f"chart-{str(self.attributes)}"

  def __hash__(self):
    return hash(self.key)

  def to_dict(self) -> dict[str, Any]:
    return {
      "title": self.title,
      "description": self.description,
      "specs": self.specs,
      "attributes": self.attributes,
      "timestamp": self.timestamp,
    }

  def __asdict__(self) -> dict[str, Any]:
    return self.to_dict()
