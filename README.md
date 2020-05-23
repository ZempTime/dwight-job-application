## Running


* `git clone git@github.com:ZempTime/dwight-job-application.git`
* `cd dwight-job-application && yarn && yarn start`


## Viewing Tests
There's some weirdness here because at the time I wrote it, XState wasn't exporting ES modules. This has since been [fixed upstream](https://github.com/davidkpiano/xstate/releases/tag/%40xstate%2Ftest%400.4.0).

* hop into `node_modules/xstate/es/environment.js`
* set `var IS_PRODUCTION = false;` instead of `var IS_PRODUCTION = process.env.NODE_ENV === 'production';`
* `yarn test:watch` to see it.

You can change how fast it runs by changing `const DELAY_MS = 50;` in `test/dwight-job-application.test.js`
