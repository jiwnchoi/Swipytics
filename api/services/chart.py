from __future__ import annotations

from typing import TYPE_CHECKING

from api.models.chart import Chart
from api.utils import replace_clingo_field_name

from .facts import get_facts
from .specs import get_specs_from_facts

if TYPE_CHECKING:
  from api.models import Session


def append_chart(session: "Session") -> Chart:
  fields = session.get_fields()
  print(f"fields: {fields}")
  chart = None

  while chart is None:
    facts = get_facts(session, fields)
    specs = get_specs_from_facts(session, facts)
    chart = (
      Chart(
        specs=specs,
        facts=facts,
        attributes=replace_clingo_field_name(fields),
      )
      if len(specs) > 0
      else None
    )

  session.charts.append(chart)
  session.used_charts[fields[0]].add(chart)
  return chart
