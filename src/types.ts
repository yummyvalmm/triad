export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  description: string;
  highlights: string[];
  gallery: string[];
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}