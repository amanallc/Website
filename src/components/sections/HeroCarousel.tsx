'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  { src: '/assets/img/hero-carousel/hero-carousel-1.jpg', alt: 'Construction site' },
  { src: '/assets/img/hero-carousel/hero-carousel-2.jpg', alt: 'Building project' },
  { src: '/assets/img/hero-carousel/hero-carousel-3.jpg', alt: 'Construction work' },
  { src: '/assets/img/real/project-hero.jpeg', alt: 'Amana Construction project' },
  { src: '/assets/img/real/house-about.jpeg', alt: 'Completed residential build' },
];

export default function HeroCarousel() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="h-[560px] md:h-[680px]"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <h1 className="mb-3 text-4xl font-bold text-white drop-shadow md:text-6xl">
                  Amana Construction
                </h1>
                <p className="mb-8 text-xl font-medium text-gold md:text-2xl">
                  Built on Trust
                </p>
                <p className="mb-8 max-w-xl text-base text-white/80 md:text-lg">
                  Serving Roswell, Alpharetta, and the greater North Atlanta area with quality
                  craftsmanship and honest communication.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="rounded bg-gold px-8 py-3 font-semibold text-charcoal transition-opacity hover:opacity-90"
                  >
                    Get a Free Estimate
                  </Link>
                  <Link
                    href="/projects"
                    className="rounded border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-charcoal"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
