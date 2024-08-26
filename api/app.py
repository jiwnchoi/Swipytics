from __future__ import annotations

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.functions import load_data
from api.models import Chart, Session, State
from api.store import state

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)
