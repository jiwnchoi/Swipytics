import pandas as pd
from api.models import State
from api.utils import get_file_extension


def load_data(state: State, fileName: str) -> None:
  extension = get_file_extension(fileName)

  state.filename = fileName
  state.df = getattr(pd, f"read_{extension}")(fileName)


__all__ = ["load_data"]
