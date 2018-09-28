# Never Knows Best (MEAN Seed)

## Overview
This project is intended as a quick way to get a modern "full stack" seed
application started using what many would consider the best technology 
(as well as practices) available at the time this was written.

No one knows the best way to handle every situation every time. With that in 
mind, this project is intended to alleviate some of burden of dealing with 
getting a project ready to begin actual feature development.

## Table of Contents


### Technology

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
* [Heroku](https://devcenter.heroku.com/categories/reference)
    * Optional Deployment
    
### Standards

* Documentation
    * [JSDoc](http://usejsdoc.org/) 
* Testing
    * Unit
    * End-to-End
* Accessibility
    * [WCAG 2](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0)  
* Security
    * [OWASP Compliances](https://www.owasp.org/index.php/Code_Reviews_and_Compliance)

### Features

* [OAUTH](https://www.npmjs.com/package/oauth) user authentication 
* router based navigation
* basic blog
* basic chat
* basic photo gallery
* i18n
* 404 page not found
* theme switching
* websocket progress file upload

## Getting Started
This project can be set up for development in a local workstation or within
the cloud IDE: Cloud9 IDE.

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

## Troubleshooting

## License
UNLICENSED

License will not be free to use until seed is complete and stable