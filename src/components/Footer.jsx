import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg--800 text-white py-8">
      <div className="container mr-bottom px-10 grid grid-cols-1  gap-4">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 mb-2 w-25">
          Is Your Remote-Friendly Team <br/>
          Workspace Where Knowledge And<br/>
           Collaboration Meet.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="Contact" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 col-2">
            <a href="https://www.facebook.com/brijarajsinh.jadeja.908" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/brijrajsinh._jadeja._/" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-left mt-5 m-4 text-gray-400">
        <p>&copy; {new Date().getFullYear()} Your Company. <br/> All rights reserved.</p>
      </div> 
    </footer>
  );
}