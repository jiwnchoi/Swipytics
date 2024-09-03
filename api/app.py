from __future__ import annotations

from typing import Any

from api.models import Session
from api.services import append_chart
from vega_datasets import data

default_df = data.cars()
state = Session(df=default_df, filename="cars.json")


def loadData(filename: str):
  state = Session(filename=filename)
  return state.model_dump(exclude={"df"})


def appendChart():
  return append_chart(state).model_dump()


def loadState(state_dict: dict[str, Any]):
  global state
  state = Session.model_validate(state_dict)
  return state.model_dump(exclude={"df"})


print("Python modules are loaded")
