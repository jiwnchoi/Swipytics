from __future__ import annotations

from typing import TypeVar

import numpy as np
from api.models import ChartModel, FieldModel, SessionModel
from api.services import get_chart
from api.utils import (
  find_last_index,
  get_fields_hash,
  has_categorical_categorical_stat,
  has_numeric_categorical_stat,
  has_numeric_datetime_stat,
  has_numeric_numeric_stat,
  sample,
)

T = TypeVar("T")


def get_cognition_penalty(fields: tuple[FieldModel, ...]) -> float:
  return len(fields) / 3


def get_duplicate_penalty(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  n_fields = len(session.fields)
  last_index = find_last_index(
    session.charts, lambda c: get_fields_hash(c.fields) == get_fields_hash(fields)
  )
  return (
    max(1 - ((len(session.charts) - last_index - 1) / n_fields), 0) * 3 if last_index != -1 else 0.0
  )


def get_fields_vector(session: SessionModel, use_preference: bool = False) -> np.ndarray:
  matrix = np.array(
    [
      [f in chart.fields and (chart.preferred if use_preference else True) for f in session.fields]
      for chart in session.charts
    ],
    dtype=np.float64,
  )
  matrix *= np.arange(1, len(matrix) + 1)[:, None]
  vector: np.ndarray = np.sum(matrix, axis=0)
  return vector / vector.max() if vector.max() != 0 else vector


def get_statistics_score(fields: tuple[FieldModel, ...]) -> float:
  if len(fields) == 1:
    return 1.0
  types = tuple(field.type for field in fields[:2])
  series = tuple(field.series for field in fields[:2])
  type_combinations = {
    ("numeric", "numeric"): has_numeric_numeric_stat,
    ("categorical", "categorical"): has_categorical_categorical_stat,
    ("numeric", "categorical"): has_numeric_categorical_stat,
    ("categorical", "numeric"): lambda x, y: has_numeric_categorical_stat(y, x),
    ("numeric", "datetime"): has_numeric_datetime_stat,
    ("datetime", "numeric"): lambda x, y: has_numeric_datetime_stat(y, x),
  }
  return type_combinations[types](*series) if types in type_combinations else 0.0


def get_score(vector: np.ndarray, field_vector: np.ndarray) -> float:
  return float(np.sum(vector * field_vector) / np.sum(field_vector))


def get_next_chart(session: SessionModel) -> ChartModel | None:
  if not session.charts:
    field = sample(session.visualizable_fields)
    return get_chart(session.df, (field,))

  if not session.available_fields:
    return None

  relevance_vector = get_fields_vector(session)
  preference_vector = get_fields_vector(session, use_preference=True)

  def scores(fields):
    field_vector = np.array([f in fields for f in session.fields], dtype=np.float64)
    return [
      get_statistics_score(fields),
      get_score(relevance_vector, field_vector),
      get_score(preference_vector, field_vector),
      -get_duplicate_penalty(session, fields),
      -get_cognition_penalty(fields),
    ]

  total_scores = [scores(fields) for fields in session.available_fields]
  selected_fields, _ = max(zip(session.available_fields, total_scores), key=lambda x: sum(x[1]))

  return get_chart(session.df, selected_fields)
