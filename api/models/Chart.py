from dataclasses import dataclass


@dataclass
class Chart:
  key: str
  title: str
  description: str
  spec: str  # TopLevelUnitSpec
