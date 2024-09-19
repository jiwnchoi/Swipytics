from __future__ import annotations

from typing import Sequence, TypeVar, cast

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
)
from numpy.random import choice

T = TypeVar("T")


def get_penelty(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  n_fields = len(session.fields)
  last_index = find_last_index(
    session.charts, lambda c: get_fields_hash(c.fields) == get_fields_hash(fields)
  )
  if last_index == -1:
    return 0.0

  return max(1 - ((len(session.charts) - last_index - 1) / (n_fields * (n_fields - 1) / 2)), 0) * 3


def calculate_vector(session: SessionModel, use_preference: bool = False) -> np.ndarray:
  matrix = np.array(
    [
      [f in chart.fields and (chart.preferred if use_preference else True) for f in session.fields]
      for chart in session.charts
    ],
    dtype=np.float64,
  )
  matrix *= np.arange(len(matrix))[:, None] + 1
  vector = cast(np.ndarray, np.sum(matrix, axis=0))

  vector_max = vector.max()

  return vector / vector.max() if vector_max != 0 else vector


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


def sample_one(targets: Sequence[T], p: Sequence[float]) -> T:
  return targets[choice(len(targets), 1, p=p)[0]]


def get_next_chart(session: SessionModel) -> ChartModel | None:
  if len(session.charts) == 0:
    field = sample_one(
      session.visualizable_fields,
      [1 / len(session.visualizable_fields)] * len(session.visualizable_fields),
    )
    print(field.name)
    return get_chart(session.df, (field,))
  if not session.available_fields:
    return None

  relevance_vector = calculate_vector(session)
  preference_vector = calculate_vector(session, use_preference=True)

  def total_score(fields):
    field_vector = np.array([f in fields for f in session.fields], dtype=np.float64)
    return [
      get_statistics_score(fields),
      get_score(relevance_vector, field_vector),  # Relevance score
      get_score(preference_vector, field_vector),  # Preference score
      -get_penelty(session, fields),  # Penalty
    ]

  total_scores = [total_score(fields) for fields in session.available_fields]
  # pprint top five fields and its scores
  fields_and_scores = list(zip(session.available_fields, total_scores))
  fields_and_scores.sort(key=lambda x: sum(x[1]), reverse=True)
  for i in range(5):
    print([[f.name for f in fields_and_scores[i][0]], fields_and_scores[i][1]])

  selected_fields = fields_and_scores[0][0]
  chart = get_chart(session.df, selected_fields)
  return chart
