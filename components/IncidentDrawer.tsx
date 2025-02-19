"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@heroui/react"
import { X } from "lucide-react"
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api"

interface IncidentDrawerProps {
  isOpen: boolean
  onClose: () => void
  incident: any
}

const mapContainerStyle = {
  height: "400px",
  width: "100%",
}

const defaultCenter = {
  lat: 9.145,
  lng: 40.4897,
}

export default function IncidentDrawer({ isOpen, onClose, incident }: IncidentDrawerProps) {
  const [drawerWidth, setDrawerWidth] = useState(400)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude || 10.875835 ,
            lng: position.coords.longitude || 39.644656,
          })
        },
        (error) => {
          console?.error("Error getting location:", error)
          setCurrentLocation(defaultCenter) // Fallback to default
        }
      )
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (resizeHandleRef.current && resizeHandleRef.current.classList.contains("resizing")) {
        const newWidth = window.innerWidth - e.clientX
        setDrawerWidth(Math.max(300, Math.min(newWidth, window.innerWidth - 100)))
      }
    }

    const handleMouseUp = () => {
      if (resizeHandleRef.current) {
        resizeHandleRef.current.classList.remove("resizing")
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (currentLocation && incident) {
      const directionsService = new google.maps.DirectionsService()

      const incidentLocation = {
        lat: Number.parseFloat(incident.locationLat),
        lng: Number.parseFloat(incident.locationLong),
      }

      directionsService.route(
        {
          origin: currentLocation,
          destination: incidentLocation,
          travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, or TRANSIT
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result)
          } else {
            console.error("Error fetching directions:", status)
          }
        }
      )
    }
  }, [currentLocation, incident])

  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out"
      style={{ width: `${drawerWidth}px` }}
    >
      <div
        ref={resizeHandleRef}
        className="absolute top-0 left-0 w-1 h-full cursor-ew-resize bg-gray-300 hover:bg-gray-400"
        onMouseDown={() => {
          if (resizeHandleRef.current) {
            resizeHandleRef.current.classList.add("resizing")
          }
        }}
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Incident Details</h2>
          <Button isIconOnly variant="light" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="mb-4">
          <p>
            <strong>Incident ID:</strong> {incident.id}
          </p>
          <p>
            <strong>Alarm Status:</strong> {incident.alarmStatus}
          </p>
          <p>
            <strong>Severity:</strong> {incident.severity}
          </p>
          <p>
            <strong>Created:</strong> {new Date(incident.incidentCreationTime).toLocaleString()}
          </p>
        </div>
        <div className="h-[400px] mb-4">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={currentLocation || defaultCenter}
              zoom={13}
            >
              {currentLocation && (
                <Marker position={currentLocation} label="Current Location" />
              )}
              {incident && (
                <Marker
                  position={{
                    lat: Number.parseFloat(incident.locationLat),
                    lng: Number.parseFloat(incident.locationLong),
                  }}
                  label="Incident Location"
                />
              )}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  )
}