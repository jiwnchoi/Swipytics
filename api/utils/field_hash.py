from typing import Sequence, TypeVar

T = TypeVar("T")


def get_fields_hash(fields: Sequence[T]) -> int:
  if len(fields) == 1:
    return hash(fields[0])
  elif len(fields) == 2:
    return hash(set(fields))
  elif len(fields) == 3:
    return hash(set(fields[:2])) + hash(fields[2])
  else:
    return 0
