interface BadgeProps {
  text: string;
  variant?: 'new' | 'updated' | 'count' | 'change-up' | 'change-down';
  color?: 'primary' | 'success' | 'warning' | 'gray';
  animate?: boolean;
  className?: string;
}

export function Badge({ text, variant = 'new', color = 'primary', animate = true, className = '' }: BadgeProps) {
  const getColorStyles = () => {
    switch (color) {
      case 'success':
        return 'bg-semantic-successLight text-semantic-success border-semantic-success';
      case 'warning':
        return 'bg-accent-gold-light text-accent-gold-dark border-accent-gold';
      case 'gray':
        return 'bg-gray-100 text-gray-600 border-gray-300';
      case 'primary':
      default:
        return 'bg-primary-100 text-primary-700 border-primary-300';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'new':
        return 'text-xs font-bold uppercase px-2 py-0.5';
      case 'updated':
        return 'text-xs font-semibold px-2 py-0.5';
      case 'count':
        return 'text-xs font-medium px-2 py-0.5';
      case 'change-up':
        return 'text-xs font-bold px-1.5 py-0.5';
      case 'change-down':
        return 'text-xs font-bold px-1.5 py-0.5';
      default:
        return 'text-xs font-semibold px-2 py-0.5';
    }
  };

  const getIcon = () => {
    if (variant === 'change-up') {
      return (
        <svg className="w-3 h-3 inline mr-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (variant === 'change-down') {
      return (
        <svg className="w-3 h-3 inline mr-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full border
        ${getColorStyles()}
        ${getVariantStyles()}
        ${animate ? 'animate-scale-bounce' : ''}
        ${className}
      `}
    >
      {getIcon()}
      {text}
    </span>
  );
}
