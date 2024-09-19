import mitt from "mitt";
import { getPyodide } from "../workers";
import api from "./api";
import { type Events, type LoadingStatus } from "./types";

class Router {
  private static instance: Router;
  private python: "pyodide" | "server" = "pyodide";
  private serverConnectable = false;
  private pyodideLoaded = false;
  private emitter = mitt<Events>(); // mitt 인스턴스 생성

  private constructor() {
    // 생성자에서는 초기화 로직만 수행
  }

  private async loadPyodide() {
    if (this.pyodideLoaded) return;
    try {
      await getPyodide();
      this.pyodideLoaded = true;
      this.emitter.emit("loadingStatusChange", this.getLoadingStatus()); // 이벤트 발생
    } catch (error) {
      console.error("error while connecting pyodide:", error);
      this.pyodideLoaded = false;
      this.emitter.emit("loadingStatusChange", this.getLoadingStatus());
    }
  }

  private async checkServerConnection() {
    try {
      const response = await fetch("/api");
      this.serverConnectable = response.ok;
      if (this.serverConnectable) this.python = "server";
      this.emitter.emit("loadingStatusChange", this.getLoadingStatus());
    } catch (error) {
      this.serverConnectable = false;
      console.error("error while connecting server:", error);
      this.emitter.emit("loadingStatusChange", this.getLoadingStatus());
    }
  }

  public getPython() {
    return this.python;
  }

  public setPython(python: "pyodide" | "server") {
    if (python === "server" && !this.serverConnectable) {
      return false;
    }
    this.python = python;
    this.emitter.emit("loadingStatusChange", this.getLoadingStatus());
    return true;
  }

  public static async init(): Promise<Router> {
    if (!Router.instance) {
      Router.instance = new Router();
      await Promise.all([Router.instance.loadPyodide(), Router.instance.checkServerConnection()]);
    }
    return Router.instance;
  }

  public static getInstance(): Router | undefined {
    return this.instance;
  }

  public getLoadingStatus(): LoadingStatus {
    return {
      loadingPyodide: this.python === "pyodide" && !this.pyodideLoaded,
      loadingServer: this.python === "server" && !this.serverConnectable,
      loading:
        (this.python === "pyodide" && !this.pyodideLoaded) ||
        (this.python === "server" && !this.serverConnectable),
    };
  }

  // mitt 이벤트 등록
  public on(event: keyof Events, handler: (event: LoadingStatus) => void) {
    this.emitter.on(event, handler);
  }

  // mitt 이벤트 해제
  public off(event: keyof Events, handler: (event: LoadingStatus) => void) {
    this.emitter.off(event, handler);
  }

  public getAPI() {
    return api[this.python];
  }
}

export async function initRouter(): Promise<Router> {
  return Router.init();
}

export function getRouter(): Router | undefined {
  if (!Router.getInstance()) {
    Router.init();
  }
  return Router.getInstance();
}
