from dataclasses import dataclass

from .Chart import Chart


@dataclass
class Session:
  time_stamp: int
  key: str
  charts: list[Chart]
  grounding_attributes: list[str]
