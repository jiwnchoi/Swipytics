from __future__ import annotations

from typing import Any

from api.models import SessionModel
from api.models.chart_model import ChartModel
from api.services import browse_charts
from vega_datasets import data

default_df = data.movies()
state = SessionModel(df=default_df, filename="movies.json")


def loadData(filename: str):
  global state
  state = SessionModel(filename=filename)
  return state.model_dump(by_alias=True)


def appendChart(chart: dict[str | Any] | ChartModel):
  global state
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  state.charts.append(chart)
  return state.model_dump(by_alias=True)


def getNextChart():
  pass
  # return get_next_chart(state).model_dump(by_alias=True)


def loadState(new_state: dict[str, Any] | SessionModel):
  global state
  if isinstance(new_state, dict):
    new_state = SessionModel.model_validate(new_state)
  state = new_state
  return state.model_dump(by_alias=True)


def browseCharts(field_names: list[str]):
  global state
  browsed_chart = browse_charts(state, field_names)
  return [chart.model_dump(by_alias=True) for chart in browsed_chart]
