import type TSession from "./TSession";

type TState = {
  sessions: TSession[];
  timestamp: number;
};

export default TState;
