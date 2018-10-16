# Never Knows Best (MEAN Seed)


## Table of Contents

1. [Overview](#overview)
2. [Technologies/Packages](#technology)
3. [Features](#features)
4. [Getting Started](#gettingstarted) 
5. [Build](#build)
6. [Deploy](#deploy)
7. [Troubleshooting](#troubleshooting) 
8. [License](#license)


## Overview <a name="overview"></a>
This project is intended as a quick way to get a modern "full stack" seed
application started using what many would consider the best technology 
(as well as practices) available at the time this was written.

No one knows the best way to handle every situation every time. With that in 
mind, this project is intended to alleviate some of burden of dealing with 
getting a project ready to begin actual feature development.


## Technology/Packages <a name="technology"></a>

* [Angular 6](https://angular.io/apim)
    * [Angular Style Guide](https://angular.io/guide/styleguide)
    * HTML 5 routes/history
    * [TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html)
        * Benefits  
    * [Angular Material](https://material.angular.io/components/categories) 
    * Angular Animations with Hammer.js
* [WebPack 4](https://webpack.js.org/concepts/)
    * Lazy-loaded bundle chunks
    * Bundle analyzation
    * Dev Build
        * WebPack Dev Server
    * Prod Build
        * Ahead of Time Compilation
        * gzip
        * lite-server with BrowserSync
    * Cloud9 IDE Build Support (dev & prod) 
* Persistence [MongoDB](https://docs.mongodb.com/manual/)
    * [mLab](https://docs.mlab.com/) 
* [GraphQL](https://graphql.org/learn/)
    * [Apollo Angular](https://www.apollographql.com/docs/angular/)
* Local Store [NGXS](https://ngxs.gitbook.io/ngxs/api)
* Testing 
    * Unit [Mocha Chai]
        * (Mocha)[https://mochajs.org]
        * (Chai)[https://www.chaijs.com/guide/styles/]
    * Behavioral [Cucumber & Gherkin]()
    * End-to-End (E2E) [Protractor]()
* [Heroku](https://devcenter.heroku.com/categories/reference)
    * Optional Deployment
* Documentation
    * [JSDoc](http://usejsdoc.org/) 


## Features <a name="features"></a>

* Accessibility
    * [WCAG 2](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0)  
* Security
    * [OWASP Compliances](https://www.owasp.org/index.php/Code_Reviews_and_Compliance)
* [OAUTH](https://www.npmjs.com/package/oauth) user authentication 
* router based navigation
* basic blog
* basic chat
* basic photo gallery
* i18n
* 404 page not found
* theme switching
* websocket progress file upload


## Getting Started <a name="gettingstarted"></a>
This project can be set up for development in a local workstation or within
the cloud IDE: Cloud9 IDE.


## Build <a name="build"></a>
### Local

### Cloud9
#### Run API Server
``` bash
npm run c9:api:dev
```

#### Run App UI
``` bash
npm run c9:dev
```

### Environments
#### Application Frontend
<host>:8080

#### Backend/API
<host>: 8081

#### [WebPack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
<host>:8082 (https not supported in Cloud9 for port 8082)

### [Heroku](https://devcenter.heroku.com/categories/reference)
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

Cloud9 Installation Command: 
``` bash
curl https://cli-assets.heroku.com/install.sh | sh
```

## Deploy <a name="deploy"></a>

## Troubleshooting <a name="troubleshooting"></a>

## License <a name="license"></a>
UNLICENSED

License will not be free to use until seed is complete and stable