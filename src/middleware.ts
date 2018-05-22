export function corsMiddleware(allowedDomains: string|string[]): Function {
  return function(req: any, res: any, next: any) {
    if (req.header('origin') && valueEndsWithClientDomainSetting(req.header('origin'), allowedDomains)) {
      res.header('Access-Control-Allow-Origin', req.header('origin'));
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }
    res.header('Content-Type', 'application/json');
    next();
  };
}

const valueEndsWithClientDomainSetting = function (originHeader: string, clientDomains: string |string[]): boolean {
  clientDomains = (Array.isArray(clientDomains)) ? clientDomains : clientDomains.split(',');
  let matchesClientDomain = false;
  clientDomains.forEach((clientDomain) => {
    if (originHeader.endsWith(clientDomain)) {
      matchesClientDomain = true;
    }
  });
  return matchesClientDomain;
};