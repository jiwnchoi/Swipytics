from __future__ import annotations

from api.models import ChartModel, DataFieldModel, SessionModel
from numpy.random import choice

from .get_chart import get_chart

NEW_FIELD_P = 0.2


def sample(targets: list[DataFieldModel], p: list[float] | None) -> DataFieldModel:
  p = [1 / len(targets) if p is None else p]
  return choice(targets, 1, p=p)[0]


def get_next_chart(session: SessionModel) -> ChartModel:
  if len(session.charts) == 0:
    field = sample(session.fields)
    chart = get_chart(session.df, tuple([field]))
    session.charts.append(chart)

  pass
