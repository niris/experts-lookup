import './button.css';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large'|'tiny';
  label: string;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const fontSize = size === 'tiny' ? 'text-sx p-1 mx-0 ml-0.5 -mt-8 bg-sky-300'   : "";
  return (
    <button
      type="button"
      className={['storybook-button', 'rounded-full',`storybook-button--${size}`, mode,fontSize].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
