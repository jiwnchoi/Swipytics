/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Difference = {
  path: string;
  value: any;
};

function getDifferences(object: any, prevObject: any, path: string[] = []): Difference[] {
  const differences: Difference[] = [];

  if (object == null || prevObject == null) {
    if (object !== prevObject) {
      differences.push({
        path: path.join("."),
        value: object,
      });
    }
    return differences;
  }

  // Ensure both are objects before proceeding
  if (typeof object !== "object" || typeof prevObject !== "object") {
    if (object !== prevObject) {
      differences.push({
        path: path.join("."),
        value: object,
      });
    }
    return differences;
  }

  const keys = new Set([...Object.keys(object), ...Object.keys(prevObject)]);

  for (const key of keys) {
    const newPath = [...path, key];
    if (!(key in prevObject)) {
      differences.push({
        path: newPath.join("."),
        value: object[key],
      });
    } else if (!(key in object)) {
      differences.push({
        path: newPath.join("."),
        value: undefined,
      });
    } else if (
      typeof object[key] === "object" &&
      object[key] != null &&
      typeof prevObject[key] === "object" &&
      prevObject[key] != null
    ) {
      const nestedDiff = getDifferences(object[key], prevObject[key], newPath);
      differences.push(...nestedDiff);
    } else if (object[key] !== prevObject[key]) {
      differences.push({
        path: newPath.join("."),
        value: object[key],
      });
    }
  }

  return differences;
}

export default getDifferences;
