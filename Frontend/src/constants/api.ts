import AsyncStorage from "@react-native-async-storage/async-storage";


const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, ""); 
  }
  // Fallback IP (change this to your PC's IP)
  return "http://192.168.1.13:5000";
};

export const API_BASE_URL = getBaseUrl();
export const API_URL = `${API_BASE_URL}/api`;

export const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};