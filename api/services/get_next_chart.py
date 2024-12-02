from __future__ import annotations

from random import choice
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
    return 0.5

  recent_fields = set()

  for chart in session.charts[::-1][:5]:
    recent_fields.update(chart.fields)

  return len(set(fields) & recent_fields) / len(fields)


def preference_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  preferred_charts = [chart for chart in session.charts[::-1][:5] if chart.preferred]
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

  n_uni_and_bivariate = n_fields + (
    n_fields * (n_fields - 1) / 2
  )  # Univariate 차트 수 + Bivariate 차트 수

  return min((len(session.charts) - last_index) / n_uni_and_bivariate, 1)


score_weight = [
  1,  # relevance
  2,  # preference
  3,  # freshness
  2,  # simplicity
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

  fields_and_scores = [(fields, get_score(fields)) for fields in session.available_fields]

  max_score = max(score for _, score in fields_and_scores)

  top_fields = [fields for fields, score in fields_and_scores if score == max_score]

  selected_fields = choice(top_fields)

  chart = get_chart(session.df, selected_fields)
  return chart
