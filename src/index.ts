export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

const PARSE_ERROR_REGULAR_EXPRESSION = /[a-zA-Z]+:\/\/(.\/)*.+\.([a-zA-Z]+)(:[\d]+){2}$/gm;

export function parseError(err: Error): ErrorMessage {
  const parseStack = err.stack && err.stack.match(PARSE_ERROR_REGULAR_EXPRESSION);
  const errorMessage: ErrorMessage = {
    message: err.message,
    stack: [],
  };
  if (parseStack) {
    parseStack.forEach((item: string) => {
      const message = item.split(':');
      errorMessage.stack.push({
        column: Number(message.pop()),
        line: Number(message.pop()),
        filename: message.join(':'),
      });
    });
  }
  return errorMessage;
}
