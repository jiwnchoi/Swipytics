from __future__ import annotations

from typing import Sequence, TypeVar

from api.models import ChartModel, DataFieldModel, SessionModel
from numpy.random import choice

T = TypeVar("T")


def get_statistics_score(session: SessionModel, fields: tuple[DataFieldModel, ...]) -> float:
  return 1.0


def get_relevance_score(chart: ChartModel, fields: tuple[DataFieldModel, ...]) -> float:
  return 1.0


def get_preference_score(session: SessionModel, chart: ChartModel) -> float:
  return 1.0


def get_diminishing_penelty(session: SessionModel, chart: ChartModel) -> float:
  return 1.0


def sample_one(targets: Sequence[T], p: Sequence[float]) -> T:
  idx = choice(len(targets), 1, p=p)[0]
  return targets[idx]


def get_distribution(session: SessionModel, space: list[tuple[DataFieldModel, ...]]) -> list[float]:
  if not space:
    return [1 / len(session.visualizable_fields) for _ in session.visualizable_fields]
  return [1 / len(space) for _ in space]


def get_next_chart(session: SessionModel) -> ChartModel | None:
  current_chart = session.charts[-1] if session.charts else None

  if not current_chart:
    fields = sample_one(session.visualizable_fields, get_distribution(session, []))

  else:
    all_field_tuples = session.available_fields
