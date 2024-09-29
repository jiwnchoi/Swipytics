# Event Logger

Event-Tracking Logger

Provides powerful event logging based on custom properties.

## Getting Started

### React

```tsx
import { LoggerClient } from "@logger";
import { LoggerClientProvider, useLoggerClient } from "@logger/react";

const loggerClient = new LoggerClient();

export default function App() {
  return (
    <LoggerClientProvider client={loggerClient} eventTypes={["click", "scroll", "change"]}>
      <Example />
    </LoggerClientProvider>
  );
}

function Example() {
  const logger = useLoggerClient();

  useEffect(() => {
    logger.log("hello", "world", { foo: "bar" });
  }, [logger]);

  return (
    <div data-log-click="container">
      <input data-log-change="input-change" />
    </div>
  );
}
```

### Vanilla

```typescript
import { LoggerClient } from "@logger";

const loggerClient = new LoggerClient();

loggerClient.log("hello", "world", { foo: "bar" });

loggerClient.registerLogger(window, ["click", "scroll", "change"]);

...

<div data-log-click="container">
  <input data-log-change="input-change" />
</div>
```

## Recipes

### Export Logs

logs will be download in `.json`

```typescript
loggerClient.export();
```

### Register Custom Event 🚧

```typescript
document.querySelector("#logged");
loggerClient.registerEvent(elem, [
  {
    eventType: "click",
    payloadCallback: () => ({ foo: "bar" }),
  },
  {
    eventType: "curtom-event",
    payloadCallback: () => ({ custom: "event" }),
  },
]);

const loggedElems = document.querySelectorAll(".logged");
for (const el of loggedElems) {
  loggerClient.registerEvent(elem, [
    {
      eventType: "click",
      payloadCallback: () => ({ only: "one" }),
    },
  ]);
}
```

## Todo 🚧

1. onLogged callback (for sending logs to server)
2. open method for input storage (Local Storage, Session Storage, IndexedDB, ...)
3. export log parquet or arrow download support
