import { AppType } from '../enums/AppType.enum';

const platformCallbackglobalObject = (appType?: AppType) => {
  switch (appType) {
    case AppType.DD:
      return 'dd';
    case AppType.WEAPP:
    default:
      return 'wx';
  }
};

const wxOutputDirectory = './wx-dll';

const ddOutputDirectory = './dd-dll';

const platformCallbackDistDirectory = (appType?: AppType) => {
  switch (appType) {
    case AppType.DD:
      return ddOutputDirectory;
    case AppType.WEAPP:
    default:
      return wxOutputDirectory;
  }
};

export { platformCallbackglobalObject, platformCallbackDistDirectory };
