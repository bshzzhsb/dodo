export function getTranslate(matrix: string) {
  const transformMatrix = matrix
    .slice(7, matrix.length - 1)
    .split(',')
    .map((item) => +item);
  return transformMatrix.slice(4);
}
