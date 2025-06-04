"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CollegeAPI } from "@/lib/college-api"
import { Shield, University } from "lucide-react"

export default function CollegeLoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCollegeLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await CollegeAPI.authenticateUser(credentials)

      if (result.success) {
        // Store user data and token
        localStorage.setItem("user", JSON.stringify(result.user))
        localStorage.setItem("college_auth_token", result.token)

        toast({
          title: "Login Successful!",
          description: `Welcome ${result.user.name}! Authenticated via college system.`,
        })

        // Redirect based on role
        switch (result.user.role) {
          case "admin":
          case "hod":
            router.push("/admin")
            break
          case "faculty":
            router.push("/faculty-dashboard")
            break
          case "coordinator":
            router.push("/coordinator-dashboard")
            break
          default:
            router.push("/")
        }
      } else {
        toast({
          title: "Authentication Failed",
          description: result.error || "Invalid college credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to college authentication system",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <University className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">College Portal Login</CardTitle>
          <CardDescription>Sign in with your college credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCollegeLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">College Username/ID</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your college username"
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your college password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Sign In with College Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>This will authenticate you through the official college system</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
