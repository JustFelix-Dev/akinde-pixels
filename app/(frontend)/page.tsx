import { draftMode } from "next/headers";

import { FadeInSection } from "@/src/components/animations/FadeInSection";
import { HeroSection } from "@/src/components/site/HeroSection";
import { PricingSection } from "@/src/components/site/PricingSection";
import { Sidebar } from "@/src/components/site/Sidebar";
import { TestimonialsSection } from "@/src/components/site/TestimonialsSection";
import { ThemeToggle } from "@/src/components/site/ThemeToggle";
import { WelcomeSection } from "@/src/components/site/WelcomeSection";
import { getHomePageData } from "@/src/lib/cms/homepage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { isEnabled } = await draftMode();
  const pageData = await getHomePageData(isEnabled);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative mx-auto flex max-w-[1500px] flex-col lg:flex-row">
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <Sidebar
          siteName={pageData.siteName}
          logo={pageData.logo}
          navItems={pageData.navItems}
          socialItems={pageData.socialItems}
          contactEmail={pageData.contactEmail}
          footerText={pageData.footerText}
        />
        <main className="flex-1 space-y-14 p-5 pt-20 sm:p-8 sm:pt-24 md:space-y-16 md:p-12 lg:p-16 lg:pt-16">
          <FadeInSection>
            <HeroSection hero={pageData.hero} />
          </FadeInSection>
          <FadeInSection delay={0.05}>
            <WelcomeSection body={pageData.welcomeBody} />
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <TestimonialsSection title={pageData.testimonialsTitle} items={pageData.testimonials} />
          </FadeInSection>
          <FadeInSection delay={0.25}>
            <PricingSection
              items={pageData.pricingItems}
              bookNowUrl={pageData.bookNowUrl}
              eyebrow={pageData.pricingEyebrow}
              headline={pageData.pricingHeadline}
              description={pageData.pricingDescription}
              ctaLabel={pageData.pricingCtaLabel}
            />
          </FadeInSection>
        </main>
      </div>
    </div>
  );
}
