"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@heroui/react"
import { X } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface IncidentDrawerProps {
  isOpen: boolean
  onClose: () => void
  incident: any
}


export default function IncidentDrawer({ isOpen, onClose, incident }: IncidentDrawerProps) {
  const [drawerWidth, setDrawerWidth] = useState(400)
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude])
      })
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

  if (!isOpen) return null

  const incidentLocation: [number, number] = [
    Number.parseFloat(incident.latitude),
    Number.parseFloat(incident.longitude),
  ]

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
          {currentLocation && (
            <MapContainer center={currentLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={currentLocation}>
                <Popup>Current Location</Popup>
              </Marker>
              <Marker position={incidentLocation}>
                <Popup>Incident Location</Popup>
              </Marker>
              <Polyline positions={[currentLocation, incidentLocation]} color="red" />
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  )
}

