from __future__ import annotations

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.services import load_data
from api.services.chart import append_chart
from api.services.session import append_session
from api.store import return_state, state
from api.utils import find
from numpy.random import choice

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)


# Controllers must be implemented here


@return_state
def loadData(fileName: str | None = None):
  load_data(fileName)


@return_state
def appendSession():
  attributes = state.undiscovered_attributes
  grounding_attributes = choice(attributes, 1, replace=False).tolist()
  append_session(grounding_attributes)


@return_state
def appendChart(sessionKey: str):
  session = find(state.sessions, lambda x: x.key == sessionKey)

  if not session:
    raise Exception("Session not found")

  append_chart(session)
