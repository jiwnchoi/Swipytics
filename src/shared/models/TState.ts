import type TSession from "./TSession";

interface TState {
  sessions: TSession[];
  timestamp: number;
}

export default TState;
