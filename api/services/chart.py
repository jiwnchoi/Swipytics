from random import choice

from api.models import Session
from api.models.chart import Chart
from api.services.facts import get_facts
from api.services.specs import get_specs_from_facts
from api.state import state
from api.utils import replace_clingo_field_name
from api.utils.field_name import get_clingo_field_name


def append_chart(session: Session):
  # 기본 차트 추가
  grounding_fields = [
    get_clingo_field_name(field) for field in session.groundingAttributes
  ]
  if len(session.charts) == 0:
    facts = get_facts(grounding_fields)
    specs = get_specs_from_facts(facts)
    session.charts.append(
      Chart(
        specs=specs,
        facts=facts,
        attributes=session.groundingAttributes,
      )
    )

  used_field = sum([chart.attributes for chart in session.charts], [])
  if len(used_field) == len(state.df.columns):
    print("All fields are used")
    return

  def get_new_spes():
    new_fields = get_clingo_field_name(
      [
        *session.groundingAttributes,
        choice(
          [column for column in state.df.columns if column not in used_field]
        ),
      ]
    )

    new_facts = get_facts(new_fields)
    new_specs = get_specs_from_facts(new_facts)
    return new_fields, new_facts, new_specs

  new_fields, new_facts, new_specs = get_new_spes()

  while len(new_specs) > 0:
    used_field.append(new_fields[-1])
    new_fields, new_facts, new_specs = get_new_spes()

  session.charts.append(
    Chart(
      specs=new_specs,
      facts=new_facts,
      attributes=replace_clingo_field_name(new_fields),
    )
  )
