import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/refresh", {
      withCredentials: true,
    });
    setAuth({ accessToken: response.data.accessToken });
    console.log("refresh res", response);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
