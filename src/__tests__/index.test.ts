import { ErrorMessage, parseError } from "../index";

const mockEmptyErr = {
  name: "TypeError",
  message: "Error raised"
};

const mockEmptyErrMessage = {
  message: mockEmptyErr.message,
  stack: []
};

const mockChromeErr = {
  name: mockEmptyErr.name,
  message: mockEmptyErr.message,
  stack: `TypeError: Error raised
    at bar http://192.168.31.8:8000/c.js:2:9
    at foo http://192.168.31.8:8000/b.js:4:15
    at calc http://192.168.31.8:8000/a.js:4:3
    at <anonymous>:1:11
    at http://192.168.31.8:8000/a.js:22:3
  `
};

const mockFirefoxErr = {
  name: mockEmptyErr.name,
  message: mockEmptyErr.message,
  stack: `
      bar@http://192.168.31.8:8000/c.js:2:9
      foo@http://192.168.31.8:8000/b.js:4:15
      calc@http://192.168.31.8:8000/a.js:4:3
      <anonymous>:1:11
      http://192.168.31.8:8000/a.js:22:3
  `
};

const mockErrMessage: ErrorMessage = {
  message: mockEmptyErr.message,
  stack: [
    {
      line: 2,
      column: 9,
      filename: "http://192.168.31.8:8000/c.js"
    },
    {
      line: 4,
      column: 15,
      filename: "http://192.168.31.8:8000/b.js"
    },
    {
      line: 4,
      column: 3,
      filename: "http://192.168.31.8:8000/a.js"
    },
    {
      line: 22,
      column: 3,
      filename: "http://192.168.31.8:8000/a.js"
    }
  ]
};

describe("test parseError", () => {
  test("should return ErrorMessage with empty stack with empty error", () => {
    expect(parseError(mockEmptyErr)).toEqual(mockEmptyErrMessage);
  });
  test("should return ErrorMessage with valid Chrome error", () => {
    expect(parseError(mockChromeErr)).toEqual(mockErrMessage);
  });
  test("should return ErrorMessage with valid Firefox error", () => {
    expect(parseError(mockFirefoxErr)).toEqual(mockErrMessage);
  });
});
