import { Instagram, Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 bottom-0">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Impact Statement */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Your final impact statement goes here. Make it memorable!
            </h3>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="text-gray-600">Add your location</p>
                <p className="text-gray-600">123 Anywhere St.,</p>
                <p className="text-gray-600">Any City, ST 12345</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600">123-456-7890</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-start md:justify-end space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-600" />
              <a href="mailto:bitebalance2025@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">
              bitebalance2025@gmail.com
              </a>
            </div>
            <p className="text-gray-600">&copy; {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer