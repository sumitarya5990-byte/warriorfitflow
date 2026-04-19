import EnquiryForm from '@/components/EnquiryForm';

const programs = [
  {
    title: 'Calisthenics',
    description:
      'Build functional strength, mobility, and body control through progressive bodyweight training from beginner to advanced.'
  },
  {
    title: 'MMA',
    description:
      'Train striking, grappling, conditioning, and fight IQ in a structured MMA format suitable for all skill levels.'
  },
  {
    title: 'Both',
    description:
      'Combine calisthenics and MMA for a complete transformation in power, endurance, and athleticism.'
  }
];

const locations = [
  {
    name: 'Location 1',
    address: 'WarriorFitFlow Arena, Sector 141, Noida, Uttar Pradesh',
    mapUrl: 'https://share.google/hVL6mTNUD12TpsqRg'
  },
  {
    name: 'Location 2',
    address: 'WarriorFitFlow Combat Hub, Greater Noida West, Uttar Pradesh',
    mapUrl: 'https://share.google/FHCVRPxNRl6pbFrfg'
  },
  {
    name: 'Location 3',
    address: 'WarriorFitFlow Performance Studio, Sector 75, Noida, Uttar Pradesh',
    mapUrl: 'https://share.google/fcXjvAcIxue5w98RG'
  }
];

const testimonials = [
  {
    quote:
      'The coaching quality is incredible. I gained strength and confidence in just a few months.',
    author: 'Aarav S.'
  },
  {
    quote:
      'WarriorFitFlow changed how I train. The MMA + calisthenics mix keeps every session intense and fun.',
    author: 'Riya K.'
  },
  {
    quote:
      'From warmups to advanced drills, everything is super professional and beginner-friendly.',
    author: 'Vikram P.'
  }
];

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' }
];

export default function Home() {
  return (
    <main className="relative">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur">
        <div className="section-wrapper flex items-center justify-between py-4">
          <a href="#home" className="text-lg font-extrabold tracking-wide">
            WARRIOR<span className="text-ember">FITFLOW</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-ember">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-lg bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wide transition hover:bg-red-700"
          >
            Join Now
          </a>
        </div>
      </header>

      <section id="home" className="section-wrapper py-20 sm:py-28">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-red-300">Train Like a Warrior</p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
          Elite Calisthenics & MMA Training to Build Strength, Skill, and Grit.
        </h1>
        <p className="mt-6 max-w-2xl text-zinc-300">
          WarriorFitFlow delivers high-performance coaching for beginners and athletes. Step into a community focused on discipline, movement, and measurable transformation.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#contact" className="rounded-xl bg-ember px-6 py-3 font-semibold transition hover:bg-red-700">
            Start Your Journey
          </a>
          <a href="#programs" className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:border-ember hover:text-ember">
            View Programs
          </a>
        </div>
      </section>

      <section id="about" className="section-wrapper py-12">
        <div className="card p-8 sm:p-10">
          <h2 className="text-3xl font-bold">About WarriorFitFlow</h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Inspired by modern functional training and combat discipline, WarriorFitFlow blends science-backed fitness with martial arts fundamentals. Every class is designed for real progression, whether your goal is fat loss, skill development, or competitive readiness.
          </p>
        </div>
      </section>

      <section id="programs" className="section-wrapper py-16">
        <h2 className="mb-8 text-3xl font-bold">Programs</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <article key={program.title} className="card p-6">
              <h3 className="text-xl font-semibold text-ember">{program.title}</h3>
              <p className="mt-3 text-sm text-zinc-300">{program.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="locations" className="section-wrapper py-16">
        <h2 className="mb-8 text-3xl font-bold">Our Locations</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {locations.map((location) => (
            <article key={location.name} className="card overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-bold text-ember">{location.name}</h3>
                <p className="mt-2 text-sm text-zinc-300">{location.address}</p>
              </div>
              <iframe
                title={`${location.name} map`}
                src={location.mapUrl}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrapper py-16">
        <div className="rounded-2xl border border-ember/40 bg-gradient-to-r from-red-950 to-black p-8 text-center">
          <h2 className="text-3xl font-extrabold">Ready to unlock your best shape?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
            Join India&apos;s fastest-growing calisthenics and MMA community.
          </p>
          <a href="#contact" className="mt-6 inline-block rounded-xl bg-ember px-6 py-3 font-bold uppercase tracking-wide transition hover:bg-red-700">
            Join Now
          </a>
        </div>
      </section>

      <section id="testimonials" className="section-wrapper py-16">
        <h2 className="mb-8 text-3xl font-bold">Testimonials</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="card p-6">
              <p className="text-sm text-zinc-200">“{item.quote}”</p>
              <footer className="mt-4 text-sm font-semibold text-ember">— {item.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="contact" className="section-wrapper py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Contact / Enquiry</h2>
            <p className="mt-3 text-zinc-300">
              Tell us your preferred program and location. Our team will call you back and help you with your first class booking.
            </p>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-xl border border-green-500/60 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-300 transition hover:bg-green-500/20"
            >
              Chat on WhatsApp
            </a>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="section-wrapper flex flex-col justify-between gap-2 text-sm text-zinc-400 sm:flex-row">
          <p>© {new Date().getFullYear()} WarriorFitFlow. All rights reserved.</p>
          <a href="#home" className="hover:text-ember">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
