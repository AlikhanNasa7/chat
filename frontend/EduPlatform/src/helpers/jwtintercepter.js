import axios, {} from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'
const API_BASE_URL = BASE_URL

const useAxiosWithInterceptor = () => {

    const jwtAxios = axios.create({baseURL: API_BASE_URL});
    const navigate = useNavigate();

    const goRoot = () => {
        navigate("/");
    }

    const goLogin = () => {
        navigate("/login");
    }

    jwtAxios.interceptors.response.use(
        (response) => {
            console.log(response);
            console.log(">>>>>>>>>>>>");
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 || 403) {
              axios.defaults.withCredentials = true;
       
                try {
                  const response = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/"
                  );
                  if (response["status"] == 200) {
                    return jwtAxios(originalRequest);
                  }
                } catch (refreshError) {
                  const goLogin = () => navigate("/login");
                  goLogin();
                  return Promise.reject(refreshError);
                }
              
            }
          }
    );
    return jwtAxios;
}

export default useAxiosWithInterceptor;
