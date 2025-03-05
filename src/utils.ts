export function create2dArray<T>(
  rows: number, cols: number, values: (i: number, j: number) => T
): T[][] {
  const result = []
  for (let i = 0; i < rows; i++) {
    result.push([] as T[]);
    for (let j = 0; j < cols; j++) {
      result[i].push(values(i, j))
    }
  }

  return result
}

export const randomBool = () => Math.random() > 0.5
