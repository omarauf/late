export const updateItem = <T extends { id: string }>(arr: T[], newValue: T) =>
  arr.map((obj) => {
    if (obj.id === newValue.id) {
      return { ...newValue };
    }
    return obj;
  });

export const updateItemV2 = <T extends { id: string }>(arr: T[], newValue: T) => {
  const newArr = [...arr];
  const index = arr.findIndex((u) => u.id === newValue.id);
  newArr[index] = newValue;
  return newArr;
};

export const removeItem = <T extends { id: string }>(arr: T[], newValue: T) =>
  arr.filter((obj) => obj.id !== newValue.id);
