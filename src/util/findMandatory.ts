/**
 * Get item from array filtered by accept method. It is expected that the item exists, otherwise an error is thrown.
 * @param array Array of items
 * @param accept Accept method
 * @returns Item
 */
export default function<T>(array : T[], accept: (item : T) => boolean) : T {
  if (array.length == 0) {
    throw new Error("Array is empty.")
  }
  const result = array.find(accept)
  if (!result) {
    throw new Error("Invalid " + typeof(array[0]) + ".")
  }
  return result
}
