import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Portfolio from '@/components/sections/Portfolio';

export const metadata: Metadata = {
  title: 'Projects | Amana Construction — Roswell, GA',
  description:
    'Browse completed construction, renovation, and commercial projects by Amana Construction across Roswell and the North Atlanta area.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero title="Our Projects" breadcrumb="Projects" />
      <Portfolio />
    </>
  );
}
