export type TailwindBgColor = `bg-${string}`;
export type TailwindBgHoverColor = `hover:bg-${string}`;
export type TailwindBgPadding = `p-${string | `[${string | number}]`}`;

export type PositionClassObject = {
  top?: `top-${number | "auto" | `[${number | string}]`}`;
  right?: `right-${number | "auto" | `[${number | string}]`}`;
  bottom?: `bottom-${number | "auto" | `[${number | string}]`}`;
  left?: `left-${number | "auto" | `[${number | string}]`}`;
};

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type TailwindClass<T> = T | T[];

export type BaseTailwindHeight =
  | `h-${number}`
  | `h-[${string}]`
  | `max-h-[${string | number}]`
  | `max-h-${string | number}`
  | `h-${"screen" | "full" | "min" | "max"}`;

export type BaseTailwindWidth =
  | `w-${number}`
  | `w-[${string}]`
  | `max-w-[${string | number}]`
  | `max-w-${string | number}`
  | `w-${"screen" | "full" | "min" | "max"}`;

export type TailwindHeight =
  | BaseTailwindHeight
  | `${Breakpoint}:${BaseTailwindHeight}`;

export type TailwindWidth =
  | BaseTailwindWidth
  | `${Breakpoint}:${BaseTailwindWidth}`;
