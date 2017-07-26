[![logem][logem-logo]][logem-url]

Opinionated logger based on top of [winston](https://www.npmjs.com/package/winston)
with [Papertrail](https://papertrailapp.com/) integration.

## Demo
![Terminal gif][example-gif]

## How to use
```js
var logem = require('logem');

logem.debug({ objects: [ 'allowed' ] });
logem.info('An informational message');
logem.warn('⚠️  Warning !!');
logem.error('ERROR: blah');
```

## Environment variables
The package uses environment variables instead of configurations in order to be
provide the ability to change logging behavior without changing the code.

| ENV             | Default  | Desc                       |
|:-----------------|:--------|:---------------------------|
| LOG_LEVEL        | info    | severity of logging needed |
| LOG_SERVICE_HOST |         | Host of Papertrail service |
| LOG_SERVICE_PORT |         | Port of Papertrail service |

## How to install
```
npm install logem
```

---
Built by: [Codebrahma][codebrahma-url]

[logem-url]: https://github.com/Codebrahma/logem
[logem-logo]: https://raw.githubusercontent.com/Codebrahma/logem/master/logo.png
[example-gif]: https://raw.githubusercontent.com/Codebrahma/logem/master/example.gif
[codebrahma-url]: https://github.com/Codebrahma
