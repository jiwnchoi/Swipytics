from __future__ import annotations

from typing import Callable, TypeVar

T = TypeVar("T")


def find(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in lst if predicate(x)), None)


def find_right(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in reversed(lst) if predicate(x)), None)


def find_index(lst: list[T], predicate: Callable[[T], bool]) -> int:
  return next((i for i, x in enumerate(lst) if predicate(x)), -1)


def find_last_index(lst: list[T], predicate: Callable[[T], bool]) -> int:
  return next((i for i, x in reversed(list(enumerate(lst))) if predicate(x)), -1)
