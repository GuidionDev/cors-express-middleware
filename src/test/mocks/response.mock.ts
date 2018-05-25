class ResponseMock {
  headers = {};

  header(key: string, value: string) {
    this.headers[key] = value;
  }

}

export default ResponseMock;