type PlaygroundProps = {
  children: React.ReactNode;
};

export default function Playground(props: PlaygroundProps) {
  const { children } = props;

  return (
    <div className="grid min-h-[300px] w-full place-items-center rounded-md border border-gray-200 p-10">
      {children}
    </div>
  );
}
