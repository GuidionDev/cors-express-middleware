# Cors Express Middleware

## Usage:

```js
import { Container } from 'inversify';
import CorsMiddleware from '@gdn/cors-express-middleware';
...
let server = new InversifyExpressServer(kernel);
server.setConfig((app: any) => {
  app.use(CorsMiddleware(['test.nl']));
});
...

```
