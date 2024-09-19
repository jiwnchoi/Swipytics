from functools import wraps
from typing import cast

import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency, f_oneway, pearsonr, t


class Result:
  statistic: float
  pvalue: float


def cache(func):
  cache = {}

  @wraps(func)
  def wrapper(*args):
    key = tuple(id(arg) if isinstance(arg, pd.Series) else arg for arg in args)

    if key not in cache:
      cache[key] = func(*args)
    return cache[key]

  return wrapper


@cache
def has_numeric_numeric_stat(series1: pd.Series, series2: pd.Series) -> float:
  valid_data = pd.concat([series1, series2], axis=1).dropna()
  if len(valid_data) < 2:
    return 0
  res = cast(Result, pearsonr(valid_data.iloc[:, 0], valid_data.iloc[:, 1]))
  return 1 if res.pvalue < 0.05 else 0


@cache
def has_numeric_categorical_stat(numeric_series: pd.Series, categorical_series: pd.Series) -> float:
  valid_data = pd.concat([numeric_series, categorical_series], axis=1).dropna()
  if len(valid_data) == 0:
    return 0
  numeric_series = valid_data.iloc[:, 0]
  categorical_series = valid_data.iloc[:, 1]

  groups = [
    numeric_series[categorical_series == category] for category in categorical_series.unique()
  ]
  groups = [group for group in groups if len(group) > 0]

  if len(groups) < 2:
    return 0

  res = cast(Result, f_oneway(*groups))
  return 1 if res.pvalue < 0.05 else 0


@cache
def has_numeric_datetime_stat(numeric_series: pd.Series, datetime_series: pd.Series) -> float:
  valid_data = pd.concat([numeric_series, datetime_series], axis=1).dropna()
  if len(valid_data) < 2:
    return 0
  numeric_series = valid_data.iloc[:, 0]
  datetime_series = valid_data.iloc[:, 1]

  sorted_indices = datetime_series.sort_values().index
  sorted_numeric = numeric_series.loc[sorted_indices]

  autocorr = sorted_numeric.autocorr()

  n = len(sorted_numeric)
  se = 1 / np.sqrt(n)  # 표준 오차
  t_statistic = autocorr / se

  pvalue = 1.96 * (1 - t.cdf(abs(t_statistic), df=n - 2))

  return 1 if pvalue < 0.05 else 0


@cache
def has_categorical_categorical_stat(series1: pd.Series, series2: pd.Series) -> float:
  valid_data = pd.concat([series1, series2], axis=1).dropna()
  if len(valid_data) == 0:
    return 0
  series1 = valid_data.iloc[:, 0]
  series2 = valid_data.iloc[:, 1]

  contingency_table = pd.crosstab(series1, series2)
  if contingency_table.size == 0 or contingency_table.values.min() == 0:
    return 0

  res = cast(Result, chi2_contingency(contingency_table))
  return 1 if res.pvalue < 0.05 else 0
