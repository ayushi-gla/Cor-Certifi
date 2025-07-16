"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Users, Award, Plus, LogOut, Edit, Trash2 } from "lucide-react"

const API_BASE_URL = "http://localhost:8000/api/v1/users"

export default function CompanyDashboard() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [courseForm, setCourseForm] = useState({
    CourseName: "",
    NumberEmployeenrolled: "",
    CompanyNamecourse: "",
    Duration: "",
    Videos: [{ title: "", url: "" }],
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      window.location.href = "/auth/login"
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "company") {
      window.location.href = "/"
      return
    }
    setUser(parsedUser)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch courses
      const coursesResponse = await fetch(`${API_BASE_URL}/course/all`, {
        credentials: "include",
      })
      const coursesData = await coursesResponse.json()
      if (coursesData.success) {
        setCourses(coursesData.data)
      }

      // Fetch certificates
      const certificatesResponse = await fetch(`${API_BASE_URL}/certificate/all`, {
        credentials: "include",
      })
      const certificatesData = await certificatesResponse.json()
      if (certificatesData.success) {
        setCertificates(certificatesData.data)
      }
    } catch (err) {
      setError("Failed to fetch data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await fetch(`${API_BASE_URL}/course/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...courseForm,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setSuccess("Course created successfully!")
        setShowCreateCourse(false)
        setCourseForm({
          CourseName: "",
          NumberEmployeenrolled: "",
          CompanyNamecourse: "",
          Duration: "",
          Videos: [{ title: "", url: "" }],
        })
        fetchData()
      } else {
        setError(data.message || "Failed to create course")
      }
    } catch (err) {
      setError("Network error")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addVideoField = () => {
    setCourseForm((prev) => ({
      ...prev,
      Videos: [...prev.Videos, { title: "", url: "" }],
    }))
  }

  const updateVideo = (index, field, value) => {
    setCourseForm((prev) => ({
      ...prev,
      Videos: prev.Videos.map((video, i) => (i === index ? { ...video, [field]: value } : video)),
    }))
  }

  const removeVideo = (index) => {
    setCourseForm((prev) => ({
      ...prev,
      Videos: prev.Videos.filter((_, i) => i !== index),
    }))
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

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      label: "Total Enrollments",
      value: courses.reduce((sum, course) => sum + (course.NumberEmployeenrolled || 0), 0),
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Certificates Issued",
      value: certificates.length,
      icon: Award,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
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
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>Add a new training course for your employees</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateCourse} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      value={courseForm.CourseName}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, CourseName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={courseForm.CompanyNamecourse}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, CompanyNamecourse: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enrolledCount">Number of Employees Enrolled</Label>
                    <Input
                      id="enrolledCount"
                      type="number"
                      value={courseForm.NumberEmployeenrolled}
                      onChange={(e) =>
                        setCourseForm((prev) => ({ ...prev, NumberEmployeenrolled: Number.parseInt(e.target.value) }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 4 weeks, 20 hours"
                      value={courseForm.Duration}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, Duration: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Course Videos</Label>
                    {courseForm.Videos.map((video, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder="Video title"
                          value={video.title}
                          onChange={(e) => updateVideo(index, "title", e.target.value)}
                          required
                        />
                        <Input
                          placeholder="Video URL"
                          value={video.url}
                          onChange={(e) => updateVideo(index, "url", e.target.value)}
                          required
                        />
                        {courseForm.Videos.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeVideo(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addVideoField}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowCreateCourse(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating..." : "Create Course"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Your Courses</CardTitle>
                <CardDescription>Manage your training courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{course.CourseName}</h3>
                        <p className="text-sm text-gray-600">Duration: {course.Duration}</p>
                        <p className="text-sm text-gray-500">Enrolled: {course.NumberEmployeenrolled} employees</p>
                        <p className="text-sm text-gray-500">Videos: {course.Videos?.length || 0}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {courses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No courses created yet. Create your first course to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Issued Certificates</CardTitle>
                <CardDescription>Certificates issued to your employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div key={certificate._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{certificate.CertificateName}</h3>
                        <p className="text-sm text-gray-600">Certificate #: {certificate.NumberCertificate}</p>
                        <p className="text-sm text-gray-500">Employee: {certificate.Employeename?.EmployeName}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Certificate
                      </Button>
                    </div>
                  ))}
                  {certificates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No certificates issued yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
