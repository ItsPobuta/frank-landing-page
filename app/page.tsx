import { BoardSection } from '@/components/board-section'
import { CharterSection } from '@/components/charter-section'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { LayersSection } from '@/components/layers-section'
import { Nav } from '@/components/nav'
import { NavigatorSection } from '@/components/navigator-section'
import { ProblemSection } from '@/components/problem-section'
import { PullquoteSection } from '@/components/pullquote-section'
import { ScrollHandler } from '@/components/scroll-handler'

export default function Page() {
  return (
    <>
      <ScrollHandler />
      <Nav />
      <Hero />
      <ProblemSection />
      <PullquoteSection />
      <LayersSection />
      <BoardSection />
      <CharterSection />
      <NavigatorSection />
      <CtaSection />
      <Footer />
    </>
  )
}
