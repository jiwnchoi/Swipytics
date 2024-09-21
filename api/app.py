from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_next_chart

sessionState: SessionModel = SessionModel()


def getSession():
  global sessionState
  return sessionState


def loadSession(session: dict[str, Any] | SessionModel):
  global sessionState
  if isinstance(session, dict):
    session = SessionModel.model_validate(session)

  sessionState = SessionModel(filename=session.filename)
  sessionState.charts = session.charts
  sessionState.timestamp = session.timestamp

  if len(sessionState.charts) == 0:
    chart = get_next_chart(sessionState)
    sessionState.charts.append(chart) if chart else None

  return sessionState.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel):
  global sessionState
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  sessionState.charts.append(chart)
  return sessionState.model_dump(by_alias=True, mode="json")


def appendNextChart():
  global sessionState
  chart = get_next_chart(sessionState)
  sessionState.charts.append(chart) if chart else None
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def browseCharts(field_names: list[str]):
  global sessionState
  browsed_chart = browse_charts(sessionState, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]


def setPreferred(key: str, preferred: bool):
  global sessionState
  chart = next((chart for chart in sessionState.charts if chart.key == key), None)
  if chart:
    chart.preferred = preferred
    return chart.model_dump(by_alias=True, mode="json")
  else:
    return None


print("Python backend loaded")
