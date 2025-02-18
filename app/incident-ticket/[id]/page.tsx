"use client"

import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Card, CardHeader, CardBody, Button, Chip, Avatar, Divider, Textarea } from "@heroui/react"
import { ArrowLeft, Clock, User, AlertTriangle, MessageSquare } from "lucide-react"
import Layout from "@/components/Layout/Layout"
import { IncidentPerSite } from "@/types/incidentPerSite"
import { useSession } from "next-auth/react"

const statusColorMap = {
  open: "warning",
  "in progress": "primary",
  resolved: "success",
  closed: "danger",
} as any

export default function IncidentTicketDetailPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const id = Number.parseInt(params.id as string)
  const {data: session} = useSession()
  const sessionData = session as any
  console.log('sessionheader', session)
  const firstName = sessionData?.user?.firstName  || "Unknown User";
  const lastName = sessionData?.user?.lastName

  const userName = firstName + " " + lastName


  const incidentData = searchParams.get('incident')
 
  const [incident, setIncident] = useState<IncidentPerSite>(incidentData ? JSON.parse(incidentData) : null)
  const [isEditingRCA, setIsEditingRCA] = useState(false)
  const [rcaForm, setRcaForm] = useState({
    rootCause: "",
    resolution: "",
    preventiveMeasures: "",
  })

  console.log('incidenData', incident)

  if (!incident) {
    return (
      <div>
        <Layout>
          <div className="flex items-center justify-center text-2xl text-gray-700 mt-10">Incident not found</div>
        </Layout>
      </div>
    )
  }

  const handleRCASubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIncident((prev: any) => ({
      ...prev!,
      rca: rcaForm,
    }))
    setIsEditingRCA(false)
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        <Button variant="light" startContent={<ArrowLeft />} onPress={() => router.back()}>
          Back to Incidents
        </Button>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{incident.id}</h1>
              <p className="text-small text-default-500">Ticket #{incident.id}</p>
            </div>
            <Chip color={statusColorMap[incident.alarmStatus]} variant="flat">
              {incident.alarmStatus}
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <User className="text-default-400" />
                <span className="font-semibold">Assignee:</span> {userName}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-default-400" />
                <span className="font-semibold">Created:</span> {incident.incidentCreationTime}
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-default-400" />
                <span className="font-semibold">Priority:</span>
                <Chip
                  color={incident.alarmStatus === "high" ? "danger" : incident.alarmStatus === "medium" ? "warning" : "success"}
                  size="sm"
                >
                  {incident.alarmStatus}
                </Chip>
              </div>
            </div>
            <Divider />
            <div className="my-4">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p>{incident.alarmDescription}</p>
            </div>
            <Divider />
            {/* <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Updates</h2>
              <div className="space-y-4">
                {incident.updates?.map((update: any, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <Avatar
                      icon={<MessageSquare size={20} />}
                      classNames={{
                        base: "bg-primary",
                        icon: "text-white",
                      }}
                    />
                    <div>
                      <p className="text-small text-default-500">{update.timestamp}</p>
                      <p>{update.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <Divider className="my-4" />
            {/* <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Root Cause Analysis (RCA)</h2>
              {incident.rca && !isEditingRCA ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Root Cause:</h3>
                    <p>{incident.rca.rootCause}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Resolution:</h3>
                    <p>{incident.rca.resolution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Preventive Measures:</h3>
                    <p>{incident.rca.preventiveMeasures}</p>
                  </div>
                  <Button color="primary" onPress={() => setIsEditingRCA(true)}>
                    Edit RCA
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRCASubmit} className="space-y-4">
                  <div>
                    <label htmlFor="rootCause" className="block text-sm font-medium text-gray-700">
                      Root Cause
                    </label>
                    <Textarea
                      id="rootCause"
                      placeholder="Describe the root cause of the incident"
                      value={rcaForm.rootCause}
                      onChange={(e) => setRcaForm((prev) => ({ ...prev, rootCause: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="resolution" className="block text-sm font-medium text-gray-700">
                      Resolution
                    </label>
                    <Textarea
                      id="resolution"
                      placeholder="Describe how the incident was resolved"
                      value={rcaForm.resolution}
                      onChange={(e) => setRcaForm((prev) => ({ ...prev, resolution: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="preventiveMeasures" className="block text-sm font-medium text-gray-700">
                      Preventive Measures
                    </label>
                    <Textarea
                      id="preventiveMeasures"
                      placeholder="Describe measures to prevent similar incidents in the future"
                      value={rcaForm.preventiveMeasures}
                      onChange={(e) => setRcaForm((prev) => ({ ...prev, preventiveMeasures: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button color="primary" type="submit">
                      Submit RCA
                    </Button>
                    {incident.rca && (
                      <Button color="secondary" variant="light" onPress={() => setIsEditingRCA(false)}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </div> */}
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}