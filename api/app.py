from __future__ import annotations

from api.models import Session
from api.services import append_chart, load_data
from api.utils.decorators import exception_handler

state = Session()


@exception_handler(default_return=Session().asdict())
def loadData(filename: str):
  global state
  state = Session()
  load_data(state, filename if filename != "" else None)
  append_chart(state)
  return state.asdict()


@exception_handler(default_return={})
def appendChart():
  return append_chart(state).to_dict()


print("Python modules are loaded")
