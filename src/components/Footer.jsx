import { FaTwitter, FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">cyber</h2>
          <p className="text-gray-400 mb-6">
            We are a residential interior design firm located in Portland.
            Our boutique-studio offers more than
          </p>
          <div className="flex space-x-5 text-gray-300">
            <a href="#"><FaTwitter className="hover:text-white" size={20} /></a>
            <a href="#"><FaFacebookF className="hover:text-white" size={20} /></a>
            <a href="#"><FaTiktok className="hover:text-white" size={20} /></a>
            <a href="#"><FaInstagram className="hover:text-white" size={20} /></a>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-white">Bonus program</a></li>
            <li><a href="#" className="hover:text-white">Gift cards</a></li>
            <li><a href="#" className="hover:text-white">Credit and payment</a></li>
            <li><a href="#" className="hover:text-white">Service contracts</a></li>
            <li><a href="#" className="hover:text-white">Non-cash account</a></li>
            <li><a href="#" className="hover:text-white">Payment</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Assistance to the buyer</h3>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-white">Find an order</a></li>
            <li><a href="#" className="hover:text-white">Terms of delivery</a></li>
            <li><a href="#" className="hover:text-white">Exchange and return of goods</a></li>
            <li><a href="#" className="hover:text-white">Guarantee</a></li>
            <li><a href="#" className="hover:text-white">Frequently asked questions</a></li>
            <li><a href="#" className="hover:text-white">Terms of use of the site</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
