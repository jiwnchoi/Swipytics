from typing import TYPE_CHECKING, Any, Dict, List, Self

from api.utils import get_timestamp
from pydantic import BaseModel, Field, model_validator

if TYPE_CHECKING:
  from api.models.data_field import DataField


class Chart(BaseModel):
  facts: List[str] = Field(default_factory=list)
  title: str = ""
  description: str = ""
  specs: List[Dict[str, Any]] = Field(default_factory=list)
  spec_index: int = Field(default=0, alias="specIndex")
  preferred: bool = False
  timestamp: int = Field(default_factory=get_timestamp)
  fields: list["DataField"] = Field(default_factory=list)
  key: str = Field(default="", init=False, repr=False)

  @model_validator(mode="after")
  def set_key(self) -> Self:
    self.key = f"chart-{str([field.name for field in self.fields])}"
    return self

  def __hash__(self):
    return hash(self.key)
