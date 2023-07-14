import type { PropsFrom } from "~/lib/typescript";
import NextLink from "next/link";
import { cn } from "~/lib/tailwindcss";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
} as const;

type LinkProps = PropsFrom<typeof NextLink> & {
  size?: keyof typeof sizes;
};

// text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300
export default function Link(props: LinkProps) {
  const { children, className, size = "sm", ...rest } = props;

  return (
    <NextLink
      className={cn(
        "text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
