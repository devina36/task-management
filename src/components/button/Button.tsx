import { Loader2Icon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type TButtonProps = {
  label?: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<TButtonProps> = ({
  label,
  type = 'button',
  className = '',
  loading = false,
  disabled = false,
  icon,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={twMerge(
        `w-full h-[36px] gap-2 px-3 flex items-center justify-center cursor-pointer bg-blue-400 text-white font-semibold rounded-md whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed`,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {loading ? (
        <Loader2Icon className="animate-spin" size={20} />
      ) : (
        <>
          {icon ? icon : null}
          {label ? label : null}
        </>
      )}
    </button>
  );
};

export default Button;
