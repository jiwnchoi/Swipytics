from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_chart, get_next_chart

sessions: dict[str, SessionModel] = {"default": SessionModel()}


def getSession(session_key: str = "default") -> SessionModel:
  if session_key not in sessions:
    sessions[session_key] = SessionModel()
  return sessions[session_key]


def setSession(session: SessionModel, session_key: str = "default") -> None:
  sessions[session_key] = session


def loadSession(session: dict[str, Any] | SessionModel, session_key: str = "default"):
  if isinstance(session, dict):
    session = SessionModel.model_validate(session)

  new_session = SessionModel(filename=session.filename)
  new_session.charts = session.charts
  new_session.timestamp = session.timestamp

  if len(new_session.charts) == 0:
    chart = get_next_chart(new_session)
    new_session.charts.append(chart) if chart else None

  setSession(new_session, session_key)
  return new_session.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel, session_key: str = "default"):
  session = getSession(session_key)
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True, mode="json")


def appendNextChart(session_key: str = "default"):
  session = getSession(session_key)
  chart = get_next_chart(session)
  session.charts.append(chart) if chart else None
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def browseCharts(field_names: list[str], session_key: str = "default"):
  session = getSession(session_key)
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]


def getCharts(field_names: list[str], session_key: str = "default"):
  session = getSession(session_key)
  fields = [
    field for field in session.available_fields if set(field_names) == set([f.name for f in field])
  ]
  charts = [get_chart(session.df, field) for field in fields]
  return [chart.model_dump(by_alias=True, mode="json") for chart in charts if chart]


def setPreferred(key: str, preferred: bool, session_key: str = "default"):
  session = getSession(session_key)
  chart = next((chart for chart in session.charts if chart.key == key), None)
  if chart:
    chart.preferred = preferred
    return chart.model_dump(by_alias=True, mode="json")
  else:
    return None
