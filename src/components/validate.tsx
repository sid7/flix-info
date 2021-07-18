import { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import useFetchInfo from "../hooks/fetch-info";

interface IValidate<P extends any> {
  scope: "tv" | "movie" | "person";
  id: string;
  component: ComponentType<P>;
}

export default function Validate({
  scope,
  id,
  component: Component
}: IValidate<any>) {
  const payload = useFetchInfo(scope, id);

  switch (payload.status) {
    case "Loading":
      return <h1>Loading...</h1>;
    case "Failed":
      return (
        <Redirect
          to={{
            pathname: "/404",
            state: {
              msg: `There is no page for "<code>${id}</code>" id in <code>${scope}</code>`
            }
          }}
        />
      );
    case "Error":
      return (
        <Redirect
          to={{
            pathname: "/404",
            state: {
              msg: `Error <br/>${payload.err}`
            }
          }}
        />
      );
    case "Success":
      return <Component {...payload.data} />;
  }
}
