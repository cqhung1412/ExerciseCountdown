import AsyncStorage from "@react-native-async-storage/async-storage";
import objectUtil from "./objects";

const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (error) {
    console.error("storeData():", error);
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    return value;
  } catch (error) {
    console.error("getData():", error);
    return null;
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (error) {
    console.error("removeData():", error);
  }
};

const storageUtil = {
  storeData,
  getData,
  removeData,
};

export default storageUtil;
