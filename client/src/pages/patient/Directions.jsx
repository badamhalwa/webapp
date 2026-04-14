import React from 'react';
import { PageHero, Card } from '../../components/ui/UIComponents';
import { FiPhone, FiMapPin, FiClock, FiNavigation } from 'react-icons/fi';

const Directions = () => (
  <div>
    <PageHero title="Directions & Location" subtitle="Find us easily using the map and landmarks below. We are located on Mysuru Road, Bangalore." breadcrumb="Home / Patients / Directions" bg="from-slate-700 to-rrdch-blue"/>

    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Map */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <iframe
            title="RRDCH Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3099067892317!2d77.46389257507763!3d12.941534787383886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f0563de64e5%3A0x1c7b94ed7d21b2e4!2sRajarajeswari%20Dental%20College%20%26%20Hospital!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
            width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" aria-label="Google Map showing RRDCH location"
          />
        </div>
        <a href="https://maps.google.com/?q=Rajarajeshwari+Dental+College+Hospital+Bangalore" target="_blank" rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-rrdch-blue font-medium text-sm hover:underline"
        >
          🗺️ Open in Google Maps
        </a>
      </div>

      {/* Info sidebar */}
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <FiMapPin className="text-rrdch-blue mt-1 flex-shrink-0" size={20}/>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Address</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Mysuru Road, Kambipura, Bengaluru, Karnataka 560098</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <FiPhone className="text-rrdch-teal mt-1 flex-shrink-0" size={20}/>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
              <a href="tel:08028600988" className="text-rrdch-blue hover:underline text-sm">080-2860-0988</a><br/>
              <a href="tel:08028600989" className="text-rrdch-blue hover:underline text-sm">080-2860-0989</a>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <FiClock className="text-amber-500 mt-1 flex-shrink-0" size={20}/>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">OPD Hours</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Monday – Friday: <strong>9:00 AM – 5:00 PM</strong></p>
                <p>Saturday: <strong>9:00 AM – 1:00 PM</strong></p>
                <p>Sunday: <strong>Closed</strong></p>
                <p className="text-red-600 font-medium">Emergency: <strong>24×7</strong></p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <FiNavigation className="text-purple-600 mt-1 flex-shrink-0" size={20}/>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">How to Reach</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="font-medium">🚌 BMTC Bus</p>
                  <p>Bus routes 97D, 225, 226 stop at Kambipura</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="font-medium">🚇 Metro</p>
                  <p>Nearest: Kengeri Metro Station (3 km), then auto</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="font-medium">🚗 By Road</p>
                  <p>On NH-275 (Bangalore–Mysuru), near Kambipura signal</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="font-medium">✈️ From Airport</p>
                  <p>~45 km via Tumkur Road / Outer Ring Road</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default Directions;
