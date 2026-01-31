import React from 'react';

// ============================================================================
// Core Domain Types
// ============================================================================

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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FeatureData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  visualType: 'speed' | 'branding' | 'quality';
  delay: number;
}

export interface TestimonialData {
  quote: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  teamImage: {
    src: string;
    alt: string;
  };
  teamStats: Array<{
    val: string;
    label: string;
  }>;
}

// ============================================================================
// UI Component Props
// ============================================================================

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: string;
  className?: string;
}

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  isActive: boolean;
}

export interface PortfolioModalProps {
  project: ProjectItem;
  onClose: () => void;
  onNext: () => void;
}

export interface PortfolioCardProps {
  project: ProjectItem;
  index: number;
  rotation: number;
  onClick: () => void;
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseIntersectionObserverReturn<T extends Element> {
  ref: React.RefObject<T>;
  isVisible: boolean;
}

export interface UseScrollPositionReturn {
  scrollY: number;
  isScrolled: boolean;
}

export interface UseWindowSizeReturn {
  width: number;
  height: number;
}

// ============================================================================
// Form Types
// ============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ============================================================================
// Utility Types
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
export type VoidFunction = () => void;

// ============================================================================
// Animation Types
// ============================================================================

export type EasingFunction = readonly [number, number, number, number];

export interface AnimationConfig {
  duration: number;
  ease: EasingFunction;
  delay?: number;
}

// ============================================================================
// Store Types
// ============================================================================

export interface UIState {
  loading: boolean;
  heroImageLoaded: boolean;
  footerHeight: number;
  selectedPlan: string | null;
  setLoading: (loading: boolean) => void;
  setHeroImageLoaded: (loaded: boolean) => void;
  setFooterHeight: (height: number) => void;
  setSelectedPlan: (planId: string | null) => void;
}