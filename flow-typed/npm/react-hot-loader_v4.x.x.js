// flow-typed signature: db5d82f17229ec3dcb276467d999ea56
// flow-typed version: 1517003b23/react-hot-loader_v4.x.x/flow_>=v0.53.0

// @flow
declare module "react-hot-loader" {
  declare type Module = {
    id: string
  };

  declare type AppContainerProps = {|
    children: React$Element<any>,
    errorBoundary?: boolean,
    errorReporter?: React$ComponentType<{
      error: Error,
      errorInfo: { componentStack: string }
    }>
  |};

  declare export class AppContainer extends React$Component<
    AppContainerProps
  > {}

  declare export function hot(
    someModule: Module
  ): <T, W: React$ComponentType<T>>(
    wrappedComponent: W,
    props?: $Diff<AppContainerProps, { children: React$Element<any> }>
  ) => React$ComponentType<T>;
}
