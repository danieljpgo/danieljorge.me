import { cn } from "~/lib/tailwindcss";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Anchor(props: AnchorProps) {
  const { children, className, ...rest } = props;

  return (
    <a
      className={cn(
        "text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
