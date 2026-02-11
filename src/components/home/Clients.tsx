import React from 'react';
import Reveal from '../ui/Reveal';

const clients = [
  {
    name: 'LoDarWal',
    industry: 'Fashion Retail',
    logoSrc: '/images/LOGO%20NO%20BG%202.png',
    logoAlt: 'LoDarWal brand logo',
  },
  {
    name: 'Bubble',
    industry: 'Lifestyle Retail',
    logoSrc: '/images/bubble.webp',
    logoAlt: 'Bubble brand logo',
  },
  {
    name: 'Lucky Mart',
    industry: 'Grocery & Market',
    logoSrc: '/images/lucky.webp',
    logoAlt: 'Lucky Mart brand logo',
  },
];

const ClientLogo: React.FC<{
  name: string;
  industry: string;
  logoSrc: string;
  logoAlt: string;
}> = ({ name, industry, logoSrc, logoAlt }) => (
  <div className="group flex items-center gap-5 rounded-2xl border border-gray-200/80 bg-white px-6 py-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">
    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-white ring-1 ring-black/5 shadow-sm overflow-hidden transition-transform duration-500 group-hover:scale-105">
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-[75%] w-[75%] object-contain transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="flex flex-col gap-1 leading-tight">
      <span className="text-base font-bold tracking-tight text-brand-black transition-colors duration-300 group-hover:text-brand-red">
        {name}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400 transition-colors duration-300 group-hover:text-gray-500">
        {industry}
      </span>
    </div>
  </div>
);

const Clients: React.FC = () => {
  const firstRow = [...clients, ...clients];
  const secondRow = [...clients].reverse();
  const secondRowLoop = [...secondRow, ...secondRow];

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="bg-white text-brand-black py-20 md:py-24 scroll-mt-28 border-t border-gray-100 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
                Client Partners
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2
                id="clients-heading"
                className="text-4xl md:text-5xl font-bold leading-[1.1] mt-4"
              >
                Trusted by brands that value craft, clarity, and performance.
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="text-gray-600 mt-5 text-lg md:text-xl leading-relaxed">
                We build digital experiences for leaders across fashion, lifestyle, and retail industries.
              </p>
            </Reveal>
          </div>
          <Reveal delay={320}>
            <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-gray-400">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red animate-pulse" />
              Live Partners
            </div>
          </Reveal>
        </header>

      </div>

      <div className="mt-12 space-y-5 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
          <div className="overflow-hidden">
            <ul className="logo-marquee-track animate-logo-marquee-left gap-6 py-4" role="list">
              {firstRow.map((client, index) => (
                <li key={`${client.name}-${index}`} aria-hidden={index >= clients.length} className="shrink-0">
                  <ClientLogo
                    name={client.name}
                    industry={client.industry}
                    logoSrc={client.logoSrc}
                    logoAlt={client.logoAlt}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
          <div className="overflow-hidden">
            <ul className="logo-marquee-track animate-logo-marquee-right gap-6 py-4" role="list">
              {secondRowLoop.map((client, index) => (
                <li key={`${client.name}-alt-${index}`} aria-hidden={index >= secondRow.length} className="shrink-0">
                  <ClientLogo
                    name={client.name}
                    industry={client.industry}
                    logoSrc={client.logoSrc}
                    logoAlt={client.logoAlt}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
