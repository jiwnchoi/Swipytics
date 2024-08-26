from __future__ import annotations

import pathlib

import pandas as pd
from api.state import state
from api.utils import get_file_extension
from api.utils.field_name import get_clingo_field_name
from vega_datasets import data


def load_data(fileName: str | None = None) -> None:
  if fileName is None:
    state.filename = "Cars"
    state.df = pd.DataFrame(data.cars())

    return

  extension = get_file_extension(fileName)

  state.filename = fileName
  state.df = getattr(pd, f"read_{extension}")(pathlib.Path("./", fileName))
  state.df.columns = [
    get_clingo_field_name(column) for column in state.df.columns
  ]


__all__ = ["load_data"]
