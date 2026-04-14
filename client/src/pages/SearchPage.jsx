import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageHero, Card } from '../components/ui/UIComponents';
import { departments, researchPublications, achievements } from '../data/mockData';
import { Link } from 'react-router-dom';

const allContent = [
  ...departments.map(d => ({ type: 'Department', title: d.name, desc: d.desc, path: '/departments' })),
  ...researchPublications.map(p => ({ type: 'Research', title: p.title, desc: p.authors, path: '/research' })),
  ...achievements.map(a => ({ type: 'Achievement', title: a.title, desc: a.desc, path: '/achievements' })),
  { type: 'Page', title: 'Book Appointment', desc: 'Book a dental appointment online at RRDCH', path: '/patient/book' },
  { type: 'Page', title: 'Track Appointment', desc: 'Track your appointment status using booking ID', path: '/patient/track' },
  { type: 'Page', title: 'Live Queue Status', desc: 'View real-time patient queue and doctor availability', path: '/patient/queue' },
  { type: 'Page', title: 'Admissions', desc: 'BDS and MDS admission information and inquiry form', path: '/admissions' },
  { type: 'Page', title: 'Hostel Complaints', desc: 'Submit and track hostel maintenance complaints', path: '/student/hostel' },
];

const typeColors = { Department: 'bg-blue-100 text-blue-700', Research: 'bg-purple-100 text-purple-700', Achievement: 'bg-amber-100 text-amber-700', Page: 'bg-teal-100 text-teal-700' };

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const results = query ? allContent.filter(item => `${item.title} ${item.desc}`.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div>
      <PageHero title={`Search Results`} subtitle={query ? `Showing results for "${query}"` : 'Enter a search term above to get started.'} breadcrumb="Home / Search"/>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {results.length === 0 && query && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">No results found for <strong>"{query}"</strong></p>
            <p className="text-gray-400 text-sm mt-2">Try searching for departments, treatments, or services.</p>
          </div>
        )}
        <div className="space-y-4">
          {results.map((r, i) => (
            <Link key={i} to={r.path}>
              <Card hover className="p-5 flex items-start gap-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${typeColors[r.type]}`}>{r.type}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{r.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{r.desc}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {results.length > 0 && <p className="text-gray-400 text-sm mt-6 text-center">{results.length} result{results.length !== 1 ? 's' : ''} found</p>}
      </div>
    </div>
  );
};

export default SearchPage;
