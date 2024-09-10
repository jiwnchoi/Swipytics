from __future__ import annotations

from typing import Callable, Sequence, TypeVar

from api.models import ChartModel, DataFieldModel, SessionModel
from numpy.random import choice

from .get_chart import get_chart

T = TypeVar("T")


Operation = Callable[[tuple[DataFieldModel, ...], DataFieldModel], tuple[DataFieldModel, ...]]

operations_map: dict[int, list[Operation]] = {
  0: [
    lambda _, f: (f,),  # Create first field
  ],
  1: [
    lambda _, f: (f,),  # 1. Replace Last field
    lambda fields, f: fields + (f,),  # 2. Append New Field
  ],
  2: [
    lambda fields, f: (fields[0], f),  # 1. Replace Last field
    lambda fields, f: fields + (f,),  # 2. Append New Field
    lambda fields, _: (fields[0],),  # 3. Remove second field
  ],
  3: [
    lambda fields, f: (fields[0], fields[1], f),  # 1. Replace Last field
    lambda fields, _: (fields[0], fields[2]),  # 3. Remove second field
  ],
}


def sample(targets: Sequence[T], p: Sequence[float]) -> T:
  idx = choice(len(targets), 1, p=p)[0]
  return targets[idx]


def get_distribution(session: SessionModel, space: list[tuple[DataFieldModel, ...]]) -> list[float]:
  if not space:
    return [1 / len(session.visualizable_fields) for _ in session.visualizable_fields]
  return [1 / len(space) for _ in space]


def get_next_chart(session: SessionModel) -> ChartModel | None:
  current_chart = session.charts[-1] if session.charts else None
  target_fields = set(session.visualizable_fields) - set(
    current_chart.fields if current_chart else []
  )
  chart_hash = set(tuple(chart.fields) for chart in session.charts)

  operations = operations_map[len(current_chart.fields) if current_chart else 0]

  neighbor_fields = [
    op(current_chart.fields if current_chart else (), field)
    for op in operations
    for field in target_fields
  ]

  ## Filter out fields that have been used
  neighbor_fields = [fields for fields in neighbor_fields if fields not in chart_hash]

  if not neighbor_fields:
    neighbor_fields = [(field,) for field in session.visualizable_fields]

  p = get_distribution(session, neighbor_fields)
  next_fields = sample(neighbor_fields, p)
  chart = get_chart(session.df, next_fields)

  return chart
