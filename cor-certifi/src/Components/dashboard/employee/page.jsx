"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Award, Play, CheckCircle, Clock, LogOut, Trophy } from "lucide-react"

const API_BASE_URL = "http://localhost:8000/api/v1/users"

// Add this function before the component
const downloadCertificate = async (certificate) => {
  // Create a temporary div to render the certificate
  const certificateElement = document.createElement("div")
  certificateElement.innerHTML = `
    <div style="width: 800px; height: 600px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; font-family: 'Times New Roman', serif; color: #333;">
      <!-- Certificate content will be rendered here -->
    </div>
  `
  // Open certificate in new window for download
  window.open(`/certificate/${certificate._id}`, "_blank")
}

console.log(downloadCertificate)

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  const [certificates, setCertificates] = useState([])
  const [progress, setProgress] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  console.log(selectedCourse)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      window.location.href = "/auth/login"
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "employee") {
      window.location.href = "/"
      return
    }
    setUser(parsedUser)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch all courses
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
        setCertificates(certificatesData.data.filter((cert) => cert.Employeename?.EmployeeId === user?.employeeId))
      }

      // Fetch progress (assuming we have the employee's ID)
      if (user?.employeeId) {
        const progressResponse = await fetch(`${API_BASE_URL}/progress/${user.employeeId}`, {
          credentials: "include",
        })
        const progressData = await progressResponse.json()
        if (progressData.success) {
          setProgress(progressData.data)
        }
      }
    } catch (err) {
      setError("Failed to fetch data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const markVideoComplete = async (courseId, videoTitle) => {
    try {
      const response = await fetch(`${API_BASE_URL}/progress/mark-complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          employeeId: user.employeeId,
          courseId,
          videoTitle,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setSuccess(data.message)
        fetchData() // Refresh data
      } else {
        setError(data.message || "Failed to mark video as complete")
      }
    } catch (err) {
      setError("Network error")
      console.error(err)
    }
  }

  const getCourseProgress = (courseId) => {
    const courseProgress = progress.find((p) => p.course._id === courseId)
    if (!courseProgress) return { completed: 0, total: 0, percentage: 0 }
    const course = courses.find((c) => c._id === courseId)
    const totalVideos = course?.Videos?.length || 0
    const completedVideos = courseProgress.videosCompleted?.length || 0
    return {
      completed: completedVideos,
      total: totalVideos,
      percentage: totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0,
    }
  }

  const isVideoCompleted = (courseId, videoTitle) => {
    const courseProgress = progress.find((p) => p.course._id === courseId)
    return courseProgress?.videosCompleted?.includes(videoTitle) || false
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
      label: "Available Courses",
      value: courses.length,
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      label: "Courses in Progress",
      value: progress.filter((p) => !p.isCertified).length,
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      label: "Certificates Earned",
      value: certificates.length,
      icon: Award,
      color: "bg-green-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
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
          <TabsList>
            <TabsTrigger value="courses">Available Courses</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="certificates">My Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="grid gap-6">
              {courses.map((course) => {
                const courseProgress = getCourseProgress(course._id)
                return (
                  <Card key={course._id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{course.CourseName}</CardTitle>
                          <CardDescription>
                            Duration: {course.Duration} • {course.Videos?.length || 0} videos
                          </CardDescription>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedCourse(course)}>
                              <Play className="h-4 w-4 mr-2" />
                              Start Course
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{course.CourseName}</DialogTitle>
                              <DialogDescription>Complete all videos to earn your certificate</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Course Progress</span>
                                <span className="text-sm text-gray-500">
                                  {courseProgress.completed}/{courseProgress.total} videos completed
                                </span>
                              </div>
                              <Progress value={courseProgress.percentage} className="w-full" />
                              <div className="space-y-3 max-h-96 overflow-y-auto">
                                {course.Videos?.map((video, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      {isVideoCompleted(course._id, video.title) ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                      ) : (
                                        <Play className="h-5 w-5 text-gray-400" />
                                      )}
                                      <div>
                                        <h4 className="font-medium">{video.title}</h4>
                                        <p className="text-sm text-gray-500">{video.url}</p>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant={isVideoCompleted(course._id, video.title) ? "outline" : "default"}
                                      onClick={() => markVideoComplete(course._id, video.title)}
                                      disabled={isVideoCompleted(course._id, video.title)}
                                    >
                                      {isVideoCompleted(course._id, video.title) ? "Completed" : "Mark Complete"}
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(courseProgress.percentage)}%</span>
                        </div>
                        <Progress value={courseProgress.percentage} />
                        {courseProgress.percentage === 100 && (
                          <Badge className="bg-green-100 text-green-800">
                            <Trophy className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              {courses.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No courses available at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>My Learning Progress</CardTitle>
                <CardDescription>Track your progress across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progress.map((prog) => (
                    <div key={prog._id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{prog.course?.CourseName}</h3>
                        {prog.isCertified && (
                          <Badge className="bg-green-100 text-green-800">
                            <Award className="h-3 w-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Videos Completed</span>
                          <span>{prog.videosCompleted?.length || 0} videos</span>
                        </div>
                        <div className="text-sm text-gray-500">Duration: {prog.course?.Duration}</div>
                      </div>
                    </div>
                  ))}
                  {progress.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Start taking courses to see your progress here.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>My Certificates</CardTitle>
                <CardDescription>Your earned certificates and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate._id}
                      className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{certificate.CertificateName}</h3>
                          <p className="text-sm text-gray-600">Certificate #{certificate.NumberCertificate}</p>
                          <p className="text-sm text-gray-500">
                            Issued by: {certificate.CompanyNameCertificate?.CompantName}
                          </p>
                        </div>
                        <div className="text-right">
                          <Award className="h-8 w-8 text-yellow-500 mb-2" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/certificate/${certificate._id}`, "_blank")}
                          >
                            View & Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {certificates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p>Complete courses to earn certificates!</p>
                    </div>
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
