class RequestMock {
  origin: string = null;

  constructor(origin: string) {
    if (origin) {
      this.origin = origin;
    }
  }

  header(key) {
    return this[key];
  }

}

export default RequestMock;