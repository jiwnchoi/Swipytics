from __future__ import annotations

from dataclasses import asdict

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.services import load_data
from api.services.chart import append_chart
from api.services.session import append_session
from api.state import return_state, state
from api.utils import find
from numpy.random import choice

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)


@return_state
def loadData(fileName: str | None = None):
  load_data(fileName)
  return {k: v for k, v in asdict(state).items() if k not in ["df", "filename"]}


def appendSession():
  print("appendSession")
  attributes = state.undiscovered_attributes
  groundingAttributes = choice(attributes, 1, replace=False).tolist()
  append_session(groundingAttributes)
  return asdict(state)["sessions"][-1]


def appendChart(sessionKey: str):
  print("appendChart", sessionKey)
  print([session.key for session in state.sessions])
  session = find(state.sessions, lambda x: x.key == sessionKey)

  if not session:
    raise Exception("Session not found")

  append_chart(session)
  return asdict(session)["charts"][-1]
