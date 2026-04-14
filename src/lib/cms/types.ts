export type MediaAsset = {
  url: string;
  alt: string;
  mimeType?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SocialItem = {
  label: string;
  url: string;
};

export type HeroContent = {
  headline: string;
  subtext: string;
  video?: MediaAsset;
  fallbackImage?: MediaAsset;
};

export type GalleryItemView = {
  id: string;
  title: string;
  category: string;
  caption?: string;
  media?: MediaAsset;
};

export type PricingItemView = {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
  ctaLabel: string;
};

export type TestimonialView = {
  id: string;
  clientName: string;
  role?: string;
  quote: string;
  portrait?: MediaAsset;
};

export type HomePageView = {
  siteName: string;
  logo?: MediaAsset;
  navItems: NavItem[];
  socialItems: SocialItem[];
  contactEmail?: string;
  footerText?: string;
  bookNowUrl: string;
  hero: HeroContent;
  welcomeTitle: string;
  welcomeBody: string;
  testimonialsTitle: string;
  galleryItems: GalleryItemView[];
  pricingItems: PricingItemView[];
  testimonials: TestimonialView[];
};
