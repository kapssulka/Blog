interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: any;
}

export default function FormWrapper({ children, onSubmit }: FormWrapperProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="
        flex flex-col
        px-5 py-10 bg-zinc-900 h-auto rounded-2xl
        max-w-[500px] w-full
        sm:p-10
        "
    >
      {children}
    </form>
  );
}
