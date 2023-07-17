type PlaygroundProps = {
  children: React.ReactNode;
};

export default function Playground(props: PlaygroundProps) {
  const { children } = props;

  return (
    <div className="flex min-h-[300px] w-full items-center justify-center rounded-md border border-green-400">
      {children}
    </div>
  );
}
