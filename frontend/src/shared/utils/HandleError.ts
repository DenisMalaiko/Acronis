export const handleError = (response: Response) => {
  let message;

  switch (response.status) {
    case 400:
      message = 'Bad request';
      break;
    case 404:
      message = 'Not found';
      break;
    case 500:
      message = 'Server error';
      break;
    default:
      message = 'Request failed';
  }

  throw new Error(message);
};