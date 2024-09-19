from __future__ import annotations

from typing import Sequence, TypeVar

from numpy.random import choice

T = TypeVar("T")


def sample(targets: Sequence[T], p: Sequence[float] | None = None) -> T:
  if not p:
    p = [1 / len(targets)] * len(targets)

  return targets[choice(len(targets), 1, p=p)[0]]
