from __future__ import annotations

import pathlib

import pandas as pd
from api.state import state
from api.utils import get_file_extension
from api.utils.field_name import get_clingo_field_name
from vega_datasets import data


def load_data(fileName: str | None = None) -> None:
  df: pd.DataFrame
  if fileName is None:
    state.filename = "Cars"
    df = pd.DataFrame(data.cars())

  else:
    state.filename = fileName
    extension = get_file_extension(fileName)
    df = getattr(pd, f"read_{extension}")(pathlib.Path("./", fileName))

  state.df = df.rename(
    columns={col: get_clingo_field_name(col) for col in df.columns}
  )


__all__ = ["load_data"]
