from random import choice

from api.models import Session
from api.models.chart import Chart
from api.services.facts import get_attribute_facts, get_base_facts
from api.services.specs import get_specs_from_facts
from api.state import state


def append_chart(session: Session):
  grounding_facts = [
    *get_base_facts(state.df),
    *sum(
      [
        get_attribute_facts(field, code)
        for code, field in enumerate(session.groundingAttributes)
      ],
      [],
    ),
  ]

  # 기본 차트 추가
  if len(session.charts) == 0:
    specs = get_specs_from_facts(grounding_facts)
    session.charts.append(
      Chart(
        specs=specs,
        facts=grounding_facts,
        attributes=session.groundingAttributes,
      )
    )

  used_field = sum([chart.attributes for chart in session.charts], [])
  new_field = choice(
    [column for column in state.df.columns if column not in used_field]
  )

  new_facts = grounding_facts + get_attribute_facts(
    new_field, len(session.groundingAttributes)
  )
  new_specs = get_specs_from_facts([*grounding_facts, *new_facts])

  session.charts.append(
    Chart(
      specs=new_specs,
      facts=new_facts,
      attributes=[*session.groundingAttributes, new_field],
    )
  )
