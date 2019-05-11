import React from "react";
import { RouteProps, Route } from "react-keeper";
import Loadable from "react-loadable";
import { packToClassComponent } from "@/common/kit/functions/packToClassComponent";

interface AsyncRouteProps extends RouteProps {
  imported: () => Promise<any>;
  loading?: () => JSX.Element;
}

function Loading() {
  return <div style={{ margin: "1em" }}>Loading...</div>;
}

export default function LoadingRoute(props: AsyncRouteProps) {
  const LoadableComponnet = Loadable({
    loader: () =>
      props.imported().then((C: any) => {
        C = C.default ? C.default : C;
        if (typeof C.render === "function") return C;
        else return packToClassComponent(C);
      }),
    loading: props.loading ? props.loading : Loading
  });
  return (
    <Route {...props} component={LoadableComponnet}>
      {props.children}
    </Route>
  );
}
