"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { GraduationCap, Shield, Users, BookOpen, Eye, EyeOff, Calendar, Mail, University } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const formRef = React.useRef<HTMLFormElement>(null)

  // Sample users for demonstration
  const sampleUsers = [
    {
      email: "john.doe@student.iare.ac.in",
      role: "student",
      name: "John Doe",
      icon: GraduationCap,
      color: "from-blue-600 to-blue-800",
    },
    {
      email: "sarah.coordinator@iare.ac.in",
      role: "coordinator",
      name: "Sarah Johnson",
      icon: Calendar,
      color: "from-teal-600 to-teal-800",
    },
    {
      email: "dr.smith@faculty.iare.ac.in",
      role: "faculty",
      name: "Dr. Michael Smith",
      icon: BookOpen,
      color: "from-green-600 to-green-800",
    },
    {
      email: "prof.wilson@hod.iare.ac.in",
      role: "hod",
      name: "Prof. David Wilson",
      icon: Users,
      color: "from-purple-600 to-purple-800",
    },
    {
      email: "admin@iare.ac.in",
      role: "admin",
      name: "Admin User",
      icon: Shield,
      color: "from-red-600 to-red-800",
    },
  ]

  const getUserRoleFromEmail = (email: string) => {
    if (email.includes("@student.")) return "student"
    if (email.includes("@faculty.")) return "faculty"
    if (email.includes("@hod.")) return "hod"
    if (email.includes("coordinator@")) return "coordinator"
    if (email.includes("admin@")) return "admin"
    return "student" // default
  }

  const getUserNameFromEmail = (email: string) => {
    const user = sampleUsers.find((u) => u.email === email)
    if (user) return user.name

    // Generate name from email if not in sample users
    const username = email.split("@")[0]
    return username
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock authentication - in real app, this would call your API
    setTimeout(() => {
      const userRole = getUserRoleFromEmail(formData.email)
      const userName = getUserNameFromEmail(formData.email)

      // Store user data in localStorage (in real app, use proper auth state management)
      const userData = {
        role: userRole,
        email: formData.email,
        name: userName,
        id: `${userRole.toUpperCase()}${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
      }

      localStorage.setItem("user", JSON.stringify(userData))

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${userData.name}!`,
      })

      // Redirect based on role
      switch (userRole) {
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

      setIsLoading(false)
    }, 1500)
  }

  const handleQuickLogin = (email: string) => {
    // Set form data
    setFormData({ email, password: "demo123" })

    // Trigger login after a short delay to ensure state is updated
    setTimeout(() => {
      setIsLoading(true)

      // Get user role and name
      const userRole = getUserRoleFromEmail(email)
      const userName = getUserNameFromEmail(email)

      // Store user data in localStorage
      const userData = {
        role: userRole,
        email: email,
        name: userName,
        id: `${userRole.toUpperCase()}${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
      }

      localStorage.setItem("user", JSON.stringify(userData))

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${userData.name}!`,
      })

      // Redirect based on role
      setTimeout(() => {
        setIsLoading(false)
        switch (userRole) {
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
      }, 1000)
    }, 100)
  }

  const currentUserType = sampleUsers.find((user) => user.email === formData.email)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-[#1e3a8a] text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                <University className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">IARE Student Portal</h1>
                <p className="text-xs text-blue-200">Institute of Aeronautical Engineering</p>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#1e3a8a] flex items-center justify-center shadow-lg">
              <University className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e3a8a]">Welcome Back</h1>
            <p className="text-lg text-gray-600 mb-6">Sign in to access the IARE Student Community Portal</p>
            <Badge className="bg-[#1e3a8a]/10 text-[#1e3a8a] px-4 py-2 text-sm font-semibold border-[#1e3a8a]/20">
              Official IARE Portal
            </Badge>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl border border-gray-200 bg-white">
            <CardHeader className="text-center pb-2">
              <div
                className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${
                  currentUserType?.color || "from-[#1e3a8a] to-blue-800"
                } flex items-center justify-center shadow-lg`}
              >
                {currentUserType ? (
                  <currentUserType.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                ) : (
                  <Mail className="h-8 w-8 md:h-10 md:w-10 text-white" />
                )}
              </div>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
                {currentUserType
                  ? `${currentUserType.role.charAt(0).toUpperCase() + currentUserType.role.slice(1)} Login`
                  : "Portal Login"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {currentUserType ? `Welcome back, ${currentUserType.name}` : "Enter your IARE credentials to continue"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form ref={formRef} onSubmit={handleLogin}>
                <div className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">IARE Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your IARE email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]"
                      required
                    />
                    {formData.email && (
                      <div className="text-xs text-gray-500">
                        Role detected:{" "}
                        <Badge variant="secondary" className="ml-1 bg-[#1e3a8a]/10 text-[#1e3a8a]">
                          {getUserRoleFromEmail(formData.email)}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        className="border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a] pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className={`w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl mt-6`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      <>
                        {currentUserType ? (
                          <currentUserType.icon className="h-4 w-4 mr-2" />
                        ) : (
                          <University className="h-4 w-4 mr-2" />
                        )}
                        Sign In to IARE Portal
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Quick Login Options */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">Quick Login (Demo)</p>
                <div className="grid grid-cols-1 gap-2">
                  {sampleUsers.map((user) => (
                    <Button
                      key={user.email}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs border-[#1e3a8a]/20 hover:bg-[#1e3a8a]/5"
                      onClick={() => handleQuickLogin(user.email)}
                    >
                      <user.icon className="h-3 w-3 mr-2 text-[#1e3a8a]" />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)} - {user.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Additional Links */}
              <div className="text-center space-y-2 pt-4 border-t border-gray-200">
                <Link href="/auth/forgot-password" className="text-sm text-[#1e3a8a] hover:text-[#1e40af]">
                  Forgot your password?
                </Link>
                <div className="text-sm text-gray-600">
                  Need help?{" "}
                  <Link href="/support" className="text-[#1e3a8a] hover:text-[#1e40af]">
                    Contact IT Support
                  </Link>
                </div>
                <div className="text-xs text-gray-500 pt-2">
                  This portal is integrated with IARE's official authentication system
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
