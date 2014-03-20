[![Banner](https://raw.githubusercontent.com/hall5714/tangular/master/docs/images/tangular.png)](https://github.com/hall5714/tangular)

Tangular is a set of native time and date directives and services for AngularJS. The long-term goal of Tangular is a replacement for [Moment.js](http://momentjs.com/), particularly the timeago and calendar time. Tangular is still in its infancy, so use with caution.

## Getting Started

The current implementation of Tangular includes a relative time directive and service. Often called timeago, this directive converts dates and times relative to the current time (or a provided time), such as "just now", "a few minutes ago", etc. 

### Timeago

HTML:
```
   <span tng-relative-time="date"></span>`
```

Javascript:
```
   ...
   scope.date = new Date();
   ...
```

### Relative Time

HTML:
```   
   <span tng-relative-time="date" tng-between="between"></span>
```

Javascript:
```
	...
	scope.date = new Date();
	scope.between = scope.date.setMinutes(scope.date.getMinutes() - 5)
	...
```

By default, the suffix/prefix (eg. "ago" or "from now") will be removed for relative time and included for timeago. The default settings can be changed by setting a `tng-suffix="boolean"` property.

## Documentation & Examples
This is currently a work in progress. There is currently no docs to generate, and the grunt doc generation is still effectively tied to 
AngularStrap. 

## Developers

Clone the repo:
`git clone git://github.com/hall5714/tangular.git`

Running Tests:

>
	$ npm install grunt-cli --global
	$ npm install --dev
	$ grunt test

Building:

>
	$ grunt build

Development:
>
	$ grunt serve

## Thanks

A special thanks to Olivier Louvignes, the developer for [AngularStrap](https://github.com/mgcrea/angular-strap/), much of the "setup" for this project was taken from his work, particularly the format of the tests, as well as setup/configuration files. Additionally, much of the work for this project 
was due to the amazing work by the developers of [Moment.js](http://momentjs.com/).

## Author

Justin Hall