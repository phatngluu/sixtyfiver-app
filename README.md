# SixtyfiverApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Troubleshoot
- Sometimes, some Antd components do not apply style, it is becausing missing corresponding module. For example, input component needs NzInputModules. Let's import in into our module.
- Web3.js. In `tsconfig.json` 
```
{
  "compilerOptions": {
    "paths" : {
      "crypto": ["./node_modules/crypto-browserify"],
      "stream": ["./node_modules/stream-browserify"],
      "assert": ["./node_modules/assert"],
      "http": ["./node_modules/stream-http"],
      "https": ["./node_modules/https-browserify"],
      "os": ["./node_modules/os-browserify"],
    }
  }
}
```
- Web3.js and Angular problem
  - https://github.com/ChainSafe/web3.js/issues/2260
  - https://github.com/ChainSafe/web3.js/issues/4070
