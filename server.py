import hashlib
import os
from pathlib import Path
from typing import Annotated

from api.app import appendChart, appendNextChart, browseCharts, getCharts, loadSession, setPreferred
from api.models import ChartModel, SessionModel
from fastapi import Depends, FastAPI, HTTPException, Request, UploadFile, status
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

server = FastAPI()


async def get_session_key(request: Request) -> str:
  user_agent = request.headers.get("user-agent", "")
  ip = (
    request.headers.get("x-real-ip", "")
    or request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    or request.client.host
    if request.client
    else ""
  )
  accept_lang = request.headers.get("accept-language", "")
  platform = request.headers.get("sec-ch-ua-platform", "")
  mobile = request.headers.get("sec-ch-ua-mobile", "")

  device_string = f"{user_agent}{ip}{accept_lang}{platform}{mobile}"
  return hashlib.sha256(device_string.encode()).hexdigest()


if os.path.exists("dist"):
  server.mount("/Swipytics", StaticFiles(directory="dist", html=True), name="static")


@server.post("/api/writeFile")
async def write_file(file: UploadFile, session_key: Annotated[str, Depends(get_session_key)]):
  Path("data").mkdir(parents=True, exist_ok=True)
  with open(f"data/{file.filename}", "wb") as buffer:
    buffer.write(await file.read())
  return {"filename": file.filename}


@server.post("/api/loadSession")
async def load_session(
  session: SessionModel, session_key: Annotated[str, Depends(get_session_key)]
):
  if os.path.isfile(f"data/{session.filename}"):
    return loadSession(session=session, session_key=session_key)
  else:
    return HTTPException(status_code=404, detail="File not found")


class BrowseChartRequest(BaseModel):
  field_names: list[str]


@server.post("/api/browseCharts")
async def browse_charts(
  req: BrowseChartRequest, session_key: Annotated[str, Depends(get_session_key)]
):
  return browseCharts(req.field_names, session_key=session_key)


class AppendChartRequest(BaseModel):
  chart: ChartModel


@server.post("/api/appendChart")
async def append_chart(
  req: AppendChartRequest, session_key: Annotated[str, Depends(get_session_key)]
):
  return appendChart(req.chart, session_key=session_key)


@server.get("/api/appendNextChart")
async def append_next_chart(session_key: Annotated[str, Depends(get_session_key)]):
  chart = appendNextChart(session_key=session_key)
  return HTTPException(status_code=404, detail="No more charts") if not chart else chart


@server.post("/api/getCharts")
async def get_charts(
  req: BrowseChartRequest, session_key: Annotated[str, Depends(get_session_key)]
):
  return getCharts(req.field_names, session_key=session_key)


class SetPreferredRequest(BaseModel):
  key: str = Field(default="", alias="key")
  preferred: bool = Field(default=False)


@server.patch("/api/setPreferred")
async def set_preferred(
  req: SetPreferredRequest, session_key: Annotated[str, Depends(get_session_key)]
):
  chart = setPreferred(req.key, req.preferred, session_key=session_key)
  return HTTPException(status_code=404, detail="Chart not found") if not chart else chart


@server.get("/api", status_code=status.HTTP_200_OK)
async def root():
  return {}
