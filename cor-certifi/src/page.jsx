"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Shield, BookOpen, Award, TrendingUp } from "lucide-react"

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Manage the entire training system",
      icon: Shield,
      color: "bg-red-500",
      features: ["System Overview", "Manage All Users", "Analytics", "System Settings"],
    },
    {
      id: "company",
      title: "Company",
      description: "Create and manage training courses",
      icon: Building2,
      color: "bg-blue-500",
      features: ["Create Courses", "Manage Employees", "Track Progress", "Issue Certificates"],
    },
    {
      id: "employee",
      title: "Employee",
      description: "Take courses and earn certificates",
      icon: Users,
      color: "bg-green-500",
      features: ["Browse Courses", "Track Progress", "Earn Certificates", "View Achievements"],
    },
  ]

  const stats = [
    { label: "Active Courses", value: "150+", icon: BookOpen },
    { label: "Certified Employees", value: "2,500+", icon: Award },
    { label: "Companies", value: "50+", icon: Building2 },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CorpTrain Pro</h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => (window.location.href = "/auth/login")}>
                Login
              </Button>
              <Button onClick={() => (window.location.href = "/auth/register")}>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Transform Your Corporate Training</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Streamline employee development with our comprehensive training and certification platform. Create courses,
            track progress, and issue certificates all in one place.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Role</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === role.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-lg">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/auth/register?role=${role.id}`
                    }}
                  >
                    Get Started as {role.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CorpTrain Pro?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Interactive Courses</h4>
              <p className="text-gray-600">Create engaging video-based courses with progress tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Automated Certificates</h4>
              <p className="text-gray-600">Generate certificates automatically upon course completion</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Progress Analytics</h4>
              <p className="text-gray-600">Track employee progress and course effectiveness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">CorpTrain Pro</span>
          </div>
          <p className="text-gray-400">Empowering organizations through effective training and certification</p>
        </div>
      </footer>
    </div>
  )
}
