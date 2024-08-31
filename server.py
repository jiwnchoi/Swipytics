from pathlib import Path

from api.app import appendChart, loadData
from fastapi import FastAPI, UploadFile

server = FastAPI()


@server.post("/loadData")
async def load_data(file: UploadFile):
  Path("data").mkdir(parents=True, exist_ok=True)
  with open(f"data/{file.filename}", "wb") as buffer:
    buffer.write(await file.read())
  return loadData(f"data/{file.filename}")


@server.get("/appendChart")
async def append_chart():
  return appendChart()
