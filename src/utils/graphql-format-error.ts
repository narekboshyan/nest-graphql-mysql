import { GraphQLError } from 'graphql';

export const formatError = (error: GraphQLError) => {
  if (error.locations) {
    return {
      message: error.message,
      response: {
        statusCode: 111,
        message: error.message,
        error: 'Bad Request',
      },
    };
  } else if (error.extensions && !error.locations) {
    let message: any = '';
    if (error.extensions.response) {
      const extensionResponse: any = error.extensions.response;
      if (extensionResponse.message?.length) {
        message =
          typeof extensionResponse.message === 'string'
            ? extensionResponse.message
            : extensionResponse.message[0];
      }
    }

    return {
      message,
      response: error.extensions.response,
    };
  }

  return error;
};
