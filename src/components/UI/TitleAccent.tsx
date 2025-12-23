type TitleVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleAccent {
  children: string;
  variant?: TitleVariant;
}

const styles: Record<TitleVariant, string> = {
  h1: "text-3xl font-bold",
  h2: "text-lg font-semibold",
  h3: "text-base font-medium",
  h4: "text-sm font-medium",
  h5: "text-sm",
  h6: "text-xs",
};

export default function TitleAccent({ children, variant = "h1" }: TitleAccent) {
  const Tag: TitleVariant = variant;

  return <Tag className={`${styles[variant]} text-accent`}>{children}</Tag>;
}
