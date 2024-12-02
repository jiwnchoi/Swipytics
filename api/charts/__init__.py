from typing import TYPE_CHECKING, Callable

from .barchart import barchart_c, barchart_n, barchart_nc, barchart_nc_c
from .heatmap import heatmap_cc, heatmap_cc_n
from .heatmap import heatmap_ct_n as heatmap_ct_n
from .linechart import linechart_ct, linechart_nt, linechart_nt_c, linechart_t
from .scatterplot import scatterplot_nn, scatterplot_nn_c, scatterplot_nnn

if TYPE_CHECKING:
  import altair as alt
  from api.models import FieldModel
  from pandas import DataFrame

ChartRenderer = Callable[["DataFrame", tuple["FieldModel", ...]], "alt.Chart"]

chart_map: dict[str, ChartRenderer] = {
  "categorical": barchart_c,
  "numeric": barchart_n,
  "datetime": linechart_t,
  "numeric_categorical": barchart_nc,
  "categorical_numeric": barchart_nc,
  "numeric_categorical_categorical": barchart_nc_c,
  "categorical_numeric_categorical": barchart_nc_c,
  "numeric_numeric": scatterplot_nn,
  "numeric_numeric_numeric": scatterplot_nnn,
  "numeric_numeric_categorical": scatterplot_nn_c,
  "categorical_categorical": heatmap_cc,
  "categorical_categorical_numeric": heatmap_cc_n,
  "categorical_datetime": linechart_ct,
  "datetime_categorical": linechart_ct,
  "datetime_numeric": linechart_nt,
  "numeric_datetime": linechart_nt,
  "datetime_numeric_categorical": linechart_nt_c,
  "numeric_datetime_categorical": linechart_nt_c,
}
