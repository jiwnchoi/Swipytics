def getFileExtension(filename: str) -> str:
  return filename.split(".")[-1]


__all__ = ["getFileExtension"]
