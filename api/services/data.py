from __future__ import annotations

import pathlib

import pandas as pd
from api.state import state
from api.utils import get_file_extension
from vega_datasets import data


def load_data(fileName: str | None = None) -> None:
  if fileName is None:
    state.filename = "Cars"
    state.df = pd.DataFrame(data.cars())

    return

  extension = get_file_extension(fileName)

  state.filename = fileName
  state.df = getattr(pd, f"read_{extension}")(pathlib.Path("./", fileName))


__all__ = ["load_data"]
