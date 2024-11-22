from __future__ import annotations

from pprint import pprint
from typing import TypeVar

import numpy as np
from api.models import ChartModel, FieldModel, SessionModel
from api.services import get_chart
from api.utils import (
  find_last_index,
  get_fields_hash,
  sample,
)

T = TypeVar("T")


def relevance_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  if len(fields) == 1:
    return 1.0

  recent_fields = set()

  for chart in session.charts[::-1]:
    if len(recent_fields) > 5:
      break
    recent_fields.update(chart.fields)

  return len(set(fields) & recent_fields) / len(fields)


def preference_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  preferred_charts = [chart for chart in session.charts[::-1] if chart.preferred]
  preferred_scores = [
    len(set(fields) & set(chart.fields)) / len(fields) for chart in preferred_charts
  ]
  return sum(preferred_scores) / len(preferred_charts) if preferred_charts else 0


def simplicity_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  return 1 - len(fields) / 3


def freshness_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  n_fields = len(session.fields)
  last_index = find_last_index(
    session.charts, lambda c: get_fields_hash(c.fields) == get_fields_hash(fields)
  )

  if last_index == -1:
    return 1.0

  n_uni_and_bivariate = n_fields + (n_fields * (n_fields - 1) / 2)

  return min((len(session.charts) - last_index) / n_uni_and_bivariate, 1)


score_weight = [
  1,  # relevance
  2,  # preference
  3,  # freshness
  1,  # simplicity
]


def get_score(vector: np.ndarray, field_vector: np.ndarray) -> float:
  return float(np.sum(vector * field_vector) / np.sum(field_vector))


def get_next_chart(session: SessionModel) -> ChartModel | None:
  if not session.charts:
    field = sample(session.visualizable_fields)
    return get_chart(session.df, (field,))

  if not session.available_fields:
    return None

  def get_score(fields: tuple[FieldModel, ...]) -> float:
    scores = [
      f(session, fields)
      for f in (relevance_score, preference_score, freshness_score, simplicity_score)
    ]
    return sum(w * s for w, s in zip(score_weight, scores))

  total_scores = [get_score(fields) for fields in session.available_fields]
  selected_fields, _ = max(zip(session.available_fields, total_scores), key=lambda x: x[1])
  chart = get_chart(session.df, selected_fields)
  pprint(chart)
  return chart
