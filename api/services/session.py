from api.models import Session
from api.services.chart import append_chart
from api.state import state
from api.utils.field_name import replace_clingo_field_name


def append_session(groundingAttributes: list[str]) -> None:
  session = Session(
    charts=[],
    groundingAttributes=replace_clingo_field_name(groundingAttributes),
  )
  append_chart(session)
  state.sessions.append(session)
