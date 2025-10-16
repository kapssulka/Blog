interface TitleMessageProps {
  title: string;
}

export default function TitleMessage({ title }: TitleMessageProps) {
  return (
    <h2 className="text-2xl font-semibold text-gray-500 text-center">
      {title}
    </h2>
  );
}
