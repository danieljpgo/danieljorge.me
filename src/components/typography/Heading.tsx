import { cn } from "../../../lib/tailwindcss";

const tags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} as const;

const sizes = {
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
} as const;

const defaultSize = {
  h1: "text-3xl",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
  h5: "text-base",
  h6: "text-sm",
} as const;

const colors = {
  base: "text-gray-700",
  dark: "text-gray-800",
  darker: "text-gray-900",
} as const;

const trackings = {
  tight: "tracking-tight",
  normal: "tracking-normal",
} as const;

const leadings = {
  tight: "leading-tight",
};

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
} as const;

type HeadingProps = {
  children: string | React.ReactNode;
  as?: keyof typeof tags;
  weight?: keyof typeof weights;
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  tracking?: keyof typeof trackings;
  leading?: keyof typeof leadings;
};

export default function Heading(props: HeadingProps) {
  const {
    children,
    size,
    as: tag = "h2",
    color = "dark",
    weight = "normal",
    tracking = "normal",
    leading,
  } = props;
  const Tag = tag;

  return (
    <Tag
      className={cn(
        size ? sizes[size] : defaultSize[tag],
        weights[weight],
        colors[color],
        trackings[tracking],
        leading ? leadings[leading] : "",
      )}
    >
      {children}
    </Tag>
  );
}
