import pandas as pd
from api.models import State
from api.utils import getFileExtension


def load_data(state: State, fileName: str) -> None:
  extension = getFileExtension(fileName)

  state.filename = fileName
  # state.df = pd.__call__(f"read_{extension}")(fileName)
  state.df = getattr(pd, f"read_{extension}")(fileName)


__all__ = ["load_data"]
