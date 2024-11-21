from __future__ import annotations

from math import log
from typing import Literal, TypeAlias, TypedDict

# Field types recognized by a Draco schema.
FieldType: TypeAlias = Literal["number", "string", "boolean", "datetime"]


class BaseFieldProps(TypedDict):
  """Properties shared by fields of all types in a `Schema`."""

  name: str
  type: FieldType
  unique: int
  entropy: float


class NumberFieldProps(BaseFieldProps):
  """Properties of a `number` field in a `Schema`."""

  min: int
  max: int
  std: int


class StringFieldProps(BaseFieldProps):
  """Properties of a `string` field in a `Schema`."""

  freq: int


# Union of supported field properties.
FieldProps = NumberFieldProps | StringFieldProps | BaseFieldProps

MAX_32BIT = 2**31 - 1


def rescale_field_to_32bit(data: FieldProps):
  new_data = data.copy()

  if (
    "max" in new_data
    and "min" in new_data
    and "std" in new_data
    and "entropy" in new_data
    and new_data["max"] > MAX_32BIT
  ):
    scale_factor = 1 / (10 * new_data["max"] / MAX_32BIT)  # type: ignore

    new_data["max"] = (
      int(new_data["max"] * scale_factor)
      if isinstance(new_data["max"], (int, float))
      else new_data["max"]
    )
    new_data["min"] = (
      int(new_data["min"] * scale_factor)
      if isinstance(new_data["min"], (int, float))
      else new_data["min"]
    )
    new_data["std"] = (
      int(new_data["std"] * scale_factor)
      if isinstance(new_data["std"], (int, float))
      else new_data["std"]
    )

    new_data["entropy"] = (
      int(new_data["entropy"] + log(scale_factor) * 1000)
      if isinstance(new_data["entropy"], (int, float))
      else new_data["entropy"]
    )

  return new_data
