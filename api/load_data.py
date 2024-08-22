import pandas as pd
from api.utils import getFileExtension
from vega_datasets import data

from .State import State


def load_data(state: State, fileName: str) -> None:
  extension = getFileExtension(fileName)

  state.filename = fileName
  state.df = pd.__call__(f"read_{extension}")(fileName)


__all__ = ["load_data"]
