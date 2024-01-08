const parseJson = (jsonString?: string) => {
  if (jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return [];
    }
  }
  return [];
};

export { parseJson };
