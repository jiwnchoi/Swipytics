# Swipytics: The Simplest On-the-fly Exploratory Analysis

![swipytics_teaser](https://github.com/user-attachments/assets/de4b6261-6c01-42f8-a3aa-be808c5a072a)


## Demo

[Live Web Demo](https://jiwnchoi.github.io/Swipytics)

## Development

Install [pnpm](https://pnpm.io/installation) and [Hatch](https://hatch.pypa.io/latest/install/) to set up the development environment.

You can manage both TypeScript and Python environments with **_pnpm_**. Check the [`package.json`](https://github.com/jiwnchoi/Sequilt/blob/main/package.json).

Linter and formatter are configured with [Biome](https://biomejs.dev) and [Ruff](https://docs.astral.sh/ruff/). We highly recommend installing editor plugins. 


```bash
git clone https://github.com/jiwnchoi/Swipytics.git
cd Swipytics
pnpm install

# Only works with Pyodide as a backend
pnpm dev

# Use server option if you want to use local python as a backend
pnpm dev:server


# Lint and Format
pnpm check # Lint and Format both .py and .ts files

# Test
pnpm test # Test TypeScript with Vitest and Python with pytest
```

