from pathlib import Path

from api.app import appendChart, appendNextChart, browseCharts, loadData
from api.models import ChartModel
from fastapi import FastAPI, UploadFile, status
from pydantic import BaseModel

server = FastAPI()

# Keep endpoints to camelCase for consistent api with Pyodide environment


@server.post("/api/loadData")
async def load_data(file: UploadFile):
  Path("data").mkdir(parents=True, exist_ok=True)
  with open(f"data/{file.filename}", "wb") as buffer:
    buffer.write(await file.read())
  return loadData(f"data/{file.filename}")


class BrowseChartRequest(BaseModel):
  field_names: list[str]


@server.post("/api/browseCharts")
async def get_chart(req: BrowseChartRequest):
  return browseCharts(req.field_names)


class AppendChartRequest(BaseModel):
  chart: ChartModel


@server.post("/api/appendChart")
async def append_chart(req: AppendChartRequest):
  return appendChart(req.chart)


@server.get("/api/appendNextChart")
async def append_next_chart():
  return appendNextChart()


@server.get("/api", status_code=status.HTTP_200_OK)
async def root():
  return {}
