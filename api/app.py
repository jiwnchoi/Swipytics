import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.functions import load_data
from api.models import Chart, Session, State
from draco import Draco

# from draco.renderer import AltairRenderer


print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)

drc = Draco()

state = State()


# JavaScript에서 호출하는 함수를 CamelCase로 정의
def loadData(filename: str):
  load_data(state, filename)
  print(f"Data Loaded: {state.filename}")
  print(f"Data Shape: {state.df.shape}")
  print(state.df.head())
