export function throwError(
  msg: string,
  code: number,
  dirname: string,
  filename: string
): never {
  const error = {
    msg,
    dirname,
    filename,
    code,
  };
  throw error;
}

export default throwError;
