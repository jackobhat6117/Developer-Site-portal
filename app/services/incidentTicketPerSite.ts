import { useState } from "react";
import { getRequest, postRequest } from "@/utils/axiosHelper";
import { getSession } from "next-auth/react";
import { setAuthtoken } from "@/utils/axiosInstance";
import { IncidentPerSite } from "@/types/incidentPerSite";
import { ApiResponse } from "@/types/apiResponse";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
  code?: number;
}

type AxiosErrorResponse = AxiosError<ApiErrorResponse>;

export const useIncidentTicketPerSite = () => {
    const [data, setData] = useState<IncidentPerSite[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getIncidentPerSite = async () => {
        setLoading(true);
        setError(null);
        try {
            const session: any = await getSession();
            const id = session.user.id;
            console.log('id', id);
            const token = session?.accessToken;
    
            if (token) {
                setAuthtoken(token);
            } else {
                setAuthtoken(null);
            }
    
            
            const url = `/incidentTicket/getAllSiteIncidentTicketPerSiteEngineer/${id}`;
    
           
            const response:any = await getRequest<ApiResponse<IncidentPerSite[]>>({ url });
    
            console.log("alarm API Response:", response); 
            setData(response);
            return response;
        } catch (err) {
            const axiosError = err as AxiosErrorResponse;
            setError(axiosError.response?.data?.message || axiosError.message);
        } finally {
            setLoading(false);
        }
    };


  return { data, loading, error, getIncidentPerSite, };
};