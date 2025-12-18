import ContactItem from "../components/ui/ContactItem";

export default function ContactPage() {
  return (
    <div className="bg-gray-800/60 backdrop-blur-lg shadow-xl rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Contact Us</h2>
        <p className="text-gray-400 mt-2">We're here to help you 24/7</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Get in Touch</h3>
            <p className="text-gray-300">
              Have questions or need assistance? Our support team is ready to help you with all your recharge needs.
            </p>
          </div>

          <div className="space-y-4">
            <ContactItem
              icon="📧"
              title="Email Support"
              detail="support@rechargeapp.com"
              subdetail="Response within 24 hours"
            />
            
            <ContactItem
              icon="📞"
              title="Phone Support"
              detail="1800-123-4567"
              subdetail="Mon-Sat, 9AM-7PM"
            />
            
            <ContactItem
              icon="🏢"
              title="Office Address"
              detail="123 Business Street, Mumbai"
              subdetail="Maharashtra, India - 400001"
            />
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-5 md:p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Send us a Message</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
            <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-colors border border-gray-600">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}