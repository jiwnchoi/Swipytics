from api.models import Session
from api.store import state


def get_sessions(
  grounding_attributes: list[str],
) -> Session:
  return Session(
    charts=[],
    grounding_attributes=grounding_attributes,
  )
