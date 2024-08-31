from pathlib import Path

from api.app import appendChart, loadData
from fastapi import FastAPI, UploadFile, status

server = FastAPI()


@server.post("/api/loadData")
async def load_data(file: UploadFile):
  Path("data").mkdir(parents=True, exist_ok=True)
  with open(f"data/{file.filename}", "wb") as buffer:
    buffer.write(await file.read())
  return loadData(f"data/{file.filename}")


@server.get("/api/appendChart")
async def append_chart():
  return appendChart()


@server.get("/api", status_code=status.HTTP_200_OK)
async def root():
  return {}
