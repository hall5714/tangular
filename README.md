[![Build Status](https://travis-ci.org/hall5714/tangular.svg?branch=master)](https://travis-ci.org/hall5714/tangular) [![Coverage Status](https://coveralls.io/repos/hall5714/tangular/badge.png)](https://coveralls.io/r/hall5714/tangular)

[![Banner](https://raw.githubusercontent.com/hall5714/tangular/master/docs/images/tangular.png)](https://github.com/hall5714/tangular)

Tangular is a set of native time and date directives and services for AngularJS, *with no external dependencies*. The long-term goal of Tangular is a replacement for [Moment.js](http://momentjs.com/), particularly the timeago and calendar time. Tangular is still in its infancy, so use with caution.

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

A special thanks to [Olivier Louvignes](http://olouv.com/), the core developer of [AngularStrap](https://github.com/mgcrea/angular-strap/). The majority of the Grunt and Testing setup for this project was taken from AngularStrap. Additionally, a thanks to [Moment.js](http://momentjs.com) the library that generated the idea for Tangular.

## Author

Justin Hall