"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Bot, Ticket } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {data:session} = useSession()
  
  const email = session?.user?.email
  
  const handleSignout = async() => {
    await signOut()
  }

  

  return (
    <div className="flex h-screen">
   
      <div
        className="w-64 bg-gray-800 text-white p-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/sidebar-bg.jpg')", 
        }}
      >
        <h2 className="text-lg font-bold mb-8">Noc-Ai Developer Portal</h2>
        <ul>
          <li className="mb-4">
          <Link
              href="/incident-ticket"
              className={`flex items-center p-2 rounded-lg transition-colors ${
                pathname.startsWith("/incident-ticket") 
                  ? "bg-blue-500 text-white" 
                  : "text-white hover:bg-gray-700" 
              }`}
            >
            <Ticket className="mr-2 h-5 w-5" />
              Incident Ticket
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/ai-assistance"
              className={`flex items-center p-2 rounded-lg transition-colors ${
                pathname === "/ai-assistance"
                  ? "bg-blue-500 text-white" 
                  : "text-white hover:bg-gray-700" 
              }`}
            >
                <Bot className="mr-2 h-5 w-5" />
              AI Assistance
            </Link>
          </li>
        </ul>
      </div>

    
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
                className="transition-transform text-white"
                color="primary"
                name="User"
                size="sm"
                src="/assets/user-interface.png"
                
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleSignout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}