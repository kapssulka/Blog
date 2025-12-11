interface ShowPasswordItemProps {
  setShowPassword: () => void;
  children: React.ReactNode;
}

export default function ShowPasswordItem({
  setShowPassword,
  children,
}: ShowPasswordItemProps) {
  return (
    <span className="" onClick={setShowPassword}>
      {children}
    </span>
  );
}
