"use client"


import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...")
    router.push("/login")
  }

  return (

    
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Developer Portal</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="User"
                size="sm"
                src="/placeholder.svg?height=32&width=32"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">user@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

