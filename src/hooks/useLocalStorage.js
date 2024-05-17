const useLocalStorage = () => {
  const storeData = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error storing data for key ${key}:`, error);
      throw error; // Propagate the error to handle it where it's used
    }
  };

  const getData = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      throw error;
    }
  };

  const storeObjectData = (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error storing object data for key ${key}:`, error);
      throw error;
    }
  };

  const getObjectData = (key) => {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving object data for key ${key}:`, error);
      throw error;
    }
  };

  return { storeData, getData, storeObjectData, getObjectData };
};

export default useLocalStorage;
