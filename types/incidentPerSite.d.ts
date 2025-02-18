import { ApiResponse } from "./apiResponse"


export interface IncidentPerSite extends ApiResponse  {
        id: string
        severity: string
        site: string,
        incidentCreationTime: ISODateString
        incidentCloseTime: ISODateString
        alarmStartTime: ISODateString
        alarmEndTime: ISODateString
        alarmDescription: string
        alarmStatus: string
        region: string
        locationLat: string
        locationLong: string
    }
