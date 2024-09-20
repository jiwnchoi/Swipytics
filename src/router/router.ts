/* eslint-disable no-console */
import mitt from "mitt";
import { getPyodide } from "../workers";
import call from "./call";
import {
  type TEndpointArgs,
  type TEndpointKey,
  type TRouterEvent,
  type TRouterLoadingStatus,
} from "./types";

class Router {
  private python: "pyodide" | "server" = "pyodide";
  private serverConnectable = false;
  private pyodideLoaded = false;
  private emitter = mitt<TRouterEvent>();

  constructor() {
    this.initializeRouter();
  }

  private async initializeRouter() {
    await Promise.all([this.loadPyodide(), this.checkServerConnection()]);
  }

  private async loadPyodide() {
    if (this.pyodideLoaded) return;
    try {
      await getPyodide();
      this.pyodideLoaded = true;
      this.emitter.emit("loadingStatusChange", this.getLoadingStatus());
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

  public getPythonType() {
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

  public getLoadingStatus(): TRouterLoadingStatus {
    return {
      loadingPyodide: this.python === "pyodide" && !this.pyodideLoaded,
      loadingServer: this.python === "server" && !this.serverConnectable,
      loading:
        (this.python === "pyodide" && !this.pyodideLoaded) ||
        (this.python === "server" && !this.serverConnectable),
    };
  }

  public on(event: keyof TRouterEvent, handler: (event: TRouterLoadingStatus) => void) {
    this.emitter.on(event, handler);
  }

  public off(event: keyof TRouterEvent, handler: (event: TRouterLoadingStatus) => void) {
    this.emitter.off(event, handler);
  }

  public async call<E extends TEndpointKey>(
    endpoint: E,
    args?: TEndpointArgs<E, typeof this.python>,
  ) {
    try {
      return await call(this.getPythonType(), endpoint, args);
    } catch (error) {
      console.error("error while calling endpoint:", error);
      return null;
    }
  }
}

export default new Router();
