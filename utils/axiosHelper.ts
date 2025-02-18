import { ApiResponse } from "@/types/apiResponse";
import AxiosInstance from "./axiosInstance";
import { handleApiError } from "./axiosError";

interface RequestParams {
  url: string;
  params?: Record<string, any>;
}

interface DataParams {
  data?: Record<string, any>;
}

interface FormDataParams {
  url: string;
  data: FormData;
  params?: Record<string, any>;
}



export const getRequest = async <T>({ url, params = {} }: RequestParams): Promise<T> => {
  try {
   
    const res = await AxiosInstance.get<T>(url, { params });
    console.log('res', res)
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
export const postRequest = async <T>({ url, data = {}, params = {} }: RequestParams & DataParams): Promise<T> => {
  try {
    const res = await AxiosInstance.post<T>(url, data, { params });
    console.log('thisres', res)
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error
  }
};

export const postFormDataRequest = async <T>({ url, data, params = {} }: FormDataParams): Promise<T> => {
  try {
    const res = await AxiosInstance.post<T>(url, data, {
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error
  }
};

export const patchRequest = async <T>({ url, data = {}, params = {} }: RequestParams & DataParams): Promise<T> => {
  try {
    const res = await AxiosInstance.patch<T>(url, data, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error
  }
};

export const patchFormDataRequest = async <T>({ url, data, params = {} }: FormDataParams): Promise<T> => {
  try {
    const res = await AxiosInstance.patch<T>(url, data, {
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error
  }
};

export const putRequest = async <T>({ url, data = {}, params = {} }: RequestParams & DataParams): Promise<T> => {
  try {
    const res = await AxiosInstance.put<T>(url, data, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error
  }
};

export const deleteRequest = async <T>({ url, params = {} }: RequestParams): Promise<T> => {
  try {
    const res = await AxiosInstance.delete<T>(url, { params });
    return res.data;
  } catch (error) {
    handleApiError(error);
    throw error
  }
};