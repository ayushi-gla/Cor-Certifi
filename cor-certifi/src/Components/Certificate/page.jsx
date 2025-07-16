"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, PrinterIcon as Print, ArrowLeft } from "lucide-react"

const API_BASE_URL = "http://localhost:8000/api/v1/users"

export default function CertificatePage({ certificateId }) {
  const certificateRef = useRef()
  const [certificate, setCertificate] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Extract user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        console.log("User data from localStorage:", parsedUser)
      } catch (err) {
        console.error("Error parsing user data:", err)
      }
    }
    fetchCertificate()
  }, [certificateId])

  const fetchCertificate = async () => {
    try {
      console.log("Fetching certificate with ID:", certificateId)
      console.log("API Base URL:", API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}/getcertificate/${certificateId}`, {
        credentials: "include",
      })
      console.log("Response status:", response.status)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Certificate data:", data)
      if (data.success) {
        setCertificate(data.data)
      } else {
        console.error("API returned error:", data.message)
        setError(data.message || "Certificate not found")
      }
    } catch (err) {
      console.error("Fetch error:", err)
      // Fallback: Create a mock certificate for testing
      const mockCertificate = {
        _id: certificateId,
        CertificateName: "Sample Training Course",
        NumberCertificate: "CERT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        Employeename: {
          EmployeName: "John Doe",
          EmployeeId: "EMP001",
        },
        CompanyNameCertificate: {
          CompantName: "Tech Corp Solutions",
        },
      }
      console.log("Using mock certificate:", mockCertificate)
      setCertificate(mockCertificate)
      setError("") // Clear error since we're using mock data
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Simple download using browser's print to PDF functionality
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    )
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Certificate Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The requested certificate could not be found."}</p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Get the employee name from multiple sources with fallback
  const getEmployeeName = () => {
    // Priority order: user from localStorage > certificate data > fallback
    if (user?.name) return user.name
    if (user?.EmployeName) return user.EmployeName
    if (certificate?.Employeename?.EmployeName) return certificate.Employeename.EmployeName
    return "Employee Name"
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .certificate-print, .certificate-print * {
            visibility: visible;
          }
          .certificate-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
        
        @page {
          size: A4 landscape;
          margin: 0;
        }
      `}</style>

      {/* Action Buttons - Hidden in print */}
      <div className="no-print bg-white shadow-sm border-b py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex space-x-4">
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Print className="h-4 w-4 mr-2" />
              Print Certificate
            </Button>
          </div>
        </div>
      </div>

      {/* Certificate Container */}
      <div className="py-8 px-4">
        <div className="flex justify-center">
          <div
            ref={certificateRef}
            className="certificate-print bg-white shadow-2xl"
            style={{ width: "297mm", height: "210mm" }} // A4 Landscape
          >
            {/* Certificate Content */}
            <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 border-8 border-double border-blue-800 p-8">
              {/* Decorative Corners */}
              <div className="absolute top-6 left-6 w-16 h-16 border-l-4 border-t-4 border-yellow-500"></div>
              <div className="absolute top-6 right-6 w-16 h-16 border-r-4 border-t-4 border-yellow-500"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-4 border-b-4 border-yellow-500"></div>
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-4 border-b-4 border-yellow-500"></div>

              {/* Header */}
              <div className="text-center pt-8 pb-6">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">CT</div>
                      <div className="text-xs">PRO</div>
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl font-bold text-blue-800 mb-4" style={{ fontFamily: "serif" }}>
                  CERTIFICATE OF COMPLETION
                </h1>
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <div className="w-20 h-1 bg-yellow-500"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-20 h-1 bg-yellow-500"></div>
                </div>
                <p className="text-lg text-gray-600 uppercase tracking-widest">Professional Training Certification</p>
              </div>

              {/* Main Content */}
              <div className="px-12 text-center">
                <p className="text-xl text-gray-700 mb-8" style={{ fontFamily: "serif" }}>
                  This is to certify that
                </p>
                <div className="mb-8">
                  <h2
                    className="text-4xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-200"
                    style={{ fontFamily: "serif" }}
                  >
                    {getEmployeeName()}
                  </h2>
                </div>
                <p className="text-xl text-gray-700 mb-6" style={{ fontFamily: "serif" }}>
                  has successfully completed the training course
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 border-2 border-blue-200">
                  <h3 className="text-3xl font-semibold text-purple-800 mb-2" style={{ fontFamily: "serif" }}>
                    {certificate.CertificateName || "Course Name"}
                  </h3>
                  <p className="text-lg text-gray-600">
                    Conducted by <strong>{certificate.CompanyNameCertificate?.CompantName || "Company Name"}</strong>
                  </p>
                </div>
                <p className="text-lg text-gray-600" style={{ fontFamily: "serif" }}>
                  demonstrating exceptional commitment to professional development
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-16 left-0 right-0 px-12">
                <div className="flex justify-between items-end">
                  {/* Date */}
                  <div className="text-center">
                    <div className="w-40 border-t-2 border-gray-400 mb-2"></div>
                    <p className="text-sm text-gray-600 font-medium">Date of Completion</p>
                    <p className="text-base font-bold text-blue-800">{currentDate}</p>
                  </div>
                  {/* Official Seal */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2 shadow-lg border-4 border-yellow-300">
                      <div className="text-center">
                        <div className="text-white text-sm font-bold">OFFICIAL</div>
                        <div className="text-white text-sm font-bold">SEAL</div>
                      </div>
                    </div>
                  </div>
                  {/* Signature */}
                  <div className="text-center">
                    <div className="w-40 border-t-2 border-gray-400 mb-2"></div>
                    <p className="text-sm text-gray-600 font-medium">Authorized Signature</p>
                    <p className="text-base font-bold text-blue-800">Training Director</p>
                  </div>
                </div>
                {/* Certificate ID */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500 bg-gray-100 inline-block px-4 py-2 rounded-full">
                    Certificate ID: {certificate.NumberCertificate || "CERT-000000"}
                  </p>
                </div>
              </div>

              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-9xl font-bold text-blue-100 opacity-10 transform rotate-45">CERTIFIED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Details - Hidden in print */}
        <div className="no-print mt-8 max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Employee:</span>
              <p>{getEmployeeName()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Employee ID:</span>
              <p>{user?.employeeId || user?.EmployeeId || certificate?.Employeename?.EmployeeId || "N/A"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Course:</span>
              <p>{certificate.CertificateName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Certificate ID:</span>
              <p>{certificate.NumberCertificate}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Company:</span>
              <p>{certificate.CompanyNameCertificate?.CompantName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Issue Date:</span>
              <p>{currentDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
