import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
  code?: number;
}

type AxiosErrorResponse = AxiosError<ApiErrorResponse>;

export const handleApiError = (error: unknown): never => {
  const axiosError = error as AxiosErrorResponse;

  if (axiosError.response) {
    // Server responded with an error status code
    throw new Error(axiosError.response.data.message || "An error occurred");
  } else if (axiosError.request) {
    // No response received
    throw new Error("No response received from the server");
  } else {
    // Request setup error
    throw new Error(axiosError.message || "An unexpected error occurred");
  }
};
