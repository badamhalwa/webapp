import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

import logo from '../../assets/logo.png';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  const lang = i18n.language;

  return (
    <footer className="bg-rrdch-blue-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="RRDCH Logo" className="w-12 h-12 object-contain" />
            <div>
              <div className="font-bold text-lg">RRDCH</div>
              <div className="text-xs text-blue-200">
                {lang === 'kn' ? 'ದಂತ ವೈದ್ಯಕೀಯ ಕಾಲೇಜು ಮತ್ತು ಆಸ್ಪತ್ರೆ' : 'Dental College & Hospital'}
              </div>
            </div>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            {t('footer.descShort')}
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Facebook" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><FiFacebook size={16}/></a>
            <a href="#" aria-label="Twitter" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><FiTwitter size={16}/></a>
            <a href="#" aria-label="Instagram" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><FiInstagram size={16}/></a>
            <a href="#" aria-label="YouTube" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><FiYoutube size={16}/></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{lang === 'kn' ? 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು' : 'Quick Links'}</h3>
          <div className="space-y-2">
            {[
              ['/', t('nav.home')], 
              ['/about', t('nav.about')], 
              ['/departments', t('nav.departments')], 
              ['/admissions', t('nav.admissions')],
              ['/research', t('nav.research')], 
              ['/achievements', t('nav.achievements')], 
              ['/events', t('nav.events')], 
              ['/tour', t('nav.virtualTour')]
            ].map(([to, label]) => (
              <Link key={to} to={to} className="block text-blue-200 text-sm hover:text-white transition-colors hover:translate-x-1 transform">{label}</Link>
            ))}
          </div>
        </div>

        {/* Patient Services */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('nav.patients')}</h3>
          <div className="space-y-2">
            {[
              ['/patient/book', t('nav.bookAppointment')], 
              ['/patient/track', t('nav.trackAppointment')],
              ['/patient/queue', t('nav.liveQueue')], 
              ['/patient/followup', t('nav.followUp')],
              ['/patient/directions', t('nav.directions')], 
              ['/patient/feedback', t('nav.feedback')]
            ].map(([to, label]) => (
              <Link key={to} to={to} className="block text-blue-200 text-sm hover:text-white transition-colors hover:translate-x-1 transform">{label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{lang === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Contact Us'}</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FiMapPin className="text-rrdch-teal mt-0.5 flex-shrink-0" size={16}/>
              <span className="text-blue-200 text-sm">{t('directions.addressVal')}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-rrdch-teal flex-shrink-0" size={16}/>
              <span className="text-blue-200 text-sm">080-2860-0988 / 0989</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-rrdch-teal flex-shrink-0" size={16}/>
              <span className="text-blue-200 text-sm">info@rrdch.edu.in</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/10 rounded-lg">
            <p className="text-xs text-blue-200">{t('directions.opdHours')}</p>
            <p className="text-sm font-medium">{t('common.days')}</p>
            <p className="text-xs text-blue-200 mt-1">{t('directions.emergency')}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-blue-300 text-xs">© {year} {t('footer.brandName')}. {t('footer.rights')}</p>
          <div className="flex gap-4">
            <span className="text-blue-300 text-xs bg-white/10 px-3 py-1 rounded-full">NAAC A++</span>
            <span className="text-blue-300 text-xs bg-white/10 px-3 py-1 rounded-full">DCI Approved</span>
            <span className="text-blue-300 text-xs bg-white/10 px-3 py-1 rounded-full">RGUHS Affiliated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
