export function getTransform(matrix: string) {
  const transformMatrix = matrix
    .slice(7, matrix.length - 1)
    .split(',')
    .map((item) => +item);
  return {
    scale: [transformMatrix[0], transformMatrix[3]],
    skew: [transformMatrix[1], transformMatrix[2]],
    translate: [transformMatrix[4], transformMatrix[5]],
  };
}

export function generateTransform(scale: number[], skew: number[], translate: number[]) {
  return `matrix(${scale[0]}, ${skew[0]}, ${skew[1]}, ${scale[1]}, ${translate[0]}, ${translate[1]})`;
}
