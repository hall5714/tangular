'use strict';

Date.prototype.removeSeconds = function(seconds) {
  var date = new Date(this.getTime());
  return new Date(date.getTime() - seconds * 1000);
}

Date.prototype.removeMinutes = function(minutes) {
  var date = new Date(this.getTime());
  return new Date(date.getTime() - minutes * 60000);
}

Date.prototype.addMinutes = function(minutes) {
  var date = new Date(this.getTime());
  return new Date(date.getTime() + minutes * 60000);
}

describe('relative', function() {
  var $compile, scope, sandbox;

  beforeEach(module('ngSanitize'));
  beforeEach(module('hall5714.tng.relative'));

  beforeEach(inject(function (_$rootScope_, _$compile_){
    scope = _$rootScope_;
    $compile = _$compile_;
    sandbox = $('<div>').attr('id', 'sandbox').appendTo('body');
  }));

  afterEach(function() {
    sandbox.remove();
    scope.$destroy();
  });

  var templates = {
    'default': {
      scope: { date: new Date() },
      element: '<span tng-relative-time="date"></span>'
    },
    'between': {
      scope: { date: new Date().removeMinutes(5), between: new Date() },
      element: '<span tng-relative-time="date" tng-between="between"></span>'
    },
    'asString': {
      scope: { date: new Date().removeMinutes(5).toUTCString() },
      element: '<span tng-relative-time="date"></span>'
    },
    'fiveMinutesRemoved': {
      scope: { date: new Date().removeMinutes(5) },
      element: '<span tng-relative-time="date"></span>'
    },
    'fiveMinutesAdded': {
      scope: { date: new Date().addMinutes(5) },
      element: '<span tng-relative-time="date"></span>'
    },
    'fiveMinutesNoSuffix': {
      scope: { date: new Date().removeMinutes(5) },
      element: '<span tng-relative-time="date" tng-suffix="false">unchanged</span>'
    },
    'twoDates': {
      scope: { date: new Date(), date2: new Date().removeMinutes(5) },
      element: '<span tng-between="date" tng-and="date2"></span>'
    },
    'twoDatesSuffix': {
      scope: { date: new Date(), date2: new Date().removeMinutes(5) },
      element: '<span tng-between="date" tng-and="date2" tng-suffix="true"></span>'
    },
    'seconds': {
      scope: { date1: new Date().removeSeconds(5), date2: new Date().removeSeconds(30) },
      element: '<span tng-relative-time="date1"></span><span tng-relative-time="date2"></span>'
    },
    'minutes': {
      scope: { date1: new Date().removeMinutes(1), date2: new Date().removeMinutes(2) },
      element: '<span tng-relative-time="date1"></span><span tng-relative-time="date2"></span>'
    },
    'hours': {
      scope: { date1: new Date().removeMinutes(60), date2: new Date().removeMinutes(120) },
      element: '<span tng-relative-time="date1"></span><span tng-relative-time="date2"></span>'
    },
    'days': {
      scope: { date1: new Date().removeMinutes(60*24), date2: new Date().removeMinutes(60*48) },
      element: '<span tng-relative-time="date1"></span><span tng-relative-time="date2"></span>'
    },
    'months': {
      scope: { date1: new Date().removeMinutes(60*24*30), date2: new Date().removeMinutes(60*24*60) },
      element: '<span tng-relative-time="date1"></span><span tng-relative-time="date2"></span>'
    },
    'years': {
      scope: { date1: new Date().removeMinutes(60*24*365), date2: new Date().removeMinutes(60*24*2*365) },
      element: '<span tng-relative-time="date1"></span><span tng-relative-time="date2"></span>'
    }
  }

  function compileDirective(template, locals) {
    template = templates[template];
    angular.extend(scope, template.scope || templates['default'].scope, locals);
    var element = $(template.element).appendTo(sandbox);
    element = $compile(element)(scope);
    scope.$digest();
    return jQuery(element[0]);
  }

  describe('now()', function() {
    it('handle difference in seconds', function() {
      var elem = compileDirective('seconds');
      expect(sandbox.children().eq(0).html()).toBe("just now");
      expect(sandbox.children().eq(1).html()).toBe("a few seconds ago");
    });

    it('handle difference in minutes', function() {
      var elem = compileDirective('minutes');
      expect(sandbox.children().eq(0).html()).toBe("about a minute ago");
      expect(sandbox.children().eq(1).html()).toBe("2 minutes ago");
    });

    it('handle difference in hours', function() {
      var elem = compileDirective('hours');
      expect(sandbox.children().eq(0).html()).toBe("about an hour ago");
      expect(sandbox.children().eq(1).html()).toBe("2 hours ago");
    });

    it('handle difference in days', function() {
      var elem = compileDirective('days');
      expect(sandbox.children().eq(0).html()).toBe("about a day ago");
      expect(sandbox.children().eq(1).html()).toBe("2 days ago");
    });

    it('handle difference in months', function() {
      var elem = compileDirective('months');
      expect(sandbox.children().eq(0).html()).toBe("about a month ago");
      expect(sandbox.children().eq(1).html()).toBe("2 months ago");
    });

    it('handle difference in years', function() {
      var elem = compileDirective('years');
      expect(sandbox.children().eq(0).html()).toBe("about a year ago");
      expect(sandbox.children().eq(1).html()).toBe("2 years ago");
    });

    it('should handle between dates', function() {
      var elem = compileDirective('between');
      expect(sandbox.children().eq(0).html()).toBe("5 minutes");
    });

    it('should handle non-default suffix options', function() {
      var elem = compileDirective('fiveMinutesNoSuffix');
      expect(sandbox.children().eq(0).html()).toBe("5 minutes");
    });

    it('should properly handle past prefix/suffix', function() {
      var elem = compileDirective('fiveMinutesRemoved');
      expect(elem.html()).toBe("5 minutes ago");
    });

    it('should properly handle future prefix/suffix', function() {
      var elem = compileDirective('fiveMinutesAdded');
      expect(elem.html()).toBe("5 minutes from now");
    });

    it('should handle dates as strings', function() {
      var elem = compileDirective('asString');
      expect(elem.html()).toBe("5 minutes ago");
    });
  });
});