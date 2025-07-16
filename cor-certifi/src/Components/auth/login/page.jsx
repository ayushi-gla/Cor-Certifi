"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Building2, Users, Shield } from "lucide-react"

const API_BASE_URL = "http://localhost:8000/api/v1/users"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const roles = [
    { id: "admin", title: "Admin", icon: Shield, color: "text-red-600" },
    { id: "company", title: "Company", icon: Building2, color: "text-blue-600" },
    { id: "employee", title: "Employee", icon: Users, color: "text-green-600" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      let endpoint = ""
      let payload = {}

      switch (selectedRole) {
        case "admin":
          endpoint = "/login/admin"
          payload = {
            AdminEmail: formData.email,
            Password: formData.password,
          }
          break
        case "company":
          endpoint = "/login/company"
          payload = {
            Companyemail: formData.email,
            Password: formData.password,
          }
          break
        case "employee":
          endpoint = "/login/employee"
          payload = {
            EmployeEmail: formData.email,
            Password: formData.password,
          }
          break
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            role: selectedRole,
            ...data.data,
          }),
        )
        // Redirect to appropriate dashboard
        window.location.href = `/dashboard/${selectedRole}`
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const renderForm = () => {
    const currentRole = roles.find((r) => r.id === selectedRole)
    if (!currentRole) return null

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <currentRole.icon className={`h-8 w-8 ${currentRole.color}`} />
          </div>
          <CardTitle className="text-2xl">Login as {currentRole.title}</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password || ""}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => (window.location.href = `/auth/register?role=${selectedRole}`)}
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-8" onClick={() => (window.location.href = "/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {!selectedRole ? (
          <div>
            <h1 className="text-3xl font-bold text-center mb-8">Choose Your Role</h1>
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center">
                    <role.icon className={`h-12 w-12 mx-auto mb-4 ${role.color}`} />
                    <CardTitle>{role.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <Button variant="outline" onClick={() => setSelectedRole("")}>
                Change Role
              </Button>
            </div>
            {renderForm()}
          </div>
        )}
      </div>
    </div>
  )
}
