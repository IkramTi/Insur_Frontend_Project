export const getUpdatedList = (list, newObject) => {
  const index = list.findIndex(item => item.Id === newObject.Id);
  return [
    ...list.slice(0, index),
    newObject,
    ...list.slice(index + 1)
  ]
}