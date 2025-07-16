"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building2, BookOpen, Award, LogOut, Eye } from "lucide-react"

const API_BASE_URL ="http://localhost:8000/api/v1/users"

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [systemData, setSystemData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      window.location.href = "/auth/login"
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      window.location.href = "/"
      return
    }

    setUser(parsedUser)
    fetchSystemData()
  }, [])

  const fetchSystemData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/system-overview/admin`, {
        credentials: "include",
      })
      const data = await response.json()

      if (data.success) {
        setSystemData(data.data)
      } else {
        setError("Failed to fetch system data")
      }
    } catch (err) {
      setError("Network error",err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = systemData
    ? [
        {
          label: "Total Employees",
          value: systemData.employees?.length || 0,
          icon: Users,
          color: "bg-blue-500",
        },
        {
          label: "Total Companies",
          value: systemData.companies?.length || 0,
          icon: Building2,
          color: "bg-green-500",
        },
        {
          label: "Total Courses",
          value: systemData.courses?.length || 0,
          icon: BookOpen,
          color: "bg-purple-500",
        },
        {
          label: "Total Certificates",
          value: systemData.certificates?.length || 0,
          icon: Award,
          color: "bg-orange-500",
        },
      ]
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="employees" className="space-y-4">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>All Employees</CardTitle>
                <CardDescription>Manage employee accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemData?.employees?.map((employee) => (
                    <div key={employee._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{employee.EmployeName}</h3>
                        <p className="text-sm text-gray-600">{employee.EmployeEmail}</p>
                        <p className="text-sm text-gray-500">ID: {employee.EmployeeId}</p>
                        <p className="text-sm text-gray-500">Company: {employee.CompantName}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle>All Companies</CardTitle>
                <CardDescription>Manage company accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemData?.companies?.map((company) => (
                    <div key={company._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{company.CompantName}</h3>
                        <p className="text-sm text-gray-600">{company.Companyemail}</p>
                        <p className="text-sm text-gray-500">ID: {company.CompanyId}</p>
                        <p className="text-sm text-gray-500">Phone: {company.CompanyPhonenumber}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>Manage training courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemData?.courses?.map((course) => (
                    <div key={course._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{course.CourseName}</h3>
                        <p className="text-sm text-gray-600">Company: {course.CompanyNamecourse?.CompantName}</p>
                        <p className="text-sm text-gray-500">Duration: {course.Duration}</p>
                        <p className="text-sm text-gray-500">Enrolled: {course.NumberEmployeenrolled} employees</p>
                        <p className="text-sm text-gray-500">Videos: {course.Videos?.length || 0}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>All Certificates</CardTitle>
                <CardDescription>Manage issued certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemData?.certificates?.map((certificate) => (
                    <div key={certificate._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{certificate.CertificateName}</h3>
                        <p className="text-sm text-gray-600">Certificate #: {certificate.NumberCertificate}</p>
                        <p className="text-sm text-gray-500">Employee: {certificate.Employeename?.EmployeName}</p>
                        <p className="text-sm text-gray-500">
                          Company: {certificate.CompanyNameCertificate?.CompantName}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}