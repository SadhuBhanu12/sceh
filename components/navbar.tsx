"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Vote,
  Settings,
  Menu,
  Home,
  Plus,
  BarChart3,
  LogOut,
  GraduationCap,
  BookOpen,
  Users,
  Shield,
  Bell,
  Search,
} from "lucide-react"

interface UserInterface {
  role: string
  name: string
  email: string
  id: string
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserInterface | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/auth/login")
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student":
        return GraduationCap
      case "coordinator":
        return Calendar
      case "faculty":
        return BookOpen
      case "hod":
        return Users
      case "admin":
        return Shield
      default:
        return Menu
    }
  }

  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Dashboard", icon: Home },
      { href: "/events", label: "Events", icon: Calendar },
      { href: "/voting", label: "Voting", icon: Vote },
    ]

    if (user?.role === "admin" || user?.role === "hod") {
      baseItems.push(
        { href: "/admin", label: "Administration", icon: Settings },
        { href: "/analytics", label: "Analytics", icon: BarChart3 },
      )
    }

    if (user?.role === "faculty") {
      baseItems.push({ href: "/faculty-dashboard", label: "Faculty Panel", icon: BarChart3 })
    }

    if (user?.role === "coordinator") {
      baseItems.push({ href: "/coordinator-dashboard", label: "Coordinator Panel", icon: BarChart3 })
    }

    return baseItems
  }

  const navItems = getNavItems()
  const RoleIcon = user ? getRoleIcon(user.role) : Menu

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-[#1e3a8a] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span>📧 info@iare.ac.in</span>
            <span>📞 +91-8415-024999</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Welcome to IARE Student Portal</span>
            {user && (
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {user.role.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md border-b-2 border-[#1e3a8a]">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4">
                <div className="h-14 w-14 rounded-lg bg-[#1e3a8a] flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1e3a8a]">SCEH++</h1>
                  <p className="text-xs text-gray-600 font-medium">Student Community Event & Voting Portal</p>
                  <p className="text-xs text-gray-500">Institute of Aeronautical Engineering</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-[#1e3a8a] hover:text-white rounded-md text-gray-700"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {user && (
                <>
                  <Button variant="ghost" size="sm" className="hidden md:flex text-gray-600 hover:text-[#1e3a8a]">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hidden md:flex text-gray-600 hover:text-[#1e3a8a]">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Link href="/register-event">
                    <Button size="sm" className="hidden md:flex bg-[#1e3a8a] hover:bg-[#1e40af] text-white shadow-md">
                      <Plus className="h-4 w-4 mr-2" />
                      New Event
                    </Button>
                  </Link>
                </>
              )}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                      <Avatar className="h-12 w-12 border-2 border-[#1e3a8a]">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt={user.name} />
                        <AvatarFallback className="bg-[#1e3a8a] text-white font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="h-4 w-4 text-[#1e3a8a]" />
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                        </div>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <Badge variant="outline" className="w-fit text-[#1e3a8a] border-[#1e3a8a]">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Menu className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white shadow-md">Sign In</Button>
                </Link>
              )}

              {/* Mobile Navigation */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-4">
                    {user && (
                      <div className="flex items-center space-x-3 p-4 bg-[#1e3a8a]/5 rounded-lg border border-[#1e3a8a]/20">
                        <Avatar className="h-12 w-12 border-2 border-[#1e3a8a]">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" alt={user.name} />
                          <AvatarFallback className="bg-[#1e3a8a] text-white font-semibold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-[#1e3a8a]">{user.name}</p>
                          <Badge variant="outline" className="text-xs text-[#1e3a8a] border-[#1e3a8a]">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 text-sm font-medium p-3 rounded-md hover:bg-[#1e3a8a]/10 transition-colors text-gray-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5 text-[#1e3a8a]" />
                        <span>{item.label}</span>
                      </Link>
                    ))}

                    {user && (
                      <Link href="/register-event" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Register New Event
                        </Button>
                      </Link>
                    )}

                    {user && (
                      <Button
                        variant="outline"
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
