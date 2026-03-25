import { i18n } from "../../app/i18n";

export const handleError = (response: Response) => {
  let message;

  console.log("---------------")
  console.log("HANDLE ERROR")
  console.log("---------------")

  switch (response.status) {
    case 400:
      message = i18n.global.t('Errors.BadRequest');
      break;
    case 404:
      message = i18n.global.t('Errors.NotFound');
      break;
    case 500:
      message = i18n.global.t('Errors.ServerError');
      break;
    default:
      message = i18n.global.t('Errors.RequestFailed');
  }

  throw new Error(message);
};