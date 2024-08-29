from __future__ import annotations

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.models import Session
from api.services import append_chart, load_data

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)

state = Session()


def loadData(filename: str | None = None):
  load_data(state, filename)
  append_chart(state)
  return state.asdict()


def appendChart():
  return append_chart(state).to_dict()
