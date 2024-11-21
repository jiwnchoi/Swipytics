export function isURL(string: string): boolean {
  if (string.startsWith("/") || string.startsWith("./") || string.startsWith("../")) {
    return true;
  }

  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export function getFileNameFromURL(url: string): string {
  try {
    let pathSegments: string[];

    if (url.startsWith("/") || url.startsWith("./") || url.startsWith("../")) {
      pathSegments = url.split("/");
    } else {
      const parsedUrl = new URL(url);
      pathSegments = parsedUrl.pathname.split("/");
    }

    pathSegments = pathSegments.filter((segment) => segment.length > 0);
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (!lastSegment) {
      throw new Error("No filename found");
    }

    return decodeURIComponent(lastSegment);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Invalid URL or path");
  }
}
