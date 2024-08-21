export function isURL(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export function getFileNameFromURL(url: string): string {
  try {
    // URL 객체 생성
    const parsedUrl = new URL(url);
    const pathSegments = parsedUrl.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    const decodedFilename = decodeURIComponent(lastSegment);

    return decodedFilename;
  } catch (error) {
    throw new Error("Invalid URL");
  }
}
