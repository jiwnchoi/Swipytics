from typing import TYPE_CHECKING, Sequence

if TYPE_CHECKING:
  from api.models import FieldModel


def get_fields_hash(fields: Sequence["FieldModel"]) -> int:
  names = tuple(field.name for field in fields)
  if len(names) == 1:
    return hash(names)
  if len(names) == 2:
    return hash(names[0]) + hash(names[1])
  if len(names) == 3:
    return hash(hash(names[0]) + hash(names[1])) + hash(names[2])
  return 0
