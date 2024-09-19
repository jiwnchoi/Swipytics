from pathlib import Path

from api.app import appendChart, appendNextChart, browseCharts, loadData, loadSession, setPreferred
from api.models import ChartModel, SessionModel
from fastapi import FastAPI, HTTPException, UploadFile, status
from pydantic import BaseModel, Field

server = FastAPI()

# Keep endpoints to camelCase for consistent api with Pyodide environment


@server.post("/api/loadData")
async def load_data(file: UploadFile):
  Path("data").mkdir(parents=True, exist_ok=True)
  with open(f"data/{file.filename}", "wb") as buffer:
    buffer.write(await file.read())
  return loadData(f"data/{file.filename}")


@server.post("/api/loadSession")
async def load_session(file: UploadFile, new_session: SessionModel):
  Path("data").mkdir(parents=True, exist_ok=True)
  with open(f"data/{file.filename}", "wb") as buffer:
    buffer.write(await file.read())
  return loadSession(f"data/{file.filename}", new_session)


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
  chart = appendNextChart()
  return HTTPException(status_code=404, detail="No more charts") if not chart else chart


class SetPreferredRequest(BaseModel):
  chart_key: str = Field(default="", alias="chartKey")
  preferred: bool = Field(default=False)


@server.patch("/api/setPreferred")
async def set_preferred(req: SetPreferredRequest):
  chart = setPreferred(req.chart_key, req.preferred)
  return HTTPException(status_code=404, detail="Chart not found") if not chart else chart


@server.get("/api", status_code=status.HTTP_200_OK)
async def root():
  return {}
