/**
 * tangular
 * @version v0.1.0 - 2014-03-20
 * @link http://hall5714.github.io/tangular
 * @author Justin Hall ()
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('hall5714.tng.relative', []).constant('time-language', {
  'future': '%s from now',
  'past': '%s ago',
  's': 'just now',
  'ss': 'a few seconds',
  'm': 'about a minute',
  'mm': '%d minutes',
  'h': 'about an hour',
  'hh': '%d hours',
  'd': 'about a day',
  'dd': '%d days',
  'M': 'about a month',
  'MM': '%d months',
  'y': 'about a year',
  'yy': '%d years',
  'seperator': ' '
}).provider('$relative', [
  'time-language',
  function (language, $filter) {
    //private
    var round = Math.round;
    // this needs to be rewritten
    var dateObject = function (input) {
      if (input instanceof Date) {
        return input;
      } else {
        return new Date(input);
      }
    };
    var format = function (args) {
      var time;
      if (args[0] === 's') {
        return language.s;
      }
      if (args[3] === false) {
        time = '%s';
      } else if (args[2]) {
        time = language.future;
      } else {
        time = language.past;
      }
      time = time.replace(/%s/i, language[args[0]]);
      return time.replace(/%d/i, args[1]);
    };
    // Private constructor
    function Relative() {
      this.relativeTime = function (date, date2, suffix) {
        var milliseconds = date.getTime() - date2.getTime(), seconds = round(Math.abs(milliseconds) / 1000), minutes = round(seconds / 60), hours = round(minutes / 60), days = round(hours / 24), years = round(days / 365), args = seconds < 15 && [
            's',
            seconds
          ] || seconds < 45 && [
            'ss',
            seconds
          ] || minutes === 1 && ['m'] || minutes < 45 && [
            'mm',
            minutes
          ] || hours === 1 && ['h'] || hours < 22 && [
            'hh',
            hours
          ] || days === 1 && ['d'] || days <= 25 && [
            'dd',
            days
          ] || days <= 45 && ['M'] || days < 345 && [
            'MM',
            round(days / 30)
          ] || years === 1 && ['y'] || [
            'yy',
            years
          ];
        args[2] = milliseconds > 0;
        args[3] = suffix;
        return format(args);
      };
      this.between = function (datetime, datetime2, suffix) {
        var date = dateObject(datetime), date2 = angular.isDefined(datetime2) ? dateObject(datetime2) : new Date();
        return this.relativeTime(date, date2, suffix);
      };
    }
    // Method for instantiating
    this.$get = function () {
      return new Relative();
    };
  }
]).directive('tngRelativeTime', function ($relative, $interval) {
  return {
    restrict: 'EAC',
    scope: true,
    link: function (scope, element, attrs) {
      scope.from = scope.$parent.$eval(attrs.tngRelativeTime);
      scope.between = angular.isDefined(attrs.tngBetween) ? scope.$parent.$eval(attrs.tngBetween) : undefined;
      scope.suffix = angular.isDefined(attrs.tngSuffix) ? scope.$parent.$eval(attrs.tngSuffix) : true;
      if (angular.isDefined(scope.between) && !angular.isDefined(attrs.tngSuffix)) {
        scope.suffix = false;
      }
      ;
      scope.interval = function () {
        element.text($relative.between(scope.from, scope.between, scope.suffix));
      };
      scope.$on('$destroy', function () {
        $interval.cancel(promise);
      });
      scope.interval();
      var promise = $interval(scope.interval, 1000);
    }
  };
});