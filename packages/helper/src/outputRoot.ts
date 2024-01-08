import { AppType } from "../enums/AppType.enum";

const outputRoot = (appType: AppType) => {
  switch (appType) {
    case AppType.WEAPP:
      return "./dist/weapp";
    case AppType.DD:
      return "./dist/ddapp";
    default:
      return "./dist/other";
  }
};

export { outputRoot };
