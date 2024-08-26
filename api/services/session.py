from api.models import Session
from api.services.chart import append_chart
from api.state import state


def append_session(groundingAttributes: list[str]) -> None:
  session = Session(charts=[], groundingAttributes=groundingAttributes)
  append_chart(session)
  state.sessions.append(session)
