# System Architecture

Our application follows a layered architecture design, with each layer having specific responsibilities. The following diagram illustrates the structure and dependencies between layers:

```
      app
       ↓
   components
       ↓
      hooks
  ↓           ↓
stores     workers
  ↓           ↓
     shared
```

## Layer Descriptions

### 1. app
- **Description**: Application pages
- **Responsibility**: Defines the main pages and routes of the application

### 2. components
- **Description**: Single components
- **Responsibility**: Reusable UI components used across different pages

### 3. hooks
- **Description**: Business logic (related to view)
- **Responsibility**: Custom React hooks for handling component-specific logic

### 4. stores
- **Description**: zustand store
- **Responsibility**: Manages global state and provides getters and setters

### 5. workers
- **Description**: Python-based data processing logic wrapped with Web Worker
- **Responsibility**: Handles heavy computations and data processing tasks

### 6. shared
- **Description**: Types and utils
- **Responsibility**: Contains shared types and utility functions used across the application

## Dependencies

- References are only available from top to bottom.
- Reverse references are not allowed to maintain a clean architecture.