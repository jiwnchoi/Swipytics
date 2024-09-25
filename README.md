# Swipytics

**Swipytics** is the simplest on-the-fly exploratory data analysis (EDA) tool using sequential visualization recommendations.

All you need to do is swipe! Swipytics automatically shows visualizations that help you understand your data.

![swipytics_teaser](/assets/README.png)

## Getting Started

Swipytics runs in two enviornments: [Standalone](https://jiwnchoi.github.io/Swipytics), Server.

[Standalone](https://jiwnchoi.github.io/Swipytics) is run within the browser by [Pyodide](https://pyodide.org/en/stable/) without any additioanl installation or setup. Also Swipytics-stanalone can be installed in device as a [Progressive Web App (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

Server runs on top of a Python web server and can be used via an instant Python environment like Binder or Colab, or by following the instructions below to install and use it. Swipytics running in the Server environment generates visualisations faster than Standalone.

![binder-icon](/assets/launch-binder.svg)
![colab-icon](/assets/open-in-colab.svg)

## Installation 🚧

```shell
pip install swipytics
swipytics # Run Swipytics
```

## Development

### Setup Development Enviornment

Install [node.js](http://docs.npmjs.com/downloading-and-installing-node-js-and-npm/), [pnpm](https://pnpm.io/installation) and [Hatch](https://hatch.pypa.io/latest/install/) to set up the development environment.

You can manage both TypeScript (Frontend) and Python (Backend) environments with **_pnpm_**. Check the [`package.json`](https://github.com/jiwnchoi/Sequilt/blob/main/package.json).

```bash
git clone https://github.com/jiwnchoi/Swipytics.git
cd Swipytics
pnpm install

# Only works with Standalone (Pyodide).
pnpm dev

# Use server option if you want to work with Server.
pnpm dev:server

# Lint and Format
pnpm check # Lint and Format both .py and .ts files

# Test
pnpm test # Test TypeScript with Vitest and Python with pytest
```

### System Architecture

![system-architecture](/assets/architecture.svg)

- `@hooks` call `@api` with Tanstack Query (with caching), and `@stores` call `@api` with Zustand (w.o. caching)
- If Swipytics run as a Stanalone, `@api` routes async call to `@workers` which excutes python files with Pyodide and Web Worker. For Swipyytics-server, `@api` routes to FastAPI server.
- Note that `useSessionStore` in `@stores` and `sessionState` in `app.py` are always the same
- Event Logger captures the user-triggered Event object from window

### Coding Convention 🚧

<details>
<summary>
Common
</summary>

- Avoid using verbs in boolean variables. (isLoading 🚫, loading ✅)

</details>

<details>
<summary>
Client (TypeScript)
</summary>

- Buisiness logic is placed in `@hooks`, not `@components`. Especially, try to avoid use primitive hooks (`useState`, `useEffect`, `useQuery`, `useStore`, ...) in `@component`.
- You must reference modules in the direction of the dependency edge in figure above; you must not reference them backwards or skipping the edges.

</details>

<details>
<summary>
Engine (Python)
</summary>

- Objects' name in `app.py` are written in camelCase, but other python files are written in snake_case. This is a convention to ensure strong adherence to camelCase in JavaScript, but also flexibility to comply with PEP8 (snake_case) in Python.

</details>

###

## Acknowledgements

- [Pyodide](https://pyodide.org/en/stable/) for excuting Swipytics standalone.
- [Draco 2](https://dig.cmu.edu/draco2/intro.html) for visualization reocmmendation.
