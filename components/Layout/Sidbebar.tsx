"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { TicketIcon, BrainCircuitIcon } from "lucide-react"
import { Listbox, ListboxItem } from "@heroui/react"

export function Sidebar() {
  const pathname = usePathname()
  const [selected, setSelected] = useState(new Set([pathname]))

  const handleSelectionChange = (keys: any) => {
    setSelected(keys)
  }

  return (
    <div className="w-64 h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <Listbox
        aria-label="Sidebar Navigation"
        selectedKeys={selected}
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
      >
        <ListboxItem key="/incident-ticket" startContent={<TicketIcon className="w-5 h-5" />}>
          <Link href="/incident-ticket">Incident Ticket</Link>
        </ListboxItem>
        <ListboxItem key="/ai-assistance" startContent={<BrainCircuitIcon className="w-5 h-5" />}>
          <Link href="/ai-assistance">AI Assistance</Link>
        </ListboxItem>
      </Listbox>
    </div>
  )
}

