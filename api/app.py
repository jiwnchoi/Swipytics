import importlib.resources as pkg_resources

import draco.asp.examples as examples
from draco import Draco, dict_to_facts, schema_from_dataframe
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from vega_datasets import data

hist_spec = pkg_resources.read_text(examples, "histogram.lp")

app = FastAPI()
draco = Draco()

origins = [
  "*",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

df = data.cars()

base_scheme = schema_from_dataframe(df)
base_facts = dict_to_facts(base_scheme)
print(base_facts)

# @app.get("/")
