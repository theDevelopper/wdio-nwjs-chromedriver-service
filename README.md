WDIO NW.js ChromeDriver Service
================================

(Based on [wdio-chromium-service](https://github.com/atti187/wdio-chromedriver-service).)

----

This service helps you to run ChromeDriver shipped with the NW.js SDK seamlessly when running tests with the [WDIO testrunner](http://webdriver.io/guide/testrunner/gettingstarted.html).

Note - this service does not require a Selenium server, but uses NW.js ChromeDriver to communicate with the browser directly.
Obvisously, it only supports:

```js
capabilities: [{
        browserName: 'chrome'
    }]
```

## Installation

The easiest way is to keep `wdio-nwjs-chromedriver-service` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
      "wdio-nwjs-chromedriver-service": "git+https://github.com/theDevelopper/wdio-nwjs-chromedriver-service.git",
  }
}
```

You can simple do it by:

```bash
npm install https://github.com/theDevelopper/wdio-nwjs-chromedriver-service --save-dev
```

Instructions on how to install `WebdriverIO` can be found [here.](http://webdriver.io/guide/getstarted/install.html)

## Configuration

By design, only Google Chrome is available (when installed on the host system). In order to use the service you need to add `nwjs-chromedriver` to your service array and you need to set the path to your NW.js ChromeDriver binary:

```js
// wdio.conf.js
export.config = {
  port: '9515',
  path: '/',
  // ...
  services: ['nwjs-chromedriver'],
  nwjsChromeDriverPath: 'path/to/chromedriver'
  // ...
};
```

### Configuration Example

If you want to use the NW.js SDK from npm you can install it using this command, e.g. for version 0.27.1:

```bash 
npm install nw@0.27.1-sdk
```

Then add the following to your wdio configuration:
```js
// wdio.conf.js
export.config = {
  port: '9515',
  path: '/',
  // ...
  services: ['nwjs-chromedriver'],
  nwjsChromeDriverPath: 'node_modules/nw/nwjs'

  // ...
};
```

in this case you also need tot tell NW.js where to find your app, in our case it is in the dist dicrectory:
```js
// wdio.conf.js
export.config = {
  capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        chromeOptions: {
            args: ['nwapp=./dist']
        }
    }],
  // ...
};
```

For more information on WebdriverIO see the [homepage](http://webdriver.io).