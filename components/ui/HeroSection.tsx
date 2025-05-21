
import { ReactNode } from 'react';
import { cn } from './utils';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  alignment?: 'left' | 'center' | 'right';
  background?: 'hero-bg' | 'blue' | 'navy' | 'primary' | 'gold';
}

export function HeroSection({
  title,
  subtitle,
  description,
  icon,
  children,
  fullWidth = false,
  className,
  alignment = 'left',
  background = 'hero-bg'
}: HeroSectionProps) {
  // Map background prop to color class
  const bgColorClass = {
    'hero-bg': 'bg-hero-bg',
    'blue': 'bg-blue',
    'navy': 'bg-navy',
    'primary': 'bg-primary',
    'gold': 'bg-gold'
  }[background];
  
  // Map alignment prop to text alignment class
  const textAlignClass = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  }[alignment];
  
  return (
    <section 
      className={cn(
        'hero-section relative overflow-hidden text-white transition-all duration-normal',
        bgColorClass,
        fullWidth ? 'full-width' : 'rounded-[16px] rounded-tr-[0px]',
        className
      )}
    >
      <div className={cn('hero-content py-8 md:py-12 px-4 md:px-6 container mx-auto', fullWidth ? 'public-container' : '', textAlignClass)}>
        {icon && (
          <div className={cn('flex', alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start', 'mb-6')}>
            {icon}
          </div>
        )}
        
        {title && (
          <h1 className={cn('hero-title text-3xl md:text-4xl font-extralight mb-4')}>{title}</h1>
        )}
        
        {subtitle && (
          <h2 className={cn('hero-subtitle text-lg md:text-xl font-light mb-4 text-white/90')}>{subtitle}</h2>
        )}
        
        {description && (
          <p className={cn('hero-description text-sm md:text-base font-light mb-6 text-white/80')}>{description}</p>
        )}
        
        {children}
      </div>
    </section>
  );
}
