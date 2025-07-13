import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
export default function Navbar() {
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
      </div>
  )}