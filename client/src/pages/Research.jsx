import React from 'react';
import { motion } from 'framer-motion';
import { PageHero, Card, SectionHeader, Badge } from '../components/ui/UIComponents';
import { researchPublications } from '../data/mockData';

const ongoingProjects = [
  { title: 'AI-driven early detection of oral cancer', pi: 'Dr. Arun Prasad', funding: 'ICMR', status: 'Ongoing' },
  { title: 'Microbiome analysis of periodontitis patients', pi: 'Dr. Vijay Kumar', funding: 'DST', status: 'Ongoing' },
  { title: 'Novel biomaterials for bone regeneration', pi: 'Dr. Suresh Kumar', funding: 'DBT', status: 'Ongoing' },
  { title: 'Digital workflow in prosthodontic rehabilitation', pi: 'Dr. Anitha Rao', funding: 'Self-funded', status: 'Ongoing' },
];

const Research = () => (
  <div>
    <PageHero title="Research & Publications" subtitle="Advancing dental science through high-impact research, innovation and evidence-based practice." breadcrumb="Home / Research" bg="from-purple-700 to-rrdch-blue"/>

    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[['50+', 'Publications', '📄'], ['12', 'Ongoing Projects', '🔬'], ['₹2Cr+', 'Research Funding', '💰']].map(([val, label, icon], i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 text-center bg-gradient-to-br from-gray-50 to-white">
              <div className="text-4xl mb-2">{icon}</div>
              <div className="text-3xl font-black text-rrdch-blue">{val}</div>
              <div className="text-gray-600 mt-1">{label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <SectionHeader title="Recent Publications" subtitle="Peer-reviewed research from our faculty in leading international journals."/>
      <div className="space-y-4 mb-16">
        {researchPublications.map((pub, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
            <Card hover className="p-6">
              <div className="flex flex-wrap gap-3 items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{pub.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{pub.authors}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="blue">{pub.journal}</Badge>
                    <Badge variant="teal">{pub.department}</Badge>
                    <Badge variant="default">{pub.year}</Badge>
                  </div>
                </div>
                <button className="text-rrdch-blue text-sm font-medium hover:underline flex-shrink-0">View →</button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <SectionHeader title="Ongoing Research Projects"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ongoingProjects.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <Card hover className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-3">Principal Investigator: <strong>{p.pi}</strong></p>
              <div className="flex gap-2">
                <Badge variant="purple">Funding: {p.funding}</Badge>
                <Badge variant="green">{p.status}</Badge>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Research;
