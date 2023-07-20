export type PropsFrom<Component> = Component extends React.FunctionComponent<
  infer Props
>
  ? Props
  : never;
