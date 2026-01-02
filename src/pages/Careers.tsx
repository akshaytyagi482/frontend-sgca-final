import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Users, HeartHandshake, Laptop, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useData } from '../context/context';

export default function Careers() {
  const { data } = useData();
  const careersData = data?.careersPageData;

  const reasonsToJoin = careersData?.whySGCA?.items || [
    {
      title: 'Impactful Work',
      description: 'Build real-world products that ship to customers and create measurable value.',
      icon: 'check-circle',
    },
    {
      title: 'Collaborative Culture',
      description: 'Work with a humble, high-performing team that cares about outcomes.',
      icon: 'users',
    },
    {
      title: 'Continuous Learning',
      description: 'Access to mentorship, certifications, and time for deep work.',
      icon: 'graduation-cap',
    },
    {
      title: 'Modern Stack',
      description: 'Ship with TypeScript, cloud-native services, and pragmatic AI.',
      icon: 'laptop',
    },
  ];

  const openRoles = careersData?.roles?.positions || [
    {
      title: 'Full-Stack Engineer (React/Node)',
      type: 'Full-time · Noida / Remote',
      description:
        'Own end-to-end features across React, Node, and cloud. You care about DX, testing, and delivering value quickly.',
      requirements: [
        '2+ years experience with React and Node',
        'Comfortable with TypeScript and REST/GraphQL',
        'Experience with databases (SQL/NoSQL) and CI/CD',
      ],
    },
    {
      title: 'Mobile Developer (React Native)',
      type: 'Full-time · Noida / Remote',
      description:
        'Build high-quality mobile apps with React Native. Work closely with design and backend teams to ship delightful UX.',
      requirements: [
        '2+ years with React Native',
        'Familiar with native modules and app store releases',
        'Performance profiling and testing experience',
      ],
    },
    {
      title: 'AI Engineer',
      type: 'Full-time · Noida / Remote',
      description:
        'Prototype and productionize AI features using LLMs, vector search, and prompt engineering with strong evaluation.',
      requirements: [
        'Hands-on with Python/Node for AI tooling',
        'Familiarity with embeddings, RAG, and model evaluation',
        'Comfortable shipping to production with observability',
      ],
    },
  ];

  const benefits = careersData?.benefits?.items || [
    { title: 'Flexible Hours', icon: 'sparkles' },
    { title: 'Hybrid/Remote Options', icon: 'laptop' },
    { title: 'Mentorship & Growth', icon: 'graduation-cap' },
    { title: 'Supportive Culture', icon: 'heart-handshake' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'check-circle': return CheckCircle2;
      case 'users': return Users;
      case 'graduation-cap': return GraduationCap;
      case 'laptop': return Laptop;
      case 'sparkles': return Sparkles;
      case 'heart-handshake': return HeartHandshake;
      default: return CheckCircle2;
    }
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            {careersData?.hero?.title || 'Join Our Team'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
          >
            {careersData?.hero?.subtitle || 'Build products people love. Learn fast, ship often, and grow with SGCA Technologies.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex justify-center gap-4"
          >
            {careersData?.hero?.cta?.map((button: any, idx: number) => (
              <Button
                key={idx}
                href={button.href}
                variant={button.variant === 'primary' ? 'primary' : 'outline'}
              >
                {button.label}
                {button.variant === 'primary' && (
                  <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                )}
              </Button>
            )) || (
              <>
                <Button href="#roles">
                  See Open Roles
                  <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Button>
                <Button href="#apply" variant="outline">How to Apply</Button>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">{careersData?.whySGCA?.title || 'Why SGCA'}</h2>
            <p className="mt-3 text-gray-600">{careersData?.whySGCA?.subtitle || 'A place to do your best work and become your best self.'}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasonsToJoin.map((item: any, idx: number) => {
              const Icon = typeof item.icon === 'string' && item.icon.trim().startsWith('<svg') ? null : getIcon(item.icon);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    {Icon ? (
                      <Icon className="h-6 w-6 text-blue-600" />
                    ) : (
                      <div className="" dangerouslySetInnerHTML={{ __html: item.icon }} />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="roles" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">{careersData?.roles?.title || 'Open Roles'}</h2>
            <p className="mt-3 text-gray-600">{careersData?.roles?.subtitle || 'Don\'t see a perfect match? Reach out anyway — we love meeting great people.'}</p>
          </div>
          <div className="mt-12 space-y-6">
            {openRoles.map((role:any, idx:number) => (
              <motion.details
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <summary className="list-none cursor-pointer p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{role.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{role.type}</p>
                  </div>
                  <span className="mt-3 sm:mt-0 text-blue-600 group-open:rotate-90 transition-transform">→</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>{role.description}</p>
                  <ul className="mt-4 list-disc list-inside space-y-1">
                    {role.requirements.map((req: string) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button href="#apply">Apply Now</Button>
                  </div>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Benefits</h2>
            <p className="mt-3 text-gray-600">We support you to do your best work — in and out of the office.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit: any, idx: number) => {
              const Icon = typeof benefit.icon === 'string' && benefit.icon.trim().startsWith('<svg') ? null : getIcon(benefit.icon);
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                    {Icon ? (
                      <Icon className="h-6 w-6 text-indigo-600" />
                    ) : (
                      <div className="" dangerouslySetInnerHTML={{ __html: benefit.icon }} />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section id="apply" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900"
          >
            {careersData?.apply?.title || 'Ready to build with us?'}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-gray-600"
          >
            {careersData?.apply?.subtitle || 'Send your resume and a short note about what excites you to'}
            <a href="mailto:info@sgca.live" className="text-blue-600 hover:underline"> info@sgca.live</a>.
          </motion.p>
          <div className="mt-6">
            <Button href="mailto:info@sgca.live">{careersData?.apply?.buttonLabel || 'Apply via Email'}</Button>
          </div>
        </div>
      </section>
    </div>
  );
} 