from json import load

import draco
import numpy as np
import pandas as pd
import sklearn


print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__}"
)


# state = State()


# def loadData(fileName: str) -> pd.DataFrame:
#   print(f"Loading data from {fileName}")
#   load_data(state, fileName)
#   print(state.df.head())
