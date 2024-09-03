from __future__ import annotations

import numpy as np
from api.models import DataField, Session
from api.utils.decorators import df_required
from numpy.random import choice

NEW_FIELD_P = 0.2


def _get_base_field(self: "Session") -> "DataField":
  p = np.full(len(self.fields), 1 / len(self.fields))
  return choice(self.fields, 1, p=p)[0]


def _get_rest_fields(
  self, fields: list["DataField"], n: int = 1
) -> list["DataField"]:
  new_fields = [field for field in self.fields if field not in fields]
  if len(new_fields) == 0:
    raise ValueError("No new fields")
  p = np.full(len(new_fields), 1 / len(new_fields))
  return choice(new_fields, n, p=p)


@df_required
def get_fields(self: Session) -> list[str]:
  if self.base_field is None:
    self.base_field = _get_base_field(self)
    return [self.base_field]

  # if len(self.used_charts[self.base_field]) == len(self.fields) - 1:
  #   self.base_field = _get_base_field(self)
  #   return [self.base_field]

  # if choice([True, False], 1, p=[NEW_FIELD_P, 1 - NEW_FIELD_P])[0]:
  #   self.base_field = self._get_base_field()
  #   return [self.base_field]

  # return [self.base_field, *self._get_rest_fields([self.base_field])]
