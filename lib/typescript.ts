export type PropsFrom<Component> = Component extends React.FC<infer Props>
  ? Props
  : never;
