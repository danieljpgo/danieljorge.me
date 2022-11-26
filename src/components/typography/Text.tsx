import { cn } from "../../../lib/tailwindcss";

const colors = {
  lighter: "text-gray-500",
  light: "text-gray-600",
  base: "text-gray-700",
  dark: "text-gray-800",
  darker: "text-gray-900",
} as const;

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;

const tags = {
  p: "p",
  b: "b",
  i: "i",
  strong: "strong",
  em: "em",
  small: "small",
} as const;

const weights = {
  thin: "font-thin",
  "extra-light": "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

type TextProps = {
  children: string | React.ReactNode;
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  as?: keyof typeof tags;
  weight?: keyof typeof weights;
};

export default function Text(props: TextProps) {
  const {
    children,
    color = "base",
    as = "p",
    size = "base",
    weight = "normal",
  } = props;
  const Tag = as;

  return (
    <Tag
      className={cn(sizes[size], weights[weight], colors[color], "antialiased")}
    >
      {children}
    </Tag>
  );
}

