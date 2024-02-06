import { AppType } from "./AppType.enum";

const platformCallbackglobalObject = (appType?: AppType) => {
  switch (appType) {
    case AppType.DD:
      return "dd";
    case AppType.WEAPP:
    default:
      return "wx";
  }
};

export { platformCallbackglobalObject };
