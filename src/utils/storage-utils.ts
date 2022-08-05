export const saveItem = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getValueBykey = (key: string) => {
  return localStorage.getItem(key);
};
