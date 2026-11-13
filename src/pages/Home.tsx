import Hero from '@/components/home/Hero'
import AboutIntro, { MottoMarquee } from '@/components/home/AboutIntro'
import Priorities from '@/components/home/Priorities'
import FpoServices from '@/components/home/FpoServices'
import MissionsScroller from '@/components/home/MissionsScroller'
import { ChairmanQuote, ClusterCentre, OrganicModel, PppFeature } from '@/components/home/Features'
import { BazaarShowcase, CtaBand, JoinTypes, NewsGallery, Partners } from '@/components/home/Engage'
import { useDocumentTitle } from '@/hooks/useUi'

export default function Home() {
  useDocumentTitle('')
  return (
    <>
      <Hero />
      <MottoMarquee />
      <AboutIntro />
      <FpoServices />
      <Priorities />
      <MissionsScroller />
      <PppFeature />
      <ClusterCentre />
      <OrganicModel />
      <ChairmanQuote />
      <BazaarShowcase />
      <JoinTypes />
      <NewsGallery />
      <Partners />
      <CtaBand />
    </>
  )
}
