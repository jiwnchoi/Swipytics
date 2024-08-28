from __future__ import annotations

from random import choice

from api.models import Session
from api.models.chart import Chart
from api.services.facts import get_facts
from api.services.specs import get_specs_from_facts
from api.state import state
from api.utils import replace_clingo_field_name
from api.utils.field_name import get_clingo_field_name


def _get_chart(fields: list[str]) -> Chart | None:
  facts = get_facts(fields)
  specs = get_specs_from_facts(facts)

  return (
    Chart(
      specs=specs,
      facts=facts,
      attributes=replace_clingo_field_name(fields),
    )
    if len(specs) > 0
    else None
  )


def append_chart(session: Session):
  unused_field = [
    column for column in state.df.columns if column not in session.used_fields
  ]
  grounding_fields = get_clingo_field_name(session.groundingAttributes)

  if len(unused_field) == 0:
    print("All fields are used")
    return

  # Append default chart
  if len(session.charts) == 0:
    session.charts.append(_get_chart(grounding_fields))

  # Append new chart
  new_fields = [*grounding_fields, choice(unused_field)]
  new_chart = _get_chart(new_fields)

  while new_chart is None:
    new_fields = [*grounding_fields, choice(unused_field)]
    new_chart = _get_chart(new_fields)

  session.charts.append(new_chart)
