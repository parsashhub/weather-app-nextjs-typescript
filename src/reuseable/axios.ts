import axios from "axios";

export const initInterceptors = (showLoader: any, hideLoader: any) => {
  axios.interceptors.request.use(
    (req: any) => {
      showLoader();
      return req;
    },
    (err: any) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response: any) => {
      hideLoader();
      return response;
    },
    (err: any) => {
      hideLoader();
      return Promise.reject(err);
    }
  );
};
