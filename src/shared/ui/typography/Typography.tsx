import type { ReactNode, ElementType, CSSProperties } from 'react';
import { cn } from '@/shared/utils';

type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'link'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'inherit';

type TextAlign = 'left' | 'center' | 'right' | 'justify';

type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

interface BaseTypographyProps {
  children: ReactNode;
  className?: string;
  color?: TextColor;
  align?: TextAlign;
  weight?: FontWeight;
  truncate?: boolean;
  lineClamp?: 1 | 2 | 3;
  style?: CSSProperties;
}

// Helper to get color class
const getColorClass = (color?: TextColor): string => {
  if (!color || color === 'inherit') return '';
  const colorMap: Record<TextColor, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    disabled: 'text-disabled',
    inverse: 'text-inverse',
    link: 'text-link',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    info: 'text-info',
    inherit: '',
  };
  return colorMap[color];
};

// Helper to get weight class
const getWeightClass = (weight?: FontWeight): string => {
  if (!weight) return '';
  return `font-${weight}`;
};

// Helper to get align class
const getAlignClass = (align?: TextAlign): string => {
  if (!align) return '';
  return `text-${align}`;
};

// ============================================
// Heading Component
// ============================================
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends BaseTypographyProps {
  level?: HeadingLevel;
  as?: ElementType;
}

export function Heading({
  children,
  level = 1,
  as,
  className,
  color,
  align,
  weight,
  truncate,
  lineClamp,
  style,
}: HeadingProps) {
  const Component = as || (`h${level}` as ElementType);

  return (
    <Component
      className={cn(
        `h${level}`,
        getColorClass(color),
        getAlignClass(align),
        getWeightClass(weight),
        truncate && 'text-truncate',
        lineClamp && `line-clamp-${lineClamp}`,
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

// ============================================
// Text Component (Paragraph/Body)
// ============================================
type TextSize = 'xs' | 'sm' | 'base' | 'md' | 'lg';

export interface TextProps extends BaseTypographyProps {
  size?: TextSize;
  as?: ElementType;
}

export function Text({
  children,
  size = 'base',
  as: Component = 'p',
  className,
  color,
  align,
  weight,
  truncate,
  lineClamp,
  style,
}: TextProps) {
  const sizeClass = size === 'base' ? 'text-body' : `text-body-${size === 'md' ? 'lg' : size}`;

  return (
    <Component
      className={cn(
        sizeClass,
        getColorClass(color),
        getAlignClass(align),
        getWeightClass(weight),
        truncate && 'text-truncate',
        lineClamp && `line-clamp-${lineClamp}`,
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

// ============================================
// Label Component
// ============================================
export interface LabelProps extends BaseTypographyProps {
  htmlFor?: string;
  required?: boolean;
}

export function Label({
  children,
  htmlFor,
  required,
  className,
  color = 'secondary',
  align,
  weight = 'medium',
  style,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'typography-label',
        getColorClass(color),
        getAlignClass(align),
        getWeightClass(weight),
        className
      )}
      style={style}
    >
      {children}
      {required && <span className="typography-label__required">*</span>}
    </label>
  );
}

// ============================================
// Caption Component
// ============================================
export interface CaptionProps extends BaseTypographyProps {
  as?: ElementType;
}

export function Caption({
  children,
  as: Component = 'span',
  className,
  color = 'secondary',
  align,
  weight,
  style,
}: CaptionProps) {
  return (
    <Component
      className={cn(
        'text-caption',
        getColorClass(color),
        getAlignClass(align),
        getWeightClass(weight),
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

// ============================================
// Overline Component
// ============================================
export interface OverlineProps extends BaseTypographyProps {
  as?: ElementType;
}

export function Overline({
  children,
  as: Component = 'span',
  className,
  color = 'tertiary',
  align,
  weight,
  style,
}: OverlineProps) {
  return (
    <Component
      className={cn(
        'text-overline',
        getColorClass(color),
        getAlignClass(align),
        getWeightClass(weight),
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

// ============================================
// Link Component (Text styled as link)
// ============================================
export interface TextLinkProps extends BaseTypographyProps {
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export function TextLink({
  children,
  href,
  onClick,
  external,
  className,
  color = 'link',
  align,
  weight,
  style,
}: TextLinkProps) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          'typography-link',
          getColorClass(color),
          getAlignClass(align),
          getWeightClass(weight),
          className
        )}
        style={style}
        {...externalProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'typography-link',
        getColorClass(color),
        getAlignClass(align),
        getWeightClass(weight),
        className
      )}
      style={style}
    >
      {children}
    </button>
  );
}

// ============================================
// Inline Code Component
// ============================================
export interface InlineCodeProps extends Omit<BaseTypographyProps, 'truncate' | 'lineClamp'> {}

export function InlineCode({ children, className, color, style }: InlineCodeProps) {
  return (
    <code className={cn('typography-code', getColorClass(color), className)} style={style}>
      {children}
    </code>
  );
}
