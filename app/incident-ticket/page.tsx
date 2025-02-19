"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Button } from "@heroui/react"
import { EyeIcon } from "lucide-react"
import Layout from "@/components/Layout/Layout"
import { useIncidentTicketPerSite } from "../services/incidentTicketPerSite"
import type { IncidentPerSite } from "@/types/incidentPerSite"
import IncidentDrawer from "@/components/IncidentDrawer"

const statusColorMap = {
  open: "warning",
  closed: "danger",
} as any

const columns = [
  { name: "INCIDENT ID", uid: "id" },
  { name: "ALARM STATUS", uid: "alarmStatus" },
  { name: "SEVERITY", uid: "severity" },
  { name: "CREATED", uid: "incidentCreationTime" },
  { name: "ACTIONS", uid: "actions" },
]

export default function IncidentTicketPage() {
  const router = useRouter()
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const { loading, data, getIncidentPerSite } = useIncidentTicketPerSite()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState<IncidentPerSite | null>(null)

  useEffect(() => {
    getIncidentPerSite()
  }, []) 

  const renderCell = (incident: any, columnKey: any) => {
    const cellValue = incident[columnKey]

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        )
      case "alarmStatus":
        return (
          <Chip className="capitalize" color={statusColorMap[incident.alarmStatus]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case "severity":
        return (
          <Chip
            className="capitalize"
            color={incident.severity === "0" ? "danger" : "warning"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case "incidentCreationTime":
        return <p>{new Date(cellValue).toLocaleString()}</p>
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Details">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => {
                  setSelectedIncident(incident)
                  setIsDrawerOpen(true)
                }}
              >
                <EyeIcon className="text-default-400" />
              </Button>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Incident Tickets</h1>
        <Table
          aria-label="Incident tickets table"
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys as any}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={data || []}>
            {(item) => (
              <TableRow key={item.id} className="cursor-pointer hover:bg-gray-100">
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedIncident && (
        <IncidentDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} incident={selectedIncident} />
      )}
    </Layout>
  )
}