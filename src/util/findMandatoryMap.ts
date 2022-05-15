/**
 * Get item from map with key. It is expected that the key exists, otherwise an error is thrown.
 * @param map Map
 * @param key Key
 * @returns Item
 */
export default function<K,V>(map : Map<K,V>, key : K) : V {  
  const result = map.get(key)
  if (!result) {
    throw new Error("No item with key: " + key)
  }
  return result
}
