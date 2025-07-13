import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Users, TrendingUp, CheckCircle, Star, Globe, Shield, Clock, Target, Briefcase, GraduationCap, Phone, Mail, MapPin, ArrowRight, Play } from 'lucide-react'

export default function CorporateTrainingLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-#AOAECD">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top--200 z-50 " >
        <a className="flex items-center justify-center" href="#">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">CorpLearn Pro</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#programs">
            Programs
          </a>
          <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#testimonials">
            Success Stories
          </a>
          <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#pricing">
            Pricing
          </a>
          <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#contact">
            Contact
          </a>
        </nav>
        <div className="ml-6 flex gap-2">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">


          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit bg-blue-100 text-blue-800 hover:bg-blue-200">
                    🏆 Industry Leading Training Platform
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Workforce with
                    <span className="text-green-600"> Professional Certification</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Empower your team with industry-recognized certifications and cutting-edge training programs. Boost
                    productivity, enhance skills, and drive business growth.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Corporate Training Dashboard"
                  className="w-full h-[400px] object-cover"
                  height="400"
                  src="https://www.superior-resource.com/wp-content/uploads/2022/09/business-networking.jpeg"
                  width="600"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-white border-y">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-black-600">500K+</div>
                <div className="text-sm text-gray-500">Professionals Certified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black-600">2,500+</div>
                <div className="text-sm text-gray-500">Corporate Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black-600">95%</div>
                <div className="text-sm text-gray-500">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black-600">4.9/5</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-blue-100 text-blue-800">Why Choose Us</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need for Corporate Training
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our comprehensive platform provides all the tools and resources needed to deliver world-class training
                  programs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Industry Certifications</CardTitle>
                  <CardDescription>
                    Globally recognized certifications that add real value to your team's credentials
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Interactive Learning</CardTitle>
                  <CardDescription>
                    Engaging multimedia content with hands-on exercises and real-world scenarios
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    Advanced analytics and reporting to monitor learning progress and ROI
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>
                    Centralized dashboard to manage multiple learners and track team performance
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Enterprise Security</CardTitle>
                  <CardDescription>
                    Bank-level security with SSO integration and compliance certifications
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>24/7 Support</CardTitle>
                  <CardDescription>
                    Round-the-clock technical support and dedicated customer success managers
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">Training Programs</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Training Solutions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose from our extensive catalog of professional development programs designed for modern businesses.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-xl">Leadership & Management</CardTitle>
                      <CardDescription>Executive leadership development programs</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Strategic Leadership Certification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Team Management Excellence
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Change Management Mastery
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Executive Communication
                    </li>
                  </ul>
                  <Button className="mt-4 w-full bg-transparent" variant="outline">
                    Explore Leadership Programs
                  </Button>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-xl">Technical Skills</CardTitle>
                      <CardDescription>Cutting-edge technology certifications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Cloud Computing (AWS, Azure, GCP)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Data Science & Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Cybersecurity Fundamentals
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Digital Transformation
                    </li>
                  </ul>
                  <Button className="mt-4 w-full bg-transparent" variant="outline">
                    Explore Technical Programs
                  </Button>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-xl">Soft Skills</CardTitle>
                      <CardDescription>Essential workplace competencies</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Effective Communication
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Emotional Intelligence
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Problem Solving & Critical Thinking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Time Management & Productivity
                    </li>
                  </ul>
                  <Button className="mt-4 w-full bg-transparent" variant="outline">
                    Explore Soft Skills Programs
                  </Button>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-xl">Compliance & Safety</CardTitle>
                      <CardDescription>Regulatory and safety training</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      GDPR & Data Privacy
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Workplace Safety Standards
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Anti-Harassment Training
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Financial Compliance
                    </li>
                  </ul>
                  <Button className="mt-4 w-full bg-transparent" variant="outline">
                    Explore Compliance Programs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-yellow-100 text-yellow-800">Success Stories</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Industry Leaders</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how organizations worldwide have transformed their workforce with our training programs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-gray-600 mb-4">
                    "CorpLearn Pro transformed our team's capabilities. The certification programs are top-notch and the
                    ROI has been incredible."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">John Davis</div>
                      <div className="text-xs text-gray-500">VP of HR, TechCorp Inc.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-gray-600 mb-4">
                    "The platform is intuitive and the content quality is exceptional. Our employee engagement scores
                    have increased by 40%."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-600">SM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Sarah Martinez</div>
                      <div className="text-xs text-gray-500">L&D Director, Global Solutions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-gray-600 mb-4">
                    "Best investment we've made in our people. The certification tracking and analytics are
                    game-changers."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">MR</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Michael Roberts</div>
                      <div className="text-xs text-gray-500">CEO, Innovation Labs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-purple-100 text-purple-800">Pricing Plans</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Training Solution</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Flexible pricing options designed to scale with your organization's needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="p-6 border-2">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <CardDescription>Perfect for small teams</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-gray-500">/user/month</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Up to 50 users
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Basic course library
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Progress tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Email support
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
              <Card className="p-6 border-2 border-blue-200 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl">Professional</CardTitle>
                  <CardDescription>Ideal for growing companies</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$59</span>
                    <span className="text-gray-500">/user/month</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Up to 500 users
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Full course library
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Custom branding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Start Free Trial</Button>
                </CardContent>
              </Card>
              <Card className="p-6 border-2">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Custom</span>
                    <span className="text-gray-500"> pricing</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Unlimited users
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Custom content creation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      SSO integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Dedicated success manager
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      24/7 phone support
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Transform Your Workforce?
                </h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of companies that trust CorpLearn Pro for their training and certification needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input type="email" placeholder="Enter your work email" className="max-w-lg flex-1 bg-white" />
                  <Button type="submit" variant="secondary">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-blue-200">Start your 14-day free trial. No credit card required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
                <p className="text-gray-500">
                  Ready to discuss your training needs? Our team of experts is here to help you design the perfect
                  learning solution for your organization.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>sales@corplearnpro.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>123 Business Ave, Suite 100, New York, NY 10001</span>
                  </div>
                </div>
              </div>
              <Card className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Request a Demo</CardTitle>
                  <CardDescription>See CorpLearn Pro in action with a personalized demo</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Work Email" type="email" />
                    <Input placeholder="Company Name" />
                    <Input placeholder="Phone Number" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Demo</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="font-bold">CorpLearn Pro</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering organizations worldwide with professional training and certification programs.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <nav className="flex flex-col space-y-2 text-sm text-gray-400">
                <a href="#" className="hover:text-white">
                  Features
                </a>
                <a href="#" className="hover:text-white">
                  Integrations
                </a>
                <a href="#" className="hover:text-white">
                  Security
                </a>
                <a href="#" className="hover:text-white">
                  API
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Programs</h4>
              <nav className="flex flex-col space-y-2 text-sm text-gray-400">
                <a href="#" className="hover:text-white">
                  Leadership
                </a>
                <a href="#" className="hover:text-white">
                  Technical Skills
                </a>
                <a href="#" className="hover:text-white">
                  Soft Skills
                </a>
                <a href="#" className="hover:text-white">
                  Compliance
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <nav className="flex flex-col space-y-2 text-sm text-gray-400">
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
                <a href="#" className="hover:text-white">
                  Status
                </a>
                <a href="#" className="hover:text-white">
                  Community
                </a>
              </nav>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">© 2024 CorpLearn Pro. All rights reserved.</p>
            <nav className="flex gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white">
                Cookie Policy
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}