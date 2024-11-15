import appendChart from "./appendChart";
import appendNextChart from "./appendNextChart";
import browseCharts from "./browseCharts";
import getCharts from "./getCharts";
import loadSession from "./loadSession";
import setPreferred from "./setPreferred";
import writeFile from "./writeFile";

export default {
  appendChart,
  getCharts,
  appendNextChart,
  browseCharts,
  loadSession,
  writeFile,
  setPreferred,
} as const;
