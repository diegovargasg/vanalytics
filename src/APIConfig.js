import awsExports from "./aws-exports";
import { Auth } from "aws-amplify";

const APIConfig = async () => {
  const configValues = {
    name: awsExports.API.endpoints[0].name,
    headers: {
      "Content-Type": "application/json",
      Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
    endpoint: awsExports.API.endpoints[0].endpoint,
  };
  return configValues;
};

export default APIConfig;
