"use client"

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { EyeIcon, EyeOffIcon, UserRoundPen } from "lucide-react"
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@heroui/react"
import { signIn } from "next-auth/react"

import { ToastHandler } from "@/components/toast"
import { useRouter } from "next/navigation"




export default function Login() {
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const[isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    const response = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  
    console.log("signIn response:", response);
  
    if (response?.ok) {
      ToastHandler({ status: "success", message: "Authentication Successful" });
       router.push("/incident-ticket"); // Ensure navigation completes
    } else {
      ToastHandler({ status: "error", message: "Error in Authentication" });
    }
  
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
          {/* <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Developer Portal Logo"
            width={64}
            height={64}
            className="rounded-full mb-4"
          /> */}
          <UserRoundPen className="h-10 w-10"/>
          <h2 className="text-2xl font-bold">Developer Portal Login</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter your credentials to access the portal</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input 
            isRequired
            errorMessage = "Please enter a valid email"
            type="email" 
            label="Email"
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            required
            labelPlacement="outside" />

            <Input
             
              errorMessage = "Please enter the password"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                  
                </button>
              }
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button color="primary" type="submit" className="mt-2" isLoading={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <Divider className="my-2" />
          <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
            <div>
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

