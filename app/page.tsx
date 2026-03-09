import { ArrowRight, BookOpen, Users, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/data";
import Gallery from "@/components/Gallery";

export default async function Home() {
  const data = await getSiteData();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#FFF8F0] pt-20 md:pt-24">

        <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-blue tracking-tight leading-tight md:leading-snug">
              {data.seo?.title || 'IITS Research & Policy Studies'}
            </h2>
            <p className="text-brand-grey text-base md:text-xl font-medium leading-relaxed">
              A legacy of excellence in education, training, and career development.
              Transforming ideas into reality through integrated training and studies.
            </p>

            <div className="pt-4">
              <p className="text-brand-blue font-semibold mb-2">@iitsedu</p>
              <Link
                href="/about"
                className="inline-block px-8 py-3 rounded-full border-2 border-brand-blue text-brand-blue font-bold tracking-widest hover:bg-brand-blue hover:text-white transition-all duration-300 uppercase"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="hidden md:block h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative">
            {data.images.hero.url ? (
              <Image
                src={data.images.hero.url}
                alt={data.images.hero.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                <span className="text-slate-500">No image available</span>
              </div>
            )}
          </div>
        </div>

        {/* Massive Text Background */}
        <div className="w-full select-none pointer-events-none absolute bottom-1/2 translate-y-1/2 opacity-10 md:opacity-20 z-0">
          <h1 className="text-[150px] leading-none font-bold text-brand-blue text-center tracking-tighter whitespace-nowrap">
            IITSRPS
          </h1>
        </div>
      </section>

      {/* Stats Section - Floating overlap */}
      <section className="py-8 md:py-12 relative z-20 container mx-auto px-4 md:px-6 -mt-16 md:-mt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm p-6 md:p-8 border border-white/50">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-brand-blue mb-1 md:mb-2">{data.stats?.yearsOfExperience || '15+'}</div>
            <div className="text-[10px] md:text-sm text-brand-grey font-medium uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-brand-blue mb-1 md:mb-2">{data.stats?.studentsCount || '50K+'}</div>
            <div className="text-[10px] md:text-sm text-brand-grey font-medium uppercase tracking-wider">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-brand-blue mb-1 md:mb-2">{data.stats?.partnersCount || '800+'}</div>
            <div className="text-[10px] md:text-sm text-brand-grey font-medium uppercase tracking-wider">Partners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-brand-blue mb-1 md:mb-2">{data.stats?.satisfactionRate || '100%'}</div>
            <div className="text-[10px] md:text-sm text-brand-grey font-medium uppercase tracking-wider">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* About Section - Smoother transition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">Who We Are</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                IITS Research & Policy Studies is the brainchild of zealous visionaries
                with over a decade of experience in education technology. We offer service par excellence
                in career building, counseling, and imparting training on industry-ready courses.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Within a short period, we have emerged as a leading Edu-tech enterprise with thousands of
                students enrolled. Our mission is to make education enriched and worth pursuing.
              </p>
              <Link href="/about" className="text-brand-blue font-semibold hover:text-blue-900 flex items-center gap-2">
                Read Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-200 rounded-2xl transform rotate-3" />
              <div className="relative h-[400px] w-full rounded-2xl bg-slate-200 overflow-hidden shadow-lg">
                {data.images.about.url ? (
                  <Image
                    src={data.images.about.url}
                    alt={data.images.about.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-500">No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Our Services</h2>
            <p className="text-slate-600">
              Comprehensive educational solutions designing and transforming your ideas into reality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-blue">Online & Distance Learning</h3>
              <p className="text-slate-600 mb-4">Flexible learning options for students worldwide, enabling education without boundaries.</p>
              <Link href="/services" className="text-sm font-semibold text-brand-blue hover:text-blue-900">Learn more &rarr;</Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center text-brand-grey mb-6 group-hover:bg-brand-grey group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-blue">Skill Enhancement</h3>
              <p className="text-slate-600 mb-4">Vocational studies and professional courses designed to make you industry-ready.</p>
              <Link href="/services" className="text-sm font-semibold text-brand-grey hover:text-slate-700">Learn more &rarr;</Link>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-blue">Counseling & Guidance</h3>
              <p className="text-slate-600 mb-4">Expert career counseling to help you choose the right path for your future.</p>
              <Link href="/services" className="text-sm font-semibold text-brand-blue hover:text-blue-900">Learn more &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery images={data.gallery} />

      {/* Partners Strip (Placeholder) */}
      <section className="py-12 border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by Top Universities</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {data.universities.length > 0 ? (
              data.universities.map((uni) => (
                <div key={uni.id} className="flex items-center justify-center">
                  {uni.logo && uni.logo.trim() !== '' ? (
                    <div className="relative h-12 w-32">
                      <Image
                        src={uni.logo}
                        alt={uni.name}
                        fill
                        className="object-contain"
                        title={uni.name}
                        sizes="128px"
                      />
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-slate-400 hover:text-brand-blue">{uni.name}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-slate-400 italic">Adding Partners Soon...</div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
