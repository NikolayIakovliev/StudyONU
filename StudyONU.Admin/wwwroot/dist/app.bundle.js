/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(7))(7);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(7))(10);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isView = exports.isViews = exports.isValue = exports.isMaxDate = exports.isMinDate = exports.isCalendarType = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var calendarTypes = ['ISO 8601', 'US'];
var allViews = ['century', 'decade', 'year', 'month'];

var isCalendarType = exports.isCalendarType = _propTypes2.default.oneOf(calendarTypes);

var isMinDate = exports.isMinDate = function isMinDate(props, propName, componentName) {
  var minDate = props[propName];
  var maxDate = props.maxDate;

  if (minDate) {
    if (!(minDate instanceof Date)) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : _typeof(maxDate)) + '` supplied to `' + componentName + '`, expected instance of `Date`.');
    }

    if (maxDate && minDate > maxDate) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : _typeof(maxDate)) + '` supplied to `' + componentName + '`, minDate cannot be larger than maxDate.');
    }
  }

  // Everything is fine
  return null;
};

var isMaxDate = exports.isMaxDate = function isMaxDate(props, propName, componentName) {
  var maxDate = props[propName];
  var minDate = props.minDate;

  if (maxDate) {
    if (!(maxDate instanceof Date)) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : _typeof(maxDate)) + '` supplied to `' + componentName + '`, expected instance of `Date`.');
    }

    if (minDate && maxDate < minDate) {
      return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of type `' + (typeof maxDate === 'undefined' ? 'undefined' : _typeof(maxDate)) + '` supplied to `' + componentName + '`, maxDate cannot be smaller than minDate.');
    }
  }

  // Everything is fine
  return null;
};

var isValue = exports.isValue = _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(Date), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date))]);

var isViews = exports.isViews = _propTypes2.default.arrayOf(_propTypes2.default.oneOf(allViews));

var isView = exports.isView = function isView(props, propName, componentName) {
  var view = props[propName];
  var views = props.views;

  var allowedViews = views || allViews;

  if (allowedViews.indexOf(view) === -1) {
    return new Error('Warning: Failed prop type: Invalid prop `' + propName + '` of value `' + view + '` supplied to `' + componentName + '`, expected one of [' + ['a', 'b', 'c', 'd', 'e'].map(function (a) {
      return '"' + a + '"';
    }).join(', ') + '].');
  }

  // Everything is fine
  return null;
};

isView.isRequired = function (props, propName, componentName) {
  var view = props[propName];
  if (!view) {
    return new Error('Warning: Failed prop type: The prop `' + propName + '` is marked as required in `' + componentName + '`, but its value is `' + view + '`.');
  }
  return isView(props, propName, componentName);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/* Simple getters - getting a property of a given point in time */

var getYear = exports.getYear = function getYear(date) {
  if (date instanceof Date) {
    return date.getFullYear();
  }

  if (typeof date === 'number') {
    return date;
  }

  var year = parseInt(date, 10);

  if (typeof date === 'string' && !isNaN(year)) {
    return year;
  }

  throw new Error('Failed to get year from date: ' + date + '.');
};

var getMonthIndex = exports.getMonthIndex = function getMonthIndex(date) {
  return date.getMonth();
};

var getDay = exports.getDay = function getDay(date) {
  return date.getDate();
};

var getDayOfWeek = exports.getDayOfWeek = function getDayOfWeek(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ISO 8601';

  var weekday = date.getDay();

  switch (calendarType) {
    case 'ISO 8601':
      // Shifts days of the week so that Monday is 0, Sunday is 6
      return (weekday + 6) % 7;
    case 'US':
      return weekday;
    default:
      throw new Error('Unsupported calendar type.');
  }
};

/* Complex getters - getting a property somehow related to a given point in time */

var getBeginOfCenturyYear = exports.getBeginOfCenturyYear = function getBeginOfCenturyYear(date) {
  var year = getYear(date) - 1;
  return year + -year % 100 + 1;
};

var getBeginOfCentury = exports.getBeginOfCentury = function getBeginOfCentury(date) {
  var beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear, 0, 1);
};

var getEndOfCentury = exports.getEndOfCentury = function getEndOfCentury(date) {
  var beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear + 100, 0, 1, 0, 0, 0, -1);
};

var getCenturyRange = exports.getCenturyRange = function getCenturyRange(date) {
  return [getBeginOfCentury(date), getEndOfCentury(date)];
};

var getBeginOfPreviousCentury = exports.getBeginOfPreviousCentury = function getBeginOfPreviousCentury(date) {
  var previousCenturyYear = getYear(date) - 100;
  return getBeginOfCentury(previousCenturyYear);
};

var getEndOfPreviousCentury = exports.getEndOfPreviousCentury = function getEndOfPreviousCentury(date) {
  var previousCenturyYear = getYear(date) - 100;
  return getEndOfCentury(previousCenturyYear);
};

var getBeginOfNextCentury = exports.getBeginOfNextCentury = function getBeginOfNextCentury(date) {
  var nextCenturyYear = getYear(date) + 100;
  return getBeginOfCentury(nextCenturyYear);
};

var getBeginOfDecadeYear = exports.getBeginOfDecadeYear = function getBeginOfDecadeYear(date) {
  var year = getYear(date) - 1;
  return year + -year % 10 + 1;
};

var getBeginOfDecade = exports.getBeginOfDecade = function getBeginOfDecade(date) {
  var beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear, 0, 1);
};

var getEndOfDecade = exports.getEndOfDecade = function getEndOfDecade(date) {
  var beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1);
};

var getDecadeRange = exports.getDecadeRange = function getDecadeRange(date) {
  return [getBeginOfDecade(date), getEndOfDecade(date)];
};

var getBeginOfPreviousDecade = exports.getBeginOfPreviousDecade = function getBeginOfPreviousDecade(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var previousDecadeYear = getBeginOfDecadeYear(date) - offset;
  return getBeginOfDecade(previousDecadeYear);
};

var getEndOfPreviousDecade = exports.getEndOfPreviousDecade = function getEndOfPreviousDecade(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var previousDecadeYear = getBeginOfDecadeYear(date) - offset;
  return getEndOfDecade(previousDecadeYear);
};

var getBeginOfNextDecade = exports.getBeginOfNextDecade = function getBeginOfNextDecade(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var nextDecadeYear = getBeginOfDecadeYear(date) + offset;
  return getBeginOfDecade(nextDecadeYear);
};

/**
 * Returns the beginning of a given year.
 *
 * @param {Date} date Date.
 */
var getBeginOfYear = exports.getBeginOfYear = function getBeginOfYear(date) {
  var year = getYear(date);
  return new Date(year, 0, 1);
};

/**
 * Returns the end of a given year.
 *
 * @param {Date} date Date.
 */
var getEndOfYear = exports.getEndOfYear = function getEndOfYear(date) {
  var year = getYear(date);
  return new Date(year + 1, 0, 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given year.
 *
 * @param {Date} date Date.
 */
var getYearRange = exports.getYearRange = function getYearRange(date) {
  return [getBeginOfYear(date), getEndOfYear(date)];
};

var getBeginOfPreviousYear = exports.getBeginOfPreviousYear = function getBeginOfPreviousYear(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var previousYear = getYear(date) - offset;
  return getBeginOfYear(previousYear);
};

var getEndOfPreviousYear = exports.getEndOfPreviousYear = function getEndOfPreviousYear(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var previousYear = getYear(date) - offset;
  return getEndOfYear(previousYear);
};

var getBeginOfNextYear = exports.getBeginOfNextYear = function getBeginOfNextYear(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var nextYear = getYear(date) + offset;
  return getBeginOfYear(nextYear);
};

/**
 * Returns the beginning of a given month.
 *
 * @param {Date} date Date.
 */
var getBeginOfMonth = exports.getBeginOfMonth = function getBeginOfMonth(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex, 1);
};

/**
 * Returns the end of a given month.
 *
 * @param {Date} date Date.
 */
var getEndOfMonth = exports.getEndOfMonth = function getEndOfMonth(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);
};

/**
 * Returns the beginning of a given week.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
var getBeginOfWeek = exports.getBeginOfWeek = function getBeginOfWeek(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ISO 8601';

  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  var day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
};

/**
 * Returns an array with the beginning and the end of a given month.
 *
 * @param {Date} date Date.
 */
var getMonthRange = exports.getMonthRange = function getMonthRange(date) {
  return [getBeginOfMonth(date), getEndOfMonth(date)];
};

var getBeginOfPreviousMonth = exports.getBeginOfPreviousMonth = function getBeginOfPreviousMonth(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = getYear(date);
  var previousMonthIndex = getMonthIndex(date) - offset;
  return getBeginOfMonth(new Date(year, previousMonthIndex, 1));
};

var getEndOfPreviousMonth = exports.getEndOfPreviousMonth = function getEndOfPreviousMonth(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = getYear(date);
  var previousMonthIndex = getMonthIndex(date) - offset;
  return getEndOfMonth(new Date(year, previousMonthIndex, 1));
};

var getBeginOfNextMonth = exports.getBeginOfNextMonth = function getBeginOfNextMonth(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = getYear(date);
  var nextMonthIndex = getMonthIndex(date) + offset;
  return getBeginOfMonth(new Date(year, nextMonthIndex, 1));
};

var getBeginOfDay = exports.getBeginOfDay = function getBeginOfDay(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  var day = getDay(date);
  return new Date(year, monthIndex, day);
};

var getEndOfDay = exports.getEndOfDay = function getEndOfDay(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  var day = getDay(date);
  return new Date(year, monthIndex, day + 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given day.
 *
 * @param {Date} date Date.
 */
var getDayRange = exports.getDayRange = function getDayRange(date) {
  return [getBeginOfDay(date), getEndOfDay(date)];
};

/**
 * Gets week number according to ISO 8601 or US standard.
 * In ISO 8601 week 1 is the one with January 4.
 * In US calendar week 1 is the one with January 1.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
var getWeekNumber = exports.getWeekNumber = function getWeekNumber(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ISO 8601';

  var year = getYear(date) + 1;
  var dayInWeekOne = void 0;
  var beginOfFirstWeek = void 0;

  // Look for the first week one that does not come after a given date
  do {
    dayInWeekOne = new Date(year, 0, calendarType === 'ISO 8601' ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
    year -= 1;
  } while (date - beginOfFirstWeek < 0);

  return Math.floor((date - beginOfFirstWeek) / (8.64e7 * 7)) + 1;
};

/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
var getRange = exports.getRange = function getRange(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getCenturyRange(date);
    case 'decade':
      return getDecadeRange(date);
    case 'year':
      return getYearRange(date);
    case 'month':
      return getMonthRange(date);
    case 'day':
      return getDayRange(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

/**
 * Returns the beginning of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
var getBegin = exports.getBegin = function getBegin(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getBeginOfCentury(date);
    case 'decade':
      return getBeginOfDecade(date);
    case 'year':
      return getBeginOfYear(date);
    case 'month':
      return getBeginOfMonth(date);
    case 'day':
      return getBeginOfDay(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginPrevious = exports.getBeginPrevious = function getBeginPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getBeginOfPreviousCentury(date);
    case 'decade':
      return getBeginOfPreviousDecade(date);
    case 'year':
      return getBeginOfPreviousYear(date);
    case 'month':
      return getBeginOfPreviousMonth(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginNext = exports.getBeginNext = function getBeginNext(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getBeginOfNextCentury(date);
    case 'decade':
      return getBeginOfNextDecade(date);
    case 'year':
      return getBeginOfNextYear(date);
    case 'month':
      return getBeginOfNextMonth(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginPrevious2 = exports.getBeginPrevious2 = function getBeginPrevious2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getBeginOfPreviousDecade(date, 100);
    case 'year':
      return getBeginOfPreviousYear(date, 10);
    case 'month':
      return getBeginOfPreviousMonth(date, 12);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginNext2 = exports.getBeginNext2 = function getBeginNext2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getBeginOfNextDecade(date, 100);
    case 'year':
      return getBeginOfNextYear(date, 10);
    case 'month':
      return getBeginOfNextMonth(date, 12);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

/**
 * Returns the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
var getEnd = exports.getEnd = function getEnd(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getEndOfCentury(date);
    case 'decade':
      return getEndOfDecade(date);
    case 'year':
      return getEndOfYear(date);
    case 'month':
      return getEndOfMonth(date);
    case 'day':
      return getEndOfDay(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getEndPrevious = exports.getEndPrevious = function getEndPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getEndOfPreviousCentury(date);
    case 'decade':
      return getEndOfPreviousDecade(date);
    case 'year':
      return getEndOfPreviousYear(date);
    case 'month':
      return getEndOfPreviousMonth(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getEndPrevious2 = exports.getEndPrevious2 = function getEndPrevious2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getEndOfPreviousDecade(date, 100);
    case 'year':
      return getEndOfPreviousYear(date, 10);
    case 'month':
      return getEndOfPreviousMonth(date, 12);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date.
 */
var getDaysInMonth = exports.getDaysInMonth = function getDaysInMonth(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 0).getDate();
};

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
var getCenturyLabel = exports.getCenturyLabel = function getCenturyLabel(date) {
  var _getCenturyRange = getCenturyRange(date),
      _getCenturyRange2 = _slicedToArray(_getCenturyRange, 2),
      start = _getCenturyRange2[0],
      end = _getCenturyRange2[1];

  var startLabel = getYear(start);
  var endLabel = getYear(end);
  return startLabel + " \u2013 " + endLabel;
};

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
var getDecadeLabel = exports.getDecadeLabel = function getDecadeLabel(date) {
  var _getDecadeRange = getDecadeRange(date),
      _getDecadeRange2 = _slicedToArray(_getDecadeRange, 2),
      start = _getDecadeRange2[0],
      end = _getDecadeRange2[1];

  var startLabel = getYear(start);
  var endLabel = getYear(end);
  return startLabel + " \u2013 " + endLabel;
};

/**
 * Returns a boolean determining whether a given date is on Saturday or Sunday.
 * @param {Date} date Date.
 */
var isWeekend = exports.isWeekend = function isWeekend(date) {
  var weekday = getDayOfWeek(date);
  return weekday >= 5;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.urls = exports.Api = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorizationData = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = exports.Api = function () {
    function Api() {
        _classCallCheck(this, Api);
    }

    _createClass(Api, null, [{
        key: 'get',
        value: function get(url) {
            var init = initGET();

            return fetch(url, init).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            var init = initPOST(data);

            return fetch(url, init).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'postFormData',
        value: function postFormData(url, data) {
            var authorizationData = _authorizationData.AuthorizationData.get();
            var token = authorizationData.token;

            var formData = new FormData();

            for (var name in data) {
                formData.append(name, data[name]);
            }

            var init = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            };

            return fetch(url, init).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'token',
        value: function token(data, onComplete) {
            var init = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch(urls.token, init).then(checkStatus).then(function (res) {
                return res.json();
            }).then(function (res) {
                return onComplete(res);
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }]);

    return Api;
}();

var urls = exports.urls = {
    token: '/api/token',
    lecturers: '/api/lecturers',
    specialities: '/api/specialities',
    courses: '/api/courses',
    guides: '/api/guides'
};

var checkStatus = function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    var error = new Error(response.statusText);
    error.response = response;
    throw error;
};

function initGET() {
    var init = {
        method: 'GET',
        headers: headers()
    };

    return init;
}

function initPOST(data) {
    var init = {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    };

    return init;
}

var headers = function headers() {
    var authorizationData = _authorizationData.AuthorizationData.get();
    var token = authorizationData.token;

    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var toPercent = function toPercent(num) {
  return Math.floor(100 * num) / 100 + '%';
};

var Flex = function Flex(_ref) {
  var children = _ref.children,
      className = _ref.className,
      count = _ref.count,
      offset = _ref.offset,
      wrap = _ref.wrap;
  return _react2.default.createElement('div', {
    className: className,
    style: {
      display: 'flex',
      flexWrap: wrap ? 'wrap' : 'no-wrap'
    }
  }, _react2.default.Children.map(children, function (child, index) {
    return _react2.default.createElement('div', {
      style: _extends({
        display: 'flex',
        flexBasis: toPercent(100 / count),
        overflow: 'hidden'
      }, offset && index === 0 && {
        marginLeft: toPercent(100 * offset / count)
      })
    }, child);
  }));
};

Flex.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  count: _propTypes2.default.number.isRequired,
  offset: _propTypes2.default.number,
  wrap: _propTypes2.default.bool
};

exports.default = Flex;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTileActivityFlags = exports.doRangesOverlap = exports.isRangeWithinRange = exports.isValueWithinRange = exports.mergeFunctions = undefined;

var _dates = __webpack_require__(3);

/**
 * Returns a function that, when called, calls all the functions
 * passed to it, applying its arguments to them.
 *
 * @param {Function[]} functions
 */
var mergeFunctions = exports.mergeFunctions = function mergeFunctions() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return functions.filter(function (f) {
      return f;
    }).forEach(function (f) {
      return f.apply(undefined, args);
    });
  };
};

var isValueWithinRange = exports.isValueWithinRange = function isValueWithinRange(value, range) {
  return range[0].getTime() <= value.getTime() && range[1].getTime() >= value.getTime();
};

var isRangeWithinRange = exports.isRangeWithinRange = function isRangeWithinRange(greaterRange, smallerRange) {
  return greaterRange[0].getTime() <= smallerRange[0].getTime() && greaterRange[1].getTime() >= smallerRange[1].getTime();
};

var doRangesOverlap = exports.doRangesOverlap = function doRangesOverlap(range1, range2) {
  return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
};

var getTileActivityFlags = exports.getTileActivityFlags = function getTileActivityFlags(value, valueType, date, dateType) {
  var flags = {};
  if (!value) {
    flags.active = false;
    flags.hasActive = false;
    return flags;
  }

  if (!date || !(value instanceof Array) && !valueType || !(date instanceof Array) && !dateType) {
    throw new Error('getTileActivityFlags(): Unable to get tile activity flags because one or more required arguments were not passed.');
  }

  var valueRange = value instanceof Array ? value : (0, _dates.getRange)(valueType, value);
  var dateRange = date instanceof Array ? date : (0, _dates.getRange)(dateType, date);

  flags.active = isRangeWithinRange(valueRange, dateRange);
  flags.hasActive = flags.active ? false : doRangesOverlap(valueRange, dateRange);

  return flags;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = vendor_ac72bc7fe6466d1757be;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(7))(116);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(30);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = exports.getLocale = exports.getDefaultLocale = exports.getDefaultLocales = undefined;

var _lodash = __webpack_require__(61);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var userLocale = null;

var getDefaultLocales = exports.getDefaultLocales = (0, _lodash2.default)(function () {
  var languageList = [];

  if (window.navigator.languages) {
    languageList.push.apply(languageList, _toConsumableArray(window.navigator.languages));
  } else if (window.navigator.userLanguage) {
    languageList.push(window.navigator.userLanguage);
  }

  languageList.push('en-GB'); // Fallback

  return languageList;
});

var getDefaultLocale = exports.getDefaultLocale = (0, _lodash2.default)(function () {
  return getDefaultLocales()[0];
});

var getLocale = exports.getLocale = function getLocale() {
  return userLocale || getDefaultLocale();
};

var setLocale = exports.setLocale = function setLocale(locale) {
  userLocale = locale;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(7))(202);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatShortWeekday = exports.formatMonth = exports.formatMonthYear = exports.formatDate = undefined;

var _locales = __webpack_require__(11);

var formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
var getFormatter = function getFormatter(options) {
  var locales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _locales.getLocale)();

  var stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locales]) {
    formatterCache[locales] = {};
  }

  if (!formatterCache[locales][stringifiedOptions]) {
    formatterCache[locales][stringifiedOptions] = new Intl.DateTimeFormat(locales, options).format;
  }

  return formatterCache[locales][stringifiedOptions];
};

var formatDate = exports.formatDate = function formatDate(date) {
  return getFormatter({ day: 'numeric', month: 'numeric', year: 'numeric' })(date);
};

var formatMonthYear = exports.formatMonthYear = function formatMonthYear(date) {
  return getFormatter({ month: 'long', year: 'numeric' })(date);
};

var formatMonth = exports.formatMonth = function formatMonth(date) {
  return getFormatter({ month: 'long' })(date);
};

var formatShortWeekday = exports.formatShortWeekday = function formatShortWeekday(date) {
  return getFormatter({ weekday: 'short' })(date);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var authorizationKey = 'authorization';

var AuthorizationData = exports.AuthorizationData = function () {
    function AuthorizationData() {
        _classCallCheck(this, AuthorizationData);
    }

    _createClass(AuthorizationData, null, [{
        key: 'any',
        value: function any() {
            var authorization = localStorage.getItem(authorizationKey);
            return authorization != null ? true : false;
        }
    }, {
        key: 'get',
        value: function get() {
            var json = localStorage.getItem(authorizationKey);
            var authorizationData = JSON.parse(json);

            return authorizationData;
        }
    }, {
        key: 'save',
        value: function save(data) {
            var json = JSON.stringify(data);
            localStorage.setItem(authorizationKey, json);
        }
    }, {
        key: 'clear',
        value: function clear() {
            localStorage.clear();
        }
    }]);

    return AuthorizationData;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);

var FileInput = React.createClass({
  displayName: 'FileInput',

  getInitialState: function getInitialState() {
    return {
      value: '',
      styles: {
        parent: {
          position: 'relative'
        },
        file: {
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          width: '100%',
          zIndex: 1
        },
        text: {
          position: 'relative',
          zIndex: -1
        }
      }
    };
  },

  handleChange: function handleChange(e) {
    this.setState({
      value: e.target.value.split(/(\\|\/)/g).pop()
    });
    if (this.props.onChange) this.props.onChange(e);
  },

  render: function render() {
    return React.DOM.div({
      style: this.state.styles.parent
    },

    // Actual file input
    React.DOM.input({
      type: 'file',
      name: this.props.name,
      className: this.props.className,
      onChange: this.handleChange,
      disabled: this.props.disabled,
      accept: this.props.accept,
      style: this.state.styles.file
    }),

    // Emulated file input
    React.DOM.input({
      type: 'text',
      tabIndex: -1,
      name: this.props.name + '_filename',
      value: this.state.value,
      className: this.props.className,
      onChange: function onChange() {},
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      style: this.state.styles.text
    }));
  }
});

module.exports = FileInput;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = __webpack_require__(48);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DEFAULT_PLACEHOLDER_STRING = 'Select...';

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      selected: props.value || {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: ''
      },
      isOpen: false
    };
    _this.mounted = true;
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.fireChangeEvent = _this.fireChangeEvent.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.value && newProps.value !== this.state.selected) {
        this.setState({ selected: newProps.value });
      } else if (!newProps.value) {
        this.setState({ selected: {
            label: newProps.placeholder || DEFAULT_PLACEHOLDER_STRING,
            value: ''
          } });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      if (this.props.onFocus && typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.state.isOpen);
      }
      if (event.type === 'mousedown' && event.button !== 0) return;
      event.stopPropagation();
      event.preventDefault();

      if (!this.props.disabled) {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, label) {
      var newState = {
        selected: {
          value: value,
          label: label
        },
        isOpen: false
      };
      this.fireChangeEvent(newState);
      this.setState(newState);
    }
  }, {
    key: 'fireChangeEvent',
    value: function fireChangeEvent(newState) {
      if (newState.selected !== this.state.selected && this.props.onChange) {
        this.props.onChange(newState.selected);
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option) {
      var _classNames;

      var optionClass = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.props.baseClassName + '-option', true), _defineProperty(_classNames, 'is-selected', option === this.state.selected), _classNames));

      var value = option.value || option.label || option;
      var label = option.label || option.value || option;

      return _react2.default.createElement('div', {
        key: value,
        className: optionClass,
        onMouseDown: this.setValue.bind(this, value, label),
        onClick: this.setValue.bind(this, value, label) }, label);
    }
  }, {
    key: 'buildMenu',
    value: function buildMenu() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          baseClassName = _props.baseClassName;

      var ops = options.map(function (option) {
        if (option.type === 'group') {
          var groupTitle = _react2.default.createElement('div', { className: baseClassName + '-title' }, option.name);
          var _options = option.items.map(function (item) {
            return _this2.renderOption(item);
          });

          return _react2.default.createElement('div', { className: baseClassName + '-group', key: option.name }, groupTitle, _options);
        } else {
          return _this2.renderOption(option);
        }
      });

      return ops.length ? ops : _react2.default.createElement('div', { className: baseClassName + '-noresults' }, 'No options found');
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(event) {
      if (this.mounted) {
        if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
          if (this.state.isOpen) {
            this.setState({ isOpen: false });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames2;

      var _props2 = this.props,
          baseClassName = _props2.baseClassName,
          className = _props2.className;

      var disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
      var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
      var value = _react2.default.createElement('div', { className: baseClassName + '-placeholder' }, placeHolderValue);
      var menu = this.state.isOpen ? _react2.default.createElement('div', { className: baseClassName + '-menu' }, this.buildMenu()) : null;

      var dropdownClass = (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, className, true), _defineProperty(_classNames2, baseClassName + '-root', true), _defineProperty(_classNames2, 'is-open', this.state.isOpen), _classNames2));

      return _react2.default.createElement('div', { className: dropdownClass }, _react2.default.createElement('div', { className: baseClassName + '-control ' + disabledClass, onMouseDown: this.handleMouseDown.bind(this), onTouchEnd: this.handleMouseDown.bind(this) }, value, _react2.default.createElement('span', { className: baseClassName + '-arrow' })), menu);
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
exports.default = Dropdown;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var mergeClassNames = function mergeClassNames() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (classList, arg) {
    return typeof arg === 'string' || arg instanceof Array ? classList.concat(arg) : classList;
  }, []).filter(function (className) {
    return className;
  }).join(' ');
};

exports.default = mergeClassNames;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Decades = __webpack_require__(62);

var _Decades2 = _interopRequireDefault(_Decades);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CenturyView = function (_Component) {
  _inherits(CenturyView, _Component);

  function CenturyView() {
    _classCallCheck(this, CenturyView);

    return _possibleConstructorReturn(this, (CenturyView.__proto__ || Object.getPrototypeOf(CenturyView)).apply(this, arguments));
  }

  _createClass(CenturyView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setView = this.props.setView;

      if (setView) setView('century');
    }
  }, {
    key: 'renderDecades',
    value: function renderDecades() {
      var _props = this.props,
          setView = _props.setView,
          childProps = _objectWithoutProperties(_props, ['setView']);

      return _react2.default.createElement(_Decades2.default, childProps);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'react-calendar__century-view' }, this.renderDecades());
    }
  }]);

  return CenturyView;
}(_react.Component);

exports.default = CenturyView;

CenturyView.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Years = __webpack_require__(64);

var _Years2 = _interopRequireDefault(_Years);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DecadeView = function (_Component) {
  _inherits(DecadeView, _Component);

  function DecadeView() {
    _classCallCheck(this, DecadeView);

    return _possibleConstructorReturn(this, (DecadeView.__proto__ || Object.getPrototypeOf(DecadeView)).apply(this, arguments));
  }

  _createClass(DecadeView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setView = this.props.setView;

      if (setView) setView('decade');
    }
  }, {
    key: 'renderYears',
    value: function renderYears() {
      var _props = this.props,
          setView = _props.setView,
          childProps = _objectWithoutProperties(_props, ['setView']);

      return _react2.default.createElement(_Years2.default, childProps);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'react-calendar__decade-view' }, this.renderYears());
    }
  }]);

  return DecadeView;
}(_react.Component);

exports.default = DecadeView;

DecadeView.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Months = __webpack_require__(66);

var _Months2 = _interopRequireDefault(_Months);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var YearView = function (_Component) {
  _inherits(YearView, _Component);

  function YearView() {
    _classCallCheck(this, YearView);

    return _possibleConstructorReturn(this, (YearView.__proto__ || Object.getPrototypeOf(YearView)).apply(this, arguments));
  }

  _createClass(YearView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setView = this.props.setView;

      if (setView) setView('year');
    }
  }, {
    key: 'renderMonths',
    value: function renderMonths() {
      var _props = this.props,
          setView = _props.setView,
          childProps = _objectWithoutProperties(_props, ['setView']);

      return _react2.default.createElement(_Months2.default, childProps);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'react-calendar__year-view' }, this.renderMonths());
    }
  }]);

  return YearView;
}(_react.Component);

exports.default = YearView;

YearView.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Days = __webpack_require__(68);

var _Days2 = _interopRequireDefault(_Days);

var _Weekdays = __webpack_require__(70);

var _Weekdays2 = _interopRequireDefault(_Weekdays);

var _WeekNumbers = __webpack_require__(71);

var _WeekNumbers2 = _interopRequireDefault(_WeekNumbers);

var _locales = __webpack_require__(11);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MonthView = function (_Component) {
  _inherits(MonthView, _Component);

  function MonthView() {
    _classCallCheck(this, MonthView);

    return _possibleConstructorReturn(this, (MonthView.__proto__ || Object.getPrototypeOf(MonthView)).apply(this, arguments));
  }

  _createClass(MonthView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setView = this.props.setView;

      if (setView) setView('month');
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var calendarType = this.calendarType;
      var activeStartDate = this.props.activeStartDate;

      return _react2.default.createElement(_Weekdays2.default, {
        calendarType: calendarType,
        month: activeStartDate
      });
    }
  }, {
    key: 'renderWeekNumbers',
    value: function renderWeekNumbers() {
      var showWeekNumbers = this.props.showWeekNumbers;

      if (!showWeekNumbers) {
        return null;
      }

      var calendarType = this.calendarType;
      var activeStartDate = this.props.activeStartDate;

      return _react2.default.createElement(_WeekNumbers2.default, {
        activeStartDate: activeStartDate,
        calendarType: calendarType
      });
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _props = this.props,
          setView = _props.setView,
          calendarType = _props.calendarType,
          childProps = _objectWithoutProperties(_props, ['setView', 'calendarType']);

      return _react2.default.createElement(_Days2.default, _extends({
        calendarType: this.calendarType
      }, childProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var showWeekNumbers = this.props.showWeekNumbers;

      var className = 'react-calendar__month-view';

      return _react2.default.createElement('div', {
        className: [className, showWeekNumbers ? className + '--weekNumbers' : ''].join(' ')
      }, _react2.default.createElement('div', { style: { display: 'flex', alignItems: 'flex-end' } }, this.renderWeekNumbers(), _react2.default.createElement('div', { style: { flexGrow: 1 } }, this.renderWeekdays(), this.renderDays())));
    }
  }, {
    key: 'calendarType',
    get: function get() {
      var calendarType = this.props.calendarType;

      if (calendarType) {
        return calendarType;
      }

      switch ((0, _locales.getLocale)()) {
        case 'en-US':
          return 'US';
        default:
          return 'ISO 8601';
      }
    }
  }]);

  return MonthView;
}(_react.Component);

exports.default = MonthView;

MonthView.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarType: _propTypes3.isCalendarType,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  setActiveRange: _propTypes2.default.func,
  setView: _propTypes2.default.func,
  showNeighboringMonth: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = exports.getLocale = undefined;

var _locales = __webpack_require__(11);

exports.getLocale = _locales.getLocale;
exports.setLocale = _locales.setLocale;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValue = exports.isMinDate = exports.isMaxDate = exports.isCalendarType = undefined;

var _propTypes = __webpack_require__(2);

exports.isCalendarType = _propTypes.isCalendarType;
exports.isMaxDate = _propTypes.isMaxDate;
exports.isMinDate = _propTypes.isMinDate;
exports.isValue = _propTypes.isValue;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(8);

var _reactRouterDom = __webpack_require__(12);

var _Authentication = __webpack_require__(26);

var _Routes = __webpack_require__(31);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var AuthenticationComponent = (0, _Authentication.Authentication)(_Routes.Routes);

var root = document.getElementById('root');
(0, _reactDom.render)(React.createElement(
  _reactRouterDom.BrowserRouter,
  null,
  React.createElement(AuthenticationComponent, null)
), root);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Authentication = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _Login = __webpack_require__(27);

var _authorizationData = __webpack_require__(14);

var _api = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Authentication = exports.Authentication = function Authentication(WrappedComponent) {
    return function (_React$Component) {
        _inherits(WithAuthentication, _React$Component);

        function WithAuthentication(props) {
            _classCallCheck(this, WithAuthentication);

            var _this = _possibleConstructorReturn(this, (WithAuthentication.__proto__ || Object.getPrototypeOf(WithAuthentication)).call(this, props));

            _this.state = {
                userRole: '',
                token: ''
            };
            return _this;
        }

        _createClass(WithAuthentication, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.update();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var renderedComponent = this.state.userRole ? React.createElement(WrappedComponent, {
                    userRole: this.state.userRole,
                    get: function get(url, callback) {
                        return _this2.get(url, callback);
                    },
                    post: function post(url, data, callback) {
                        return _this2.post(url, data, callback);
                    },
                    postFormData: function postFormData(url, data, callback) {
                        return _this2.postFormData(url, data, callback);
                    },
                    onLogout: function onLogout() {
                        _authorizationData.AuthorizationData.clear();
                        _this2.update();
                    }
                }) : React.createElement(_Login.Login, {
                    onLoginSuccess: function onLoginSuccess(data) {
                        _authorizationData.AuthorizationData.save(data);
                        _this2.update();
                    }
                });

                return renderedComponent;
            }
        }, {
            key: 'get',
            value: function get(url, callback) {
                var _this3 = this;

                _api.Api.get(url).then(function (response) {
                    return _this3.checkUnauthorized(response);
                }).then(function (result) {
                    if (!result.isAuthOk) {
                        _authorizationData.AuthorizationData.clear();
                        _this3.update();
                    } else if (result.exception) {
                        console.error(result.response);
                    } else {
                        result.response.json().then(function (r) {
                            return callback(r);
                        });
                    }
                });
            }
        }, {
            key: 'postFormData',
            value: function postFormData(url, data, callback) {
                var _this4 = this;

                _api.Api.postFormData(url, data).then(function (response) {
                    return _this4.checkUnauthorized(response);
                }).then(function (result) {
                    if (!result.isAuthOk) {
                        _authorizationData.AuthorizationData.clear();
                        _this4.update();
                    } else if (result.exception) {
                        console.error(result.response);
                    } else {
                        result.response.json().then(function (r) {
                            return callback(r);
                        });
                    }
                });
            }
        }, {
            key: 'post',
            value: function post(url, data, callback) {
                var _this5 = this;

                _api.Api.post(url, data).then(function (response) {
                    return _this5.checkUnauthorized(response);
                }).then(function (result) {
                    if (!result.isAuthOk) {
                        _authorizationData.AuthorizationData.clear();
                        _this5.update();
                    } else if (result.exception) {
                        console.error(result.response);
                    } else {
                        result.response.json().then(function (r) {
                            return callback(r);
                        });
                    }
                });
            }
        }, {
            key: 'put',
            value: function put(url, data, callback) {}
        }, {
            key: 'delete',
            value: function _delete(url, callback) {}
        }, {
            key: 'checkUnauthorized',
            value: function checkUnauthorized(response) {
                var result = {
                    response: response,
                    isAuthOk: response.status != 401,
                    exception: response.status != 200 && response.status != 400
                };

                return result;
            }
        }, {
            key: 'update',
            value: function update() {
                var state = {
                    userRole: '',
                    token: ''
                };

                var userLoggedIn = _authorizationData.AuthorizationData.any();
                if (userLoggedIn) {
                    var authorizationData = _authorizationData.AuthorizationData.get();
                    state.userRole = authorizationData.userRole;
                    state.token = authorizationData.token;
                }

                this.setState(state);
            }
        }]);

        return WithAuthentication;
    }(React.Component);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Login = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _api = __webpack_require__(4);

__webpack_require__(28);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = exports.Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.state = {
            email: '',
            password: '',
            error: ''
        };
        return _this;
    }

    _createClass(Login, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { className: 'login-page' },
                React.createElement(
                    'div',
                    { className: 'line-centered' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: 'title' },
                            React.createElement(
                                'p',
                                null,
                                '\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u043F\u043E\u0440\u0442\u0430\u043B \u041E\u0434\u0435\u0441\u0441\u043A\u043E\u0433\u043E'
                            ),
                            React.createElement(
                                'p',
                                null,
                                '\u043D\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0443\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442\u0430'
                            ),
                            React.createElement(
                                'p',
                                null,
                                '\u0438\u043C\u0435\u043D\u0438 \u0418. \u0418. \u041C\u0435\u0447\u043D\u0438\u043A\u043E\u0432\u0430'
                            )
                        ),
                        React.createElement('img', { src: '/images/logo.png', className: 'logo' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-box' },
                        React.createElement(
                            'p',
                            { className: 'form-title' },
                            '\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F'
                        ),
                        React.createElement(
                            'form',
                            null,
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'email', className: 'form-label' },
                                    '\u0412\u0430\u0448\u0430 \u043F\u043E\u0447\u0442\u0430 :'
                                ),
                                React.createElement('input', { id: 'email', type: 'email', name: 'email', className: 'form-input', value: this.state.email, onChange: function onChange(e) {
                                        return _this2.setState({ email: e.target.value });
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'password', className: 'form-label' },
                                    '\u0412\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C :'
                                ),
                                React.createElement('input', { id: 'password', type: 'password', name: 'password', className: 'form-input', value: this.state.password, onChange: function onChange(e) {
                                        return _this2.setState({ password: e.target.value });
                                    } })
                            ),
                            React.createElement(
                                'button',
                                { type: 'submit', className: 'submit-btn', onClick: function onClick(e) {
                                        e.preventDefault();_this2.sendForm();
                                    } },
                                '\u0412\u043E\u0439\u0442\u0438'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'extra-info' },
                            React.createElement(
                                'a',
                                { className: 'forgot-password', href: '#' },
                                '\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?'
                            ),
                            this.state.error && React.createElement(
                                'div',
                                { className: 'login-error' },
                                this.state.error
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'sendForm',
        value: function sendForm() {
            var _this3 = this;

            var response = _api.Api.token(this.state, function (response) {
                if (response.success) {
                    _this3.props.onLoginSuccess(response.data);
                } else {
                    _this3.setState({
                        error: 'Неверно введена почта или пароль'
                    });
                }
            });
        }
    }]);

    return Login;
}(React.Component);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./login.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./login.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, "/*colors*/\n/*colors end*/\n.login-page {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  min-height: 100%; }\n  .login-page .line-centered {\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    width: 100%;\n    height: 280px;\n    background-color: #0a1944; }\n    .login-page .line-centered .title {\n      font-size: 36px;\n      text-align: center;\n      color: #ffffff;\n      line-height: 0.2; }\n    .login-page .line-centered .form-box {\n      background-color: white;\n      padding: 40px 20px;\n      text-align: center; }\n      .login-page .line-centered .form-box .form-title {\n        font-size: 48px;\n        color: #010000;\n        margin: 0; }\n      .login-page .line-centered .form-box .form-group {\n        margin: 40px 0; }\n        .login-page .line-centered .form-box .form-group .form-label {\n          font-size: 30px;\n          margin-right: 15px; }\n        .login-page .line-centered .form-box .form-group .form-input {\n          border: none;\n          border-bottom: solid 1px black;\n          font-size: 24px;\n          text-align: center;\n          width: 260px; }\n          .login-page .line-centered .form-box .form-group .form-input:focus {\n            outline: none; }\n      .login-page .line-centered .form-box .submit-btn {\n        border-radius: 10px;\n        background-color: #0a1944;\n        border: none;\n        color: white;\n        font-size: 30px;\n        padding: 10px 50px; }\n        .login-page .line-centered .form-box .submit-btn:focus {\n          outline: none; }\n      .login-page .line-centered .form-box .extra-info {\n        margin-top: 15px; }\n        .login-page .line-centered .form-box .extra-info .forgot-password {\n          font-size: 24px;\n          font-style: italic;\n          text-align: center;\n          color: #3c4f6d; }\n        .login-page .line-centered .form-box .extra-info .login-error {\n          margin-top: 20px;\n          font-size: 22px;\n          font-style: italic;\n          color: #ef2626; }\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Routes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _reactRouterDom = __webpack_require__(12);

var _Layout = __webpack_require__(32);

var _NotFound = __webpack_require__(34);

var _Authorization = __webpack_require__(35);

var _Home = __webpack_require__(36);

var _LecturerList = __webpack_require__(37);

var _SpecialityList = __webpack_require__(41);

var _Home2 = __webpack_require__(44);

var _CourseList = __webpack_require__(45);

var _GuideList = __webpack_require__(50);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var adminRole = 'Admin';
var lecturerRole = 'Lecturer';

var AdminAuthorization = (0, _Authorization.Authorization)([adminRole]);
var LecturerAuthorization = (0, _Authorization.Authorization)([lecturerRole]);

var Routes = exports.Routes = function (_React$Component) {
    _inherits(Routes, _React$Component);

    function Routes(props) {
        _classCallCheck(this, Routes);

        return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).call(this, props));
    }

    _createClass(Routes, [{
        key: 'render',
        value: function render() {
            var userRole = this.props.userRole;
            var routes = void 0;
            var links = void 0;

            if (this.props.userRole == adminRole) {
                links = [{
                    title: 'Домашняя страница',
                    to: '/'
                }, {
                    title: 'Преподаватели',
                    to: '/lecturers'
                }, {
                    title: 'Специальности',
                    to: '/specialities'
                }];
                routes = React.createElement(
                    _reactRouterDom.Switch,
                    null,
                    React.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: AdminAuthorization(_Home.AdminHome, this.props) }),
                    React.createElement(_reactRouterDom.Route, { path: '/lecturers', component: AdminAuthorization(_LecturerList.LecturerList, this.props) }),
                    React.createElement(_reactRouterDom.Route, { path: '/specialities', component: AdminAuthorization(_SpecialityList.SpecialityList, this.props) }),
                    React.createElement(_reactRouterDom.Route, { path: '/', component: _NotFound.NotFound })
                );
            } else if (this.props.userRole == lecturerRole) {
                links = [{
                    title: 'Домашняя страница',
                    to: '/'
                }, {
                    title: 'Курсы',
                    to: '/courses'
                }, {
                    title: 'Методички',
                    to: '/guides'
                }];
                routes = React.createElement(
                    _reactRouterDom.Switch,
                    null,
                    React.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: LecturerAuthorization(_Home2.LecturerHome, this.props) }),
                    React.createElement(_reactRouterDom.Route, { exact: true, path: '/courses', component: LecturerAuthorization(_CourseList.CourseList, this.props) }),
                    React.createElement(_reactRouterDom.Route, { exact: true, path: '/guides', component: LecturerAuthorization(_GuideList.GuideList, this.props) }),
                    React.createElement(_reactRouterDom.Route, { path: '/', component: _NotFound.NotFound })
                );
            }

            return React.createElement(
                _Layout.Layout,
                _extends({ allowedLinks: links }, this.props),
                routes
            );
        }
    }]);

    return Routes;
}(React.Component);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Layout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _NavMenu = __webpack_require__(33);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = exports.Layout = function (_React$Component) {
    _inherits(Layout, _React$Component);

    function Layout(props) {
        _classCallCheck(this, Layout);

        return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));
    }

    _createClass(Layout, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(_NavMenu.NavMenu, this.props)
                ),
                React.createElement(
                    'div',
                    null,
                    this.props.children
                )
            );
        }
    }]);

    return Layout;
}(React.Component);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _reactRouterDom = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavMenu = exports.NavMenu = function (_React$Component) {
    _inherits(NavMenu, _React$Component);

    function NavMenu(props) {
        _classCallCheck(this, NavMenu);

        return _possibleConstructorReturn(this, (NavMenu.__proto__ || Object.getPrototypeOf(NavMenu)).call(this, props));
    }

    _createClass(NavMenu, [{
        key: 'render',
        value: function render() {
            var _this = this;
            return React.createElement(
                'div',
                null,
                this.props.allowedLinks.map(function (link, index) {
                    return React.createElement(
                        'div',
                        { key: index },
                        React.createElement(
                            _reactRouterDom.NavLink,
                            { to: link.to },
                            link.title
                        )
                    );
                }),
                React.createElement(
                    'button',
                    { onClick: function onClick(e) {
                            return _this.props.onLogout();
                        } },
                    'Logout'
                )
            );
        }
    }]);

    return NavMenu;
}(React.Component);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NotFound = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = exports.NotFound = function (_React$Component) {
    _inherits(NotFound, _React$Component);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    _createClass(NotFound, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'Not found!'
            );
        }
    }]);

    return NotFound;
}(React.Component);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Authorization = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Authorization = exports.Authorization = function Authorization(roles) {
    return function (WrappedComponent, props) {
        return function (_React$Component) {
            _inherits(WithAuthorization, _React$Component);

            function WithAuthorization() {
                _classCallCheck(this, WithAuthorization);

                return _possibleConstructorReturn(this, (WithAuthorization.__proto__ || Object.getPrototypeOf(WithAuthorization)).apply(this, arguments));
            }

            _createClass(WithAuthorization, [{
                key: 'render',
                value: function render() {
                    var component = roles.includes(props.userRole) ? React.createElement(WrappedComponent, props) : null;

                    return component;
                }
            }]);

            return WithAuthorization;
        }(React.Component);
    };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AdminHome = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminHome = exports.AdminHome = function (_React$Component) {
    _inherits(AdminHome, _React$Component);

    function AdminHome() {
        _classCallCheck(this, AdminHome);

        return _possibleConstructorReturn(this, (AdminHome.__proto__ || Object.getPrototypeOf(AdminHome)).apply(this, arguments));
    }

    _createClass(AdminHome, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'Admin Home'
            );
        }
    }]);

    return AdminHome;
}(React.Component);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LecturerList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _api = __webpack_require__(4);

var _LecturerItem = __webpack_require__(38);

var _LecturerForm = __webpack_require__(39);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LecturerList = exports.LecturerList = function (_React$Component) {
    _inherits(LecturerList, _React$Component);

    function LecturerList(props) {
        _classCallCheck(this, LecturerList);

        var _this2 = _possibleConstructorReturn(this, (LecturerList.__proto__ || Object.getPrototypeOf(LecturerList)).call(this, props));

        _this2.state = {
            loaded: false,
            items: [],
            errors: []
        };
        return _this2;
    }

    _createClass(LecturerList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loaded = _state.loaded,
                items = _state.items,
                errors = _state.errors;

            var render = void 0;

            if (!loaded) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...'
                );
            } else if (errors.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!'
                );
            } else if (items.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_LecturerForm.LecturerForm, { createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    items.map(function (item, index) {
                        return React.createElement(_LecturerItem.LecturerItem, { key: index, item: item });
                    })
                );
            } else {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_LecturerForm.LecturerForm, { createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    React.createElement(
                        'div',
                        null,
                        '\u041D\u0435\u0442 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0435\u0439!'
                    )
                );
            }

            return render;
        }
    }, {
        key: 'createItem',
        value: function createItem(data) {
            var _this4 = this;

            var reload = function reload() {
                return _this4.load();
            };
            this.props.postFormData(_api.urls.lecturers, data, function (result) {
                if (result.success === true) {
                    reload();
                } else {
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            this.props.get(_api.urls.lecturers, function (response) {
                if (response.success === true) {
                    _this.setState({
                        loaded: true,
                        items: response.data
                    });
                } else {
                    console.error(response.errors);
                    _this.setState({
                        loaded: true,
                        items: []
                    });
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }]);

    return LecturerList;
}(React.Component);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LecturerItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LecturerItem = exports.LecturerItem = function (_React$Component) {
    _inherits(LecturerItem, _React$Component);

    function LecturerItem(props) {
        _classCallCheck(this, LecturerItem);

        return _possibleConstructorReturn(this, (LecturerItem.__proto__ || Object.getPrototypeOf(LecturerItem)).call(this, props));
    }

    _createClass(LecturerItem, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.item.fullName
            );
        }
    }]);

    return LecturerItem;
}(React.Component);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LecturerForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _reactAvatarEditor = __webpack_require__(40);

var _reactAvatarEditor2 = _interopRequireDefault(_reactAvatarEditor);

var _reactFileInput = __webpack_require__(15);

var _reactFileInput2 = _interopRequireDefault(_reactFileInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LecturerForm = exports.LecturerForm = function (_React$Component) {
    _inherits(LecturerForm, _React$Component);

    function LecturerForm(props) {
        _classCallCheck(this, LecturerForm);

        var _this = _possibleConstructorReturn(this, (LecturerForm.__proto__ || Object.getPrototypeOf(LecturerForm)).call(this, props));

        _this.state = {
            lastName: '',
            firstName: '',
            patronymic: '',
            email: '',
            photo: '/images/lecturer.png',
            uploadedFile: false
        };
        return _this;
    }

    _createClass(LecturerForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u0424\u0430\u043C\u0438\u043B\u0438\u044F'
                    ),
                    React.createElement('input', { type: 'text', name: 'lastName', value: this.state.lastName, onChange: function onChange(e) {
                            return _this2.setState({ lastName: e.target.value });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u0418\u043C\u044F'
                    ),
                    React.createElement('input', { type: 'text', name: 'firstName', value: this.state.firstName, onChange: function onChange(e) {
                            return _this2.setState({ firstName: e.target.value });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E'
                    ),
                    React.createElement('input', { type: 'text', name: 'patronymic', value: this.state.patronymic, onChange: function onChange(e) {
                            return _this2.setState({ patronymic: e.target.value });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u041F\u043E\u0447\u0442\u0430'
                    ),
                    React.createElement('input', { type: 'email', name: 'email', value: this.state.email, onChange: function onChange(e) {
                            return _this2.setState({ email: e.target.value });
                        } })
                ),
                React.createElement(_reactAvatarEditor2.default, {
                    image: this.state.photo,
                    width: 100,
                    height: 100,
                    border: 1,
                    borderRadius: 100,
                    color: [0, 0, 0, 1]
                }),
                React.createElement(
                    'div',
                    null,
                    React.createElement(_reactFileInput2.default, {
                        name: 'photo',
                        accept: '.jpg,.png,.gif',
                        placeholder: 'Choose avatar',
                        className: 'inputClass',
                        onChange: function onChange(e) {
                            return _this2.setState({ photo: e.target.files[0], uploadedFile: true });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { type: 'submit', onClick: function onClick(e) {
                                e.preventDefault();_this2.sendForm();
                            } },
                        '\u0421\u043E\u0437\u0434\u0430\u0442\u044C'
                    )
                )
            );
        }
    }, {
        key: 'sendForm',
        value: function sendForm() {
            var validated = this.validateForm();
            if (validated) {
                var data = {
                    lastName: this.state.lastName,
                    firstName: this.state.firstName,
                    patronymic: this.state.patronymic,
                    email: this.state.email,
                    photo: this.state.photo
                };

                this.props.createItem(data);
            } else {
                // TODO
                // temp implementation
                console.log('Invalid form');
            }
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var _state = this.state,
                lastName = _state.lastName,
                firstName = _state.firstName,
                patronymic = _state.patronymic,
                email = _state.email,
                uploadedFile = _state.uploadedFile;


            var valid = true;

            if (lastName.length < 1 || lastName.length > 20) {
                valid = false;
            } else if (firstName.length < 1 || firstName.length > 20) {
                valid = false;
            } else if (patronymic.length < 1 || patronymic.length > 20) {
                valid = false;
            } else if (email.length < 1 || email.length > 254) {
                valid = false;
            } else if (!uploadedFile) {
                valid = false;
            }

            return valid;
        }
    }]);

    return LecturerForm;
}(React.Component);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t(__webpack_require__(1), __webpack_require__(0), __webpack_require__(8)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(0), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e.AvatarEditor = t(e.PropTypes, e.React, e.ReactDOM);
}(undefined, function (e, t, o) {
  "use strict";
  function a(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
  }function i(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
  }e = e && e.hasOwnProperty("default") ? e.default : e, t = t && t.hasOwnProperty("default") ? t.default : t, o = o && o.hasOwnProperty("default") ? o.default : o;var r = function r(e) {
    var t = "undefined" == typeof DOMParser ? null : new DOMParser();return t ? t.parseFromString(e, "text/html") : null;
  },
      s = function s(e, t) {
    for (var o = 0; o < e.length; o++) {
      var a = e[o];if ("text/html" === a.type) {
        a.getAsString(function (e) {
          var o = r(e).querySelector("img");o && o.src && t(o.src);
        });break;
      }
    }
  },
      h = function () {
    function e(e, t) {
      var o = [],
          a = !0,
          n = !1,
          i = void 0;try {
        for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (o.push(r.value), !t || o.length !== t); a = !0) {}
      } catch (e) {
        n = !0, i = e;
      } finally {
        try {
          !a && s.return && s.return();
        } finally {
          if (n) throw i;
        }
      }return o;
    }return function (t, o) {
      if (Array.isArray(t)) return t;if (Symbol.iterator in Object(t)) return e(t, o);throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
      u = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var o = arguments[t];for (var a in o) {
        Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a]);
      }
    }return e;
  },
      c = function () {
    function e(e, t) {
      for (var o = 0; o < t.length; o++) {
        var a = t[o];a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
      }
    }return function (t, o, a) {
      return o && e(t.prototype, o), a && e(t, a), t;
    };
  }(),
      d = !("undefined" == typeof window || "undefined" == typeof navigator || !("ontouchstart" in window || navigator.msMaxTouchPoints > 0)),
      p = "undefined" != typeof File,
      l = { touch: { react: { down: "onTouchStart", mouseDown: "onMouseDown", drag: "onTouchMove", drop: "onTouchEnd", move: "onTouchMove", mouseMove: "onMouseMove", up: "onTouchEnd", mouseUp: "onMouseUp" }, native: { down: "touchstart", mouseDown: "mousedown", drag: "touchmove", drop: "touchend", move: "touchmove", mouseMove: "mousemove", up: "touchend", mouseUp: "mouseup" } }, desktop: { react: { down: "onMouseDown", drag: "onDragOver", drop: "onDrop", move: "onMouseMove", up: "onMouseUp" }, native: { down: "mousedown", drag: "dragStart", drop: "drop", move: "mousemove", up: "mouseup" } } },
      g = d ? l.touch : l.desktop,
      m = "undefined" != typeof window && window.devicePixelRatio ? window.devicePixelRatio : 1,
      v = function v(e, t, o, a, n, i) {
    if (0 === i) e.rect(t, o, a, n);else {
      var r = a - i,
          s = n - i;e.translate(t, o), e.arc(i, i, i, Math.PI, 1.5 * Math.PI), e.lineTo(r, 0), e.arc(r, i, i, 1.5 * Math.PI, 2 * Math.PI), e.lineTo(a, s), e.arc(r, s, i, 2 * Math.PI, .5 * Math.PI), e.lineTo(i, n), e.arc(i, s, i, .5 * Math.PI, Math.PI), e.translate(-t, -o);
    }
  },
      f = function (e) {
    function r() {
      var e, t, o, i;a(this, r);for (var h = arguments.length, c = Array(h), d = 0; d < h; d++) {
        c[d] = arguments[d];
      }return t = o = n(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(c))), o.state = { drag: !1, my: null, mx: null, image: { x: .5, y: .5 } }, o.handleMouseDown = function (e) {
        (e = e || window.event).preventDefault(), o.setState({ drag: !0, mx: null, my: null });
      }, o.handleMouseUp = function () {
        o.state.drag && (o.setState({ drag: !1 }), o.props.onMouseUp());
      }, o.handleMouseMove = function (e) {
        if (e = e || window.event, !1 !== o.state.drag) {
          var t = e.targetTouches ? e.targetTouches[0].pageX : e.clientX,
              a = e.targetTouches ? e.targetTouches[0].pageY : e.clientY,
              n = { mx: t, my: a },
              i = o.props.rotate;if (i %= 360, i = i < 0 ? i + 360 : i, o.state.mx && o.state.my) {
            var r = o.state.mx - t,
                s = o.state.my - a,
                h = o.state.image.width * o.props.scale,
                c = o.state.image.height * o.props.scale,
                d = o.getCroppingRect(),
                p = d.x,
                l = d.y;p *= h, l *= c;var g = function g(e) {
              return e * (Math.PI / 180);
            },
                m = Math.cos(g(i)),
                v = Math.sin(g(i)),
                f = l + -r * v + s * m,
                y = { x: (p + r * m + s * v) / h + 1 / o.props.scale * o.getXScale() / 2, y: f / c + 1 / o.props.scale * o.getYScale() / 2 };o.props.onPositionChange(y), n.image = u({}, o.state.image, y);
          }o.setState(n), o.props.onMouseMove(e);
        }
      }, o.handleDragOver = function (e) {
        (e = e || window.event).preventDefault();
      }, o.handleDrop = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.event;if (e.stopPropagation(), e.preventDefault(), e.dataTransfer) {
          var t = e.dataTransfer,
              a = t.files,
              n = t.items;a && a.length ? (o.props.onDropFile(e), o.loadImageFile(a[0])) : n && n.length && s(n, function (e) {
            return o.loadImage(e);
          });
        }
      }, o.setCanvas = function (e) {
        o.canvas = e;
      }, i = t, n(o, i);
    }return i(r, t.Component), c(r, [{ key: "isVertical", value: function value() {
        return this.props.rotate % 180 != 0;
      } }, { key: "getBorders", value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props.border;return Array.isArray(e) ? e : [e, e];
      } }, { key: "getDimensions", value: function value() {
        var e = this.props,
            t = e.width,
            o = e.height,
            a = e.rotate,
            n = e.border,
            i = {},
            r = this.getBorders(n),
            s = h(r, 2),
            u = s[0],
            c = s[1],
            d = t,
            p = o;return this.isVertical() ? (i.width = p, i.height = d) : (i.width = d, i.height = p), i.width += 2 * u, i.height += 2 * c, { canvas: i, rotate: a, width: t, height: o, border: n };
      } }, { key: "getImage", value: function value() {
        var e = this.getCroppingRect(),
            t = this.state.image;e.x *= t.resource.width, e.y *= t.resource.height, e.width *= t.resource.width, e.height *= t.resource.height;var o = document.createElement("canvas");this.isVertical() ? (o.width = e.height, o.height = e.width) : (o.width = e.width, o.height = e.height);var a = o.getContext("2d");return a.translate(o.width / 2, o.height / 2), a.rotate(this.props.rotate * Math.PI / 180), a.translate(-o.width / 2, -o.height / 2), this.isVertical() && a.translate((o.width - o.height) / 2, (o.height - o.width) / 2), a.drawImage(t.resource, -e.x, -e.y), o;
      } }, { key: "getImageScaledToCanvas", value: function value() {
        var e = this.getDimensions(),
            t = e.width,
            o = e.height,
            a = document.createElement("canvas");return this.isVertical() ? (a.width = o, a.height = t) : (a.width = t, a.height = o), this.paintImage(a.getContext("2d"), this.state.image, 0, 1), a;
      } }, { key: "getXScale", value: function value() {
        var e = this.props.width / this.props.height,
            t = this.state.image.width / this.state.image.height;return Math.min(1, e / t);
      } }, { key: "getYScale", value: function value() {
        var e = this.props.height / this.props.width,
            t = this.state.image.height / this.state.image.width;return Math.min(1, e / t);
      } }, { key: "getCroppingRect", value: function value() {
        var e = this.props.position || { x: this.state.image.x, y: this.state.image.y },
            t = 1 / this.props.scale * this.getXScale(),
            o = 1 / this.props.scale * this.getYScale(),
            a = { x: e.x - t / 2, y: e.y - o / 2, width: t, height: o },
            n = 0,
            i = 1 - a.width,
            r = 0,
            s = 1 - a.height;return (t > 1 || o > 1) && (n = -a.width, i = 1, r = -a.height, s = 1), u({}, a, { x: Math.max(n, Math.min(a.x, i)), y: Math.max(r, Math.min(a.y, s)) });
      } }, { key: "isDataURL", value: function value(e) {
        if (null === e) return !1;var t = /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;return !!e.match(t);
      } }, { key: "loadImage", value: function value(e) {
        p && e instanceof File ? this.loadImageFile(e) : "string" == typeof e && this.loadImageURL(e);
      } }, { key: "loadImageURL", value: function value(e) {
        var t = new Image();t.onload = this.handleImageReady.bind(this, t), t.onerror = this.props.onLoadFailure, !this.isDataURL(e) && this.props.crossOrigin && (t.crossOrigin = this.props.crossOrigin), t.src = e;
      } }, { key: "loadImageFile", value: function value(e) {
        var t = this,
            o = new FileReader();o.onload = function (e) {
          return t.loadImageURL(e.target.result);
        }, o.readAsDataURL(e);
      } }, { key: "componentDidMount", value: function value() {
        var e = o.findDOMNode(this.canvas).getContext("2d");if (this.props.image && this.loadImage(this.props.image), this.paint(e), document) {
          var t = g.native;document.addEventListener(t.move, this.handleMouseMove, !1), document.addEventListener(t.up, this.handleMouseUp, !1), d && (document.addEventListener(t.mouseMove, this.handleMouseMove, !1), document.addEventListener(t.mouseUp, this.handleMouseUp, !1));
        }
      } }, { key: "componentWillUnmount", value: function value() {
        if (document) {
          var e = g.native;document.removeEventListener(e.move, this.handleMouseMove, !1), document.removeEventListener(e.up, this.handleMouseUp, !1), d && (document.removeEventListener(e.mouseMove, this.handleMouseMove, !1), document.removeEventListener(e.mouseUp, this.handleMouseUp, !1));
        }
      } }, { key: "componentDidUpdate", value: function value(e, t) {
        var a = o.findDOMNode(this.canvas),
            n = a.getContext("2d");n.clearRect(0, 0, a.width, a.height), this.paint(n), this.paintImage(n, this.state.image, this.props.border), e.image === this.props.image && e.width === this.props.width && e.height === this.props.height && e.position === this.props.position && e.scale === this.props.scale && e.rotate === this.props.rotate && t.my === this.state.my && t.mx === this.state.mx && t.image.x === this.state.image.x && t.image.y === this.state.image.y || this.props.onImageChange();
      } }, { key: "handleImageReady", value: function value(e) {
        var t = this.getInitialSize(e.width, e.height);t.resource = e, t.x = .5, t.y = .5, this.setState({ drag: !1, image: t }, this.props.onImageReady), this.props.onLoadSuccess(t);
      } }, { key: "getInitialSize", value: function value(e, t) {
        var o = void 0,
            a = void 0,
            n = this.getDimensions();return n.height / n.width > t / e ? a = e * ((o = this.getDimensions().height) / t) : o = t * ((a = this.getDimensions().width) / e), { height: o, width: a };
      } }, { key: "componentWillReceiveProps", value: function value(e) {
        (e.image && this.props.image !== e.image || this.props.width !== e.width || this.props.height !== e.height) && this.loadImage(e.image);
      } }, { key: "paintImage", value: function value(e, t, o) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : m;if (t.resource) {
          var n = this.calculatePosition(t, o);e.save(), e.translate(e.canvas.width / 2, e.canvas.height / 2), e.rotate(this.props.rotate * Math.PI / 180), e.translate(-e.canvas.width / 2, -e.canvas.height / 2), this.isVertical() && e.translate((e.canvas.width - e.canvas.height) / 2, (e.canvas.height - e.canvas.width) / 2), e.scale(a, a), e.globalCompositeOperation = "destination-over", e.drawImage(t.resource, n.x, n.y, n.width, n.height), e.restore();
        }
      } }, { key: "calculatePosition", value: function value(e, t) {
        e = e || this.state.image;var o = this.getBorders(t),
            a = h(o, 2),
            n = a[0],
            i = a[1],
            r = this.getCroppingRect(),
            s = e.width * this.props.scale,
            u = e.height * this.props.scale,
            c = -r.x * s,
            d = -r.y * u;return this.isVertical() ? (c += i, d += n) : (c += n, d += i), { x: c, y: d, height: u, width: s };
      } }, { key: "paint", value: function value(e) {
        e.save(), e.scale(m, m), e.translate(0, 0), e.fillStyle = "rgba(" + this.props.color.slice(0, 4).join(",") + ")";var t = this.props.borderRadius,
            o = this.getDimensions(),
            a = this.getBorders(o.border),
            n = h(a, 2),
            i = n[0],
            r = n[1],
            s = o.canvas.height,
            u = o.canvas.width;t = Math.max(t, 0), t = Math.min(t, u / 2 - i, s / 2 - r), e.beginPath(), v(e, i, r, u - 2 * i, s - 2 * r, t), e.rect(u, 0, -u, s), e.fill("evenodd"), e.restore();
      } }, { key: "render", value: function value() {
        var e = this.getDimensions(),
            o = { width: e.canvas.width, height: e.canvas.height, cursor: this.state.drag ? "grabbing" : "grab" },
            a = { width: e.canvas.width * m, height: e.canvas.height * m, style: u({}, o, this.props.style) };return a[g.react.down] = this.handleMouseDown, a[g.react.drag] = this.handleDragOver, this.props.disableDrop || (a[g.react.drop] = this.handleDrop), d && (a[g.react.mouseDown] = this.handleMouseDown), t.createElement("canvas", u({ ref: this.setCanvas }, a));
      } }]), r;
  }();return f.propTypes = { scale: e.number, rotate: e.number, image: e.oneOfType([e.string].concat(function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, o = Array(e.length); t < e.length; t++) {
          o[t] = e[t];
        }return o;
      }return Array.from(e);
    }(p ? [e.instanceOf(File)] : []))), border: e.oneOfType([e.number, e.arrayOf(e.number)]), borderRadius: e.number, width: e.number, height: e.number, position: e.shape({ x: e.number, y: e.number }), color: e.arrayOf(e.number), style: e.object, crossOrigin: e.oneOf(["", "anonymous", "use-credentials"]), onDropFile: e.func, onLoadFailure: e.func, onLoadSuccess: e.func, onImageReady: e.func, onImageChange: e.func, onMouseUp: e.func, onMouseMove: e.func, onPositionChange: e.func, disableDrop: e.bool }, f.defaultProps = { disableDrop: !1, scale: 1, rotate: 0, border: 25, borderRadius: 0, width: 200, height: 200, color: [0, 0, 0, .5], style: {}, onDropFile: function onDropFile() {}, onLoadFailure: function onLoadFailure() {}, onLoadSuccess: function onLoadSuccess() {}, onImageReady: function onImageReady() {}, onImageChange: function onImageChange() {}, onMouseUp: function onMouseUp() {}, onMouseMove: function onMouseMove() {}, onPositionChange: function onPositionChange() {} }, f;
});
//# sourceMappingURL=index.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpecialityList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _api = __webpack_require__(4);

var _SpecialityItem = __webpack_require__(42);

var _SpecialityForm = __webpack_require__(43);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpecialityList = exports.SpecialityList = function (_React$Component) {
    _inherits(SpecialityList, _React$Component);

    function SpecialityList(props) {
        _classCallCheck(this, SpecialityList);

        var _this2 = _possibleConstructorReturn(this, (SpecialityList.__proto__ || Object.getPrototypeOf(SpecialityList)).call(this, props));

        _this2.state = {
            loaded: false,
            items: [],
            errors: []
        };
        return _this2;
    }

    _createClass(SpecialityList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loaded = _state.loaded,
                items = _state.items,
                errors = _state.errors;

            var render = void 0;

            if (!loaded) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...'
                );
            } else if (errors.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!'
                );
            } else if (items.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_SpecialityForm.SpecialityForm, { createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    items.map(function (item, index) {
                        return React.createElement(_SpecialityItem.SpecialityItem, { key: index, item: item });
                    })
                );
            } else {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_SpecialityForm.SpecialityForm, { createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    React.createElement(
                        'div',
                        null,
                        '\u041D\u0435\u0442 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0435\u0439!'
                    )
                );
            }

            return render;
        }
    }, {
        key: 'createItem',
        value: function createItem(data) {
            var _this4 = this;

            var reload = function reload() {
                return _this4.load();
            };
            this.props.post(_api.urls.specialities, data, function (result) {
                if (result.success === true) {
                    reload();
                } else {
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            this.props.get(_api.urls.specialities, function (response) {
                if (response.success === true) {
                    _this.setState({
                        loaded: true,
                        items: response.data
                    });
                } else {
                    console.error(response.errors);
                    _this.setState({
                        loaded: true,
                        items: []
                    });
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }]);

    return SpecialityList;
}(React.Component);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpecialityItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpecialityItem = exports.SpecialityItem = function (_React$Component) {
    _inherits(SpecialityItem, _React$Component);

    function SpecialityItem(props) {
        _classCallCheck(this, SpecialityItem);

        return _possibleConstructorReturn(this, (SpecialityItem.__proto__ || Object.getPrototypeOf(SpecialityItem)).call(this, props));
    }

    _createClass(SpecialityItem, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.item.name
            );
        }
    }]);

    return SpecialityItem;
}(React.Component);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpecialityForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpecialityForm = exports.SpecialityForm = function (_React$Component) {
    _inherits(SpecialityForm, _React$Component);

    function SpecialityForm(props) {
        _classCallCheck(this, SpecialityForm);

        var _this = _possibleConstructorReturn(this, (SpecialityForm.__proto__ || Object.getPrototypeOf(SpecialityForm)).call(this, props));

        _this.state = {
            name: '',
            invalidForm: true
        };
        return _this;
    }

    _createClass(SpecialityForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435'
                    ),
                    React.createElement('input', { type: 'text', name: 'name', value: this.state.name, onChange: function onChange(e) {
                            return _this2.setState({ name: e.target.value }, function () {
                                return _this2.validateForm();
                            });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { type: 'submit', onClick: function onClick(e) {
                                e.preventDefault();_this2.sendForm();
                            }, disabled: this.state.invalidForm },
                        '\u0421\u043E\u0437\u0434\u0430\u0442\u044C'
                    )
                )
            );
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var name = this.state.name;


            var valid = true;

            if (name.length < 1 || name.length > 20) {
                valid = false;
            }

            this.setState({
                invalidForm: !valid
            });
        }
    }, {
        key: 'sendForm',
        value: function sendForm() {
            this.props.createItem(this.state.name);
        }
    }]);

    return SpecialityForm;
}(React.Component);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LecturerHome = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LecturerHome = exports.LecturerHome = function (_React$Component) {
    _inherits(LecturerHome, _React$Component);

    function LecturerHome() {
        _classCallCheck(this, LecturerHome);

        return _possibleConstructorReturn(this, (LecturerHome.__proto__ || Object.getPrototypeOf(LecturerHome)).apply(this, arguments));
    }

    _createClass(LecturerHome, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'Lecturer Home'
            );
        }
    }]);

    return LecturerHome;
}(React.Component);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CourseList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _api = __webpack_require__(4);

var _CourseItem = __webpack_require__(46);

var _CourseForm = __webpack_require__(47);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CourseList = exports.CourseList = function (_React$Component) {
    _inherits(CourseList, _React$Component);

    function CourseList(props) {
        _classCallCheck(this, CourseList);

        var _this2 = _possibleConstructorReturn(this, (CourseList.__proto__ || Object.getPrototypeOf(CourseList)).call(this, props));

        _this2.state = {
            loaded: false,
            items: [],
            errors: []
        };
        return _this2;
    }

    _createClass(CourseList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loaded = _state.loaded,
                items = _state.items,
                errors = _state.errors;

            var render = void 0;

            if (!loaded) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...'
                );
            } else if (errors.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!'
                );
            } else if (items.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_CourseForm.CourseForm, { getSpecialities: function getSpecialities(callback) {
                            return _this3.getSpecialities(callback);
                        }, createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    items.map(function (item, index) {
                        return React.createElement(_CourseItem.CourseItem, { key: index, item: item });
                    })
                );
            } else {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_CourseForm.CourseForm, { getSpecialities: function getSpecialities(callback) {
                            return _this3.getSpecialities(callback);
                        }, createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    React.createElement(
                        'div',
                        null,
                        '\u041D\u0435\u0442 \u041A\u0443\u0440\u0441\u043E\u0432!'
                    )
                );
            }

            return render;
        }
    }, {
        key: 'getSpecialities',
        value: function getSpecialities(callback) {
            this.props.get(_api.urls.specialities, function (result) {
                if (result.success === true) {
                    callback(result.data);
                } else {
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }, {
        key: 'createItem',
        value: function createItem(data) {
            var _this4 = this;

            var reload = function reload() {
                return _this4.load();
            };
            this.props.post(_api.urls.courses, data, function (result) {
                if (result.success === true) {
                    reload();
                } else {
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            this.props.get(_api.urls.courses, function (response) {
                if (response.success === true) {
                    _this.setState({
                        loaded: true,
                        items: response.data
                    });
                } else {
                    console.error(response.errors);
                    _this.setState({
                        loaded: true,
                        items: []
                    });
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }]);

    return CourseList;
}(React.Component);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CourseItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CourseItem = exports.CourseItem = function (_React$Component) {
    _inherits(CourseItem, _React$Component);

    function CourseItem(props) {
        _classCallCheck(this, CourseItem);

        return _possibleConstructorReturn(this, (CourseItem.__proto__ || Object.getPrototypeOf(CourseItem)).call(this, props));
    }

    _createClass(CourseItem, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.item.name
            );
        }
    }]);

    return CourseItem;
}(React.Component);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CourseForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _api = __webpack_require__(4);

var _reactDropdown = __webpack_require__(16);

var _reactDropdown2 = _interopRequireDefault(_reactDropdown);

var _reactNumericInput = __webpack_require__(49);

var _reactNumericInput2 = _interopRequireDefault(_reactNumericInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CourseForm = exports.CourseForm = function (_React$Component) {
    _inherits(CourseForm, _React$Component);

    function CourseForm(props) {
        _classCallCheck(this, CourseForm);

        var _this2 = _possibleConstructorReturn(this, (CourseForm.__proto__ || Object.getPrototypeOf(CourseForm)).call(this, props));

        _this2.state = {
            name: '',
            courseNumber: 1,
            speciality: null,
            isPublished: false,
            specialities: []
        };
        return _this2;
    }

    _createClass(CourseForm, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;
            this.props.getSpecialities(function (specialities) {
                _this.setState({
                    specialities: specialities
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this,
                _React$createElement;

            var options = this.state.specialities.map(function (speciality) {
                return {
                    value: speciality.id,
                    label: speciality.name
                };
            });

            return React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435'
                    ),
                    React.createElement('input', { type: 'text', name: 'name', value: this.state.name, onChange: function onChange(e) {
                            return _this3.setState({ name: e.target.value });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u041D\u043E\u043C\u0435\u0440 \u043A\u0443\u0440\u0441\u0430'
                    ),
                    React.createElement(_reactNumericInput2.default, (_React$createElement = { min: 1, max: 6, value: 1 }, _defineProperty(_React$createElement, 'value', this.state.courseNumber), _defineProperty(_React$createElement, 'onChange', function onChange(value) {
                        return _this3.setState({ courseNumber: value });
                    }), _React$createElement))
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(_reactDropdown2.default, { options: options, onChange: function onChange(option) {
                            return _this3.setState({ speciality: option });
                        }, value: this.state.speciality, placeholder: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C' })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u0412\u0438\u0434\u0435\u043D \u0432\u0441\u0435\u043C'
                    ),
                    React.createElement('input', { type: 'checkbox', name: 'isPublished', value: this.state.isPublished, onChange: function onChange() {
                            return _this3.setState({ isPublished: !_this3.state.isPublished });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { type: 'submit', onClick: function onClick(e) {
                                e.preventDefault();_this3.sendForm();
                            } },
                        '\u0421\u043E\u0437\u0434\u0430\u0442\u044C'
                    )
                )
            );
        }
    }, {
        key: 'sendForm',
        value: function sendForm() {
            var validated = this.validateForm();
            if (validated) {
                var data = {
                    name: this.state.name,
                    courseNumber: this.state.courseNumber,
                    specialityId: this.state.speciality.value,
                    isPublished: this.state.isPublished
                };

                this.props.createItem(data);
            }
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var _state = this.state,
                name = _state.name,
                courseNumber = _state.courseNumber,
                speciality = _state.speciality,
                isPublished = _state.isPublished;


            var valid = true;

            if (name.length < 1 || name.length > 100) {
                valid = false;
            } else if (courseNumber < 1 || courseNumber > 6) {
                valid = false;
            } else if (!speciality) {
                valid = false;
            }

            return valid;
        }
    }]);

    return CourseForm;
}(React.Component);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if ("function" === 'function' && _typeof(__webpack_require__(17)) === 'object' && __webpack_require__(17)) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
})();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports =
/******/function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}return target;
	};

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
		}return target;
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var KEYCODE_UP = 38;
	var KEYCODE_DOWN = 40;
	var IS_BROWSER = typeof document != 'undefined';
	var RE_NUMBER = /^[+-]?((\.\d+)|(\d+(\.\d+)?))$/;
	var RE_INCOMPLETE_NUMBER = /^([+-]|\.0*|[+-]\.0*|[+-]?\d+\.)?$/;

	function addClass(element, className) {
		if (element.classList) {
			return element.classList.add(className);
		}
		if (!element.className.search(new RegExp("\\b" + className + "\\b"))) {
			element.className = " " + className;
		}
	}

	function removeClass(element, className) {
		if (element.className) {
			if (element.classList) {
				return element.classList.remove(className);
			}

			element.className = element.className.replace(new RegExp("\\b" + className + "\\b", "g"), "");
		}
	}

	function access(object, prop, defaultValue) {
		var result = object[prop];
		if (typeof result == "function") {
			for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
				args[_key - 3] = arguments[_key];
			}

			result = result.apply(undefined, args);
		}
		return result === undefined ? defaultValue : result;
	}

	var NumericInput = function (_Component) {
		_inherits(NumericInput, _Component);

		function NumericInput() {
			var _ref;

			_classCallCheck(this, NumericInput);

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			var _this = _possibleConstructorReturn(this, (_ref = NumericInput.__proto__ || Object.getPrototypeOf(NumericInput)).call.apply(_ref, [this].concat(args)));

			_this._isStrict = !!_this.props.strict;

			_this.state = _extends({
				btnDownHover: false,
				btnDownActive: false,
				btnUpHover: false,
				btnUpActive: false,
				inputFocus: false,

				stringValue: ""
			}, _this._propsToState(_this.props));

			_this.stop = _this.stop.bind(_this);
			_this.onTouchEnd = _this.onTouchEnd.bind(_this);
			return _this;
		}

		_createClass(NumericInput, [{
			key: '_propsToState',
			value: function _propsToState(props) {
				var out = {};

				if (props.hasOwnProperty("value")) {
					out.stringValue = String(props.value || props.value === 0 ? props.value : '').trim();

					out.value = out.stringValue !== '' ? this._parse(props.value) : null;
				} else if (!this._isMounted && props.hasOwnProperty("defaultValue")) {
					out.stringValue = String(props.defaultValue || props.defaultValue === 0 ? props.defaultValue : '').trim();

					out.value = props.defaultValue !== '' ? this._parse(props.defaultValue) : null;
				}

				return out;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(props) {
				var _this2 = this;

				this._isStrict = !!props.strict;
				var nextState = this._propsToState(props);
				if (Object.keys(nextState).length) {
					this._ignoreValueChange = true;
					this.setState(nextState, function () {
						_this2._ignoreValueChange = false;
					});
				}
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate() {
				this.saveSelection();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				if (!this._ignoreValueChange && prevState.value !== this.state.value && (!isNaN(this.state.value) || this.state.value === null)) {
					this._invokeEventCallback("onChange", this.state.value, this.refs.input.value, this.refs.input);
				}

				if (this.state.inputFocus) {
					this.refs.input.focus();

					if (this.state.selectionStart || this.state.selectionStart === 0) {
						this.refs.input.selectionStart = this.state.selectionStart;
					}

					if (this.state.selectionEnd || this.state.selectionEnd === 0) {
						this.refs.input.selectionEnd = this.state.selectionEnd;
					}
				}

				this.checkValidity();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this._isMounted = false;
				this.stop();
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this3 = this;

				this._isMounted = true;
				this.refs.input.getValueAsNumber = function () {
					return _this3.state.value || 0;
				};

				this.refs.input.setValue = function (value) {
					_this3.setState({
						value: _this3._parse(value),
						stringValue: value
					});
				};

				if (!this.state.inputFocus && IS_BROWSER && document.activeElement === this.refs.input) {
					this.state.inputFocus = true;
					this.refs.input.focus();
					this._invokeEventCallback("onFocus", {
						target: this.refs.input,
						type: "focus"
					});
				}

				this.checkValidity();
			}
		}, {
			key: 'saveSelection',
			value: function saveSelection() {
				this.state.selectionStart = this.refs.input.selectionStart;
				this.state.selectionEnd = this.refs.input.selectionEnd;
			}
		}, {
			key: 'checkValidity',
			value: function checkValidity() {
				var valid = void 0,
				    validationError = "";

				var supportsValidation = !!this.refs.input.checkValidity;

				var noValidate = !!(this.props.noValidate && this.props.noValidate != "false");

				this.refs.input.noValidate = noValidate;

				valid = noValidate || !supportsValidation;

				if (valid) {
					validationError = "";
				} else {
					if (this.refs.input.pattern === "") {
						this.refs.input.pattern = this.props.required ? ".+" : ".*";
					}

					if (supportsValidation) {
						this.refs.input.checkValidity();
						valid = this.refs.input.validity.valid;

						if (!valid) {
							validationError = this.refs.input.validationMessage;
						}
					}

					if (valid && supportsValidation && this.props.maxLength) {
						if (this.refs.input.value.length > this.props.maxLength) {
							validationError = "This value is too long";
						}
					}
				}

				validationError = validationError || (valid ? "" : this.refs.input.validationMessage || "Unknown Error");

				var validStateChanged = this._valid !== validationError;
				this._valid = validationError;
				if (validationError) {
					addClass(this.refs.wrapper, "has-error");
					if (validStateChanged) {
						this._invokeEventCallback("onInvalid", validationError, this.state.value, this.refs.input.value);
					}
				} else {
					removeClass(this.refs.wrapper, "has-error");
					if (validStateChanged) {
						this._invokeEventCallback("onValid", this.state.value, this.refs.input.value);
					}
				}
			}
		}, {
			key: '_toNumber',
			value: function _toNumber(x) {
				var n = parseFloat(x);
				if (isNaN(n) || !isFinite(n)) {
					n = 0;
				}

				if (this._isStrict) {
					var precision = access(this.props, "precision", null, this);
					var q = Math.pow(10, precision === null ? 10 : precision);
					var _min = +access(this.props, "min", NumericInput.defaultProps.min, this);
					var _max = +access(this.props, "max", NumericInput.defaultProps.max, this);
					n = Math.min(Math.max(n, _min), _max);
					n = Math.round(n * q) / q;
				}

				return n;
			}
		}, {
			key: '_parse',
			value: function _parse(x) {
				x = String(x);
				if (typeof this.props.parse == 'function') {
					return parseFloat(this.props.parse(x));
				}
				return parseFloat(x);
			}
		}, {
			key: '_format',
			value: function _format(n) {
				var _n = this._toNumber(n);
				var precision = access(this.props, "precision", null, this);
				if (precision !== null) {
					_n = n.toFixed(precision);
				}

				_n += "";

				if (this.props.format) {
					return this.props.format(_n);
				}

				return _n;
			}
		}, {
			key: '_step',
			value: function _step(n, callback) {
				var _isStrict = this._isStrict;
				this._isStrict = true;

				var _step = +access(this.props, "step", NumericInput.defaultProps.step, this, n > 0 ? NumericInput.DIRECTION_UP : NumericInput.DIRECTION_DOWN);

				var _n = this._toNumber((this.state.value || 0) + _step * n);

				if (this.props.snap) {
					_n = Math.round(_n / _step) * _step;
				}

				this._isStrict = _isStrict;

				if (_n !== this.state.value) {
					this.setState({ value: _n, stringValue: _n + "" }, callback);
					return true;
				}

				return false;
			}
		}, {
			key: '_onKeyDown',
			value: function _onKeyDown() {
				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				args[0].persist();
				this._invokeEventCallback.apply(this, ["onKeyDown"].concat(args));
				var e = args[0];
				if (!e.isDefaultPrevented()) {
					if (e.keyCode === KEYCODE_UP) {
						e.preventDefault();
						this._step(e.ctrlKey || e.metaKey ? 0.1 : e.shiftKey ? 10 : 1);
					} else if (e.keyCode === KEYCODE_DOWN) {
						e.preventDefault();
						this._step(e.ctrlKey || e.metaKey ? -0.1 : e.shiftKey ? -10 : -1);
					} else {
						var _value = this.refs.input.value,
						    length = _value.length;
						if (e.keyCode === 8) {
							if (this.refs.input.selectionStart == this.refs.input.selectionEnd && this.refs.input.selectionEnd > 0 && _value.length && _value.charAt(this.refs.input.selectionEnd - 1) === ".") {
								e.preventDefault();
								this.refs.input.selectionStart = this.refs.input.selectionEnd = this.refs.input.selectionEnd - 1;
							}
						} else if (e.keyCode === 46) {
							if (this.refs.input.selectionStart == this.refs.input.selectionEnd && this.refs.input.selectionEnd < length + 1 && _value.length && _value.charAt(this.refs.input.selectionEnd) === ".") {
								e.preventDefault();
								this.refs.input.selectionStart = this.refs.input.selectionEnd = this.refs.input.selectionEnd + 1;
							}
						}
					}
				}
			}
		}, {
			key: 'stop',
			value: function stop() {
				if (this._timer) {
					clearTimeout(this._timer);
				}
			}
		}, {
			key: 'increase',
			value: function increase() {
				var _this4 = this;

				var _recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var callback = arguments[1];

				this.stop();
				this._step(1, callback);
				var _max = +access(this.props, "max", NumericInput.defaultProps.max, this);
				if (isNaN(this.state.value) || +this.state.value < _max) {
					this._timer = setTimeout(function () {
						_this4.increase(true);
					}, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
				}
			}
		}, {
			key: 'decrease',
			value: function decrease() {
				var _this5 = this;

				var _recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var callback = arguments[1];

				this.stop();
				this._step(-1, callback);
				var _min = +access(this.props, "min", NumericInput.defaultProps.min, this);
				if (isNaN(this.state.value) || +this.state.value > _min) {
					this._timer = setTimeout(function () {
						_this5.decrease(true);
					}, _recursive ? NumericInput.SPEED : NumericInput.DELAY);
				}
			}
		}, {
			key: 'onMouseDown',
			value: function onMouseDown(dir, callback) {
				if (dir == 'down') {
					this.decrease(false, callback);
				} else if (dir == 'up') {
					this.increase(false, callback);
				}
			}
		}, {
			key: 'onTouchStart',
			value: function onTouchStart(dir, e) {
				e.preventDefault();
				if (dir == 'down') {
					this.decrease();
				} else if (dir == 'up') {
					this.increase();
				}
			}
		}, {
			key: 'onTouchEnd',
			value: function onTouchEnd(e) {
				e.preventDefault();
				this.stop();
			}
		}, {
			key: '_invokeEventCallback',
			value: function _invokeEventCallback(callbackName) {
				if (typeof this.props[callbackName] == "function") {
					var _props$callbackName;

					for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
						args[_key4 - 1] = arguments[_key4];
					}

					(_props$callbackName = this.props[callbackName]).call.apply(_props$callbackName, [null].concat(args));
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this6 = this;

				var props = this.props;
				var state = this.state;
				var css = {};

				var _props = this.props,
				    step = _props.step,
				    min = _props.min,
				    max = _props.max,
				    precision = _props.precision,
				    parse = _props.parse,
				    format = _props.format,
				    mobile = _props.mobile,
				    snap = _props.snap,
				    value = _props.value,
				    type = _props.type,
				    style = _props.style,
				    defaultValue = _props.defaultValue,
				    onInvalid = _props.onInvalid,
				    onValid = _props.onValid,
				    strict = _props.strict,
				    rest = _objectWithoutProperties(_props, ['step', 'min', 'max', 'precision', 'parse', 'format', 'mobile', 'snap', 'value', 'type', 'style', 'defaultValue', 'onInvalid', 'onValid', 'strict']);

				for (var x in NumericInput.style) {
					css[x] = _extends({}, NumericInput.style[x], style ? style[x] || {} : {});
				}

				var hasFormControl = props.className && /\bform-control\b/.test(props.className);

				if (mobile == 'auto') {
					mobile = IS_BROWSER && 'ontouchstart' in document;
				}

				if (typeof mobile == "function") {
					mobile = mobile.call(this);
				}
				mobile = !!mobile;

				var attrs = {
					wrap: {
						style: style === false ? null : css.wrap,
						className: 'react-numeric-input',
						ref: 'wrapper',
						onMouseUp: undefined,
						onMouseLeave: undefined
					},
					input: _extends({
						ref: 'input',
						type: 'text',
						style: style === false ? null : _extends({}, css.input, !hasFormControl ? css['input:not(.form-control)'] : {}, state.inputFocus ? css['input:focus'] : {})
					}, rest),
					btnUp: {
						onMouseEnter: undefined,
						onMouseDown: undefined,
						onMouseUp: undefined,
						onMouseLeave: undefined,
						onTouchStart: undefined,
						onTouchEnd: undefined,
						style: style === false ? null : _extends({}, css.btn, css.btnUp, props.disabled ? css['btn:disabled'] : state.btnUpActive ? css['btn:active'] : state.btnUpHover ? css['btn:hover'] : {})
					},
					btnDown: {
						onMouseEnter: undefined,
						onMouseDown: undefined,
						onMouseUp: undefined,
						onMouseLeave: undefined,
						onTouchStart: undefined,
						onTouchEnd: undefined,
						style: style === false ? null : _extends({}, css.btn, css.btnDown, props.disabled ? css['btn:disabled'] : state.btnDownActive ? css['btn:active'] : state.btnDownHover ? css['btn:hover'] : {})
					}
				};

				var stringValue = String(state.stringValue || (state.value || state.value === 0 ? state.value : "") || "");

				if (RE_INCOMPLETE_NUMBER.test(stringValue)) {
					attrs.input.value = stringValue;
				} else if (!this._isStrict && stringValue && !RE_NUMBER.test(stringValue)) {
					attrs.input.value = stringValue;
				} else if (state.value || state.value === 0) {
					attrs.input.value = this._format(state.value);
				} else {
					attrs.input.value = "";
				}

				if (hasFormControl && style !== false) {
					_extends(attrs.wrap.style, css['wrap.hasFormControl']);
				}

				if (mobile && style !== false) {
					_extends(attrs.input.style, css['input.mobile']);
					_extends(attrs.btnUp.style, css['btnUp.mobile']);
					_extends(attrs.btnDown.style, css['btnDown.mobile']);
				}

				if (!props.disabled) {
					_extends(attrs.wrap, {
						onMouseUp: this.stop,
						onMouseLeave: this.stop
					});

					_extends(attrs.btnUp, {
						onTouchStart: this.onTouchStart.bind(this, 'up'),
						onTouchEnd: this.onTouchEnd,
						onMouseEnter: function onMouseEnter() {
							_this6.setState({
								btnUpHover: true
							});
						},
						onMouseLeave: function onMouseLeave() {
							_this6.stop();
							_this6.setState({
								btnUpHover: false,
								btnUpActive: false
							});
						},
						onMouseUp: function onMouseUp() {
							_this6.setState({
								btnUpHover: true,
								btnUpActive: false
							});
						},
						onMouseDown: function onMouseDown() {
							for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
								args[_key5] = arguments[_key5];
							}

							args[0].preventDefault();
							args[0].persist();
							_this6.setState({
								btnUpHover: true,
								btnUpActive: true,
								inputFocus: true
							}, function () {
								_this6._invokeEventCallback.apply(_this6, ["onFocus"].concat(args));
								_this6.onMouseDown('up');
							});
						}
					});

					_extends(attrs.btnDown, {
						onTouchStart: this.onTouchStart.bind(this, 'down'),
						onTouchEnd: this.onTouchEnd,
						onMouseEnter: function onMouseEnter() {
							_this6.setState({
								btnDownHover: true
							});
						},
						onMouseLeave: function onMouseLeave() {
							_this6.stop();
							_this6.setState({
								btnDownHover: false,
								btnDownActive: false
							});
						},
						onMouseUp: function onMouseUp() {
							_this6.setState({
								btnDownHover: true,
								btnDownActive: false
							});
						},
						onMouseDown: function onMouseDown() {
							for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
								args[_key6] = arguments[_key6];
							}

							args[0].preventDefault();
							args[0].persist();
							_this6.setState({
								btnDownHover: true,
								btnDownActive: true,
								inputFocus: true
							}, function () {
								_this6._invokeEventCallback.apply(_this6, ["onFocus"].concat(args));
								_this6.onMouseDown('down');
							});
						}
					});

					_extends(attrs.input, {
						onChange: function onChange(e) {
							var original = e.target.value;
							var val = _this6._parse(original);
							if (isNaN(val)) {
								val = null;
							}
							_this6.setState({
								value: _this6._isStrict ? _this6._toNumber(val) : val,
								stringValue: original
							});
						},
						onKeyDown: this._onKeyDown.bind(this),
						onInput: function onInput() {
							for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
								args[_key7] = arguments[_key7];
							}

							_this6.saveSelection();
							_this6._invokeEventCallback.apply(_this6, ["onInput"].concat(args));
						},
						onSelect: function onSelect() {
							for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
								args[_key8] = arguments[_key8];
							}

							_this6.saveSelection();
							_this6._invokeEventCallback.apply(_this6, ["onSelect"].concat(args));
						},
						onFocus: function onFocus() {
							for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
								args[_key9] = arguments[_key9];
							}

							args[0].persist();
							_this6.setState({ inputFocus: true }, function () {
								var val = _this6._parse(args[0].target.value);
								_this6.setState({
									value: val,
									stringValue: val || val === 0 ? val + "" : ""
								}, function () {
									_this6._invokeEventCallback.apply(_this6, ["onFocus"].concat(args));
								});
							});
						},
						onBlur: function onBlur() {
							for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
								args[_key10] = arguments[_key10];
							}

							var _isStrict = _this6._isStrict;
							_this6._isStrict = true;
							args[0].persist();
							_this6.setState({ inputFocus: false }, function () {
								var val = _this6._parse(args[0].target.value);
								_this6.setState({
									value: val
								}, function () {
									_this6._invokeEventCallback.apply(_this6, ["onBlur"].concat(args));
									_this6._isStrict = _isStrict;
								});
							});
						}
					});
				} else {
					if (style !== false) {
						_extends(attrs.input.style, css['input:disabled']);
					}
				}

				if (mobile) {
					return _react2.default.createElement('span', attrs.wrap, _react2.default.createElement('input', attrs.input), _react2.default.createElement('b', attrs.btnUp, _react2.default.createElement('i', { style: style === false ? null : css.minus }), _react2.default.createElement('i', { style: style === false ? null : css.plus })), _react2.default.createElement('b', attrs.btnDown, _react2.default.createElement('i', { style: style === false ? null : css.minus })));
				}

				return _react2.default.createElement('span', attrs.wrap, _react2.default.createElement('input', attrs.input), _react2.default.createElement('b', attrs.btnUp, _react2.default.createElement('i', { style: style === false ? null : css.arrowUp })), _react2.default.createElement('b', attrs.btnDown, _react2.default.createElement('i', { style: style === false ? null : css.arrowDown })));
			}
		}]);

		return NumericInput;
	}(_react.Component);

	NumericInput.propTypes = {
		step: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
		min: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
		max: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
		precision: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
		maxLength: _propTypes2.default.number,
		parse: _propTypes2.default.func,
		format: _propTypes2.default.func,
		className: _propTypes2.default.string,
		disabled: _propTypes2.default.bool,
		readOnly: _propTypes2.default.bool,
		required: _propTypes2.default.bool,
		snap: _propTypes2.default.bool,
		noValidate: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
		style: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
		type: _propTypes2.default.string,
		pattern: _propTypes2.default.string,
		onFocus: _propTypes2.default.func,
		onBlur: _propTypes2.default.func,
		onKeyDown: _propTypes2.default.func,
		onChange: _propTypes2.default.func,
		onInvalid: _propTypes2.default.func,
		onValid: _propTypes2.default.func,
		onInput: _propTypes2.default.func,
		onSelect: _propTypes2.default.func,
		size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
		value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
		defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
		strict: _propTypes2.default.bool,
		mobile: function mobile(props, propName) {
			var prop = props[propName];
			if (prop !== true && prop !== false && prop !== 'auto' && typeof prop != 'function') {
				return new Error('The "mobile" prop must be true, false, "auto" or a function');
			}
		}
	};
	NumericInput.defaultProps = {
		step: 1,
		min: Number.MIN_SAFE_INTEGER || -9007199254740991,
		max: Number.MAX_SAFE_INTEGER || 9007199254740991,
		precision: null,
		parse: null,
		format: null,
		mobile: 'auto',
		strict: false,
		style: {}
	};
	NumericInput.style = {
		wrap: {
			position: 'relative',
			display: 'inline-block'
		},

		'wrap.hasFormControl': {
			display: 'block'
		},

		arrowUp: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			width: 0,
			height: 0,
			borderWidth: '0 0.6ex 0.6ex 0.6ex',
			borderColor: 'transparent transparent rgba(0, 0, 0, 0.7)',
			borderStyle: 'solid',
			margin: '-0.3ex 0 0 -0.56ex'
		},

		arrowDown: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			width: 0,
			height: 0,
			borderWidth: '0.6ex 0.6ex 0 0.6ex',
			borderColor: 'rgba(0, 0, 0, 0.7) transparent transparent',
			borderStyle: 'solid',
			margin: '-0.3ex 0 0 -0.56ex'
		},

		plus: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			width: 2,
			height: 10,
			background: 'rgba(0,0,0,.7)',
			margin: '-5px 0 0 -1px'
		},

		minus: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			width: 10,
			height: 2,
			background: 'rgba(0,0,0,.7)',
			margin: '-1px 0 0 -5px'
		},

		btn: {
			position: 'absolute',
			right: 2,
			width: '2.26ex',
			borderColor: 'rgba(0,0,0,.1)',
			borderStyle: 'solid',
			textAlign: 'center',
			cursor: 'default',
			transition: 'all 0.1s',
			background: 'rgba(0,0,0,.1)',
			boxShadow: '-1px -1px 3px rgba(0,0,0,.1) inset,' + '1px 1px 3px rgba(255,255,255,.7) inset'
		},

		btnUp: {
			top: 2,
			bottom: '50%',
			borderRadius: '2px 2px 0 0',
			borderWidth: '1px 1px 0 1px'
		},

		'btnUp.mobile': {
			width: '3.3ex',
			bottom: 2,
			boxShadow: 'none',
			borderRadius: 2,
			borderWidth: 1
		},

		btnDown: {
			top: '50%',
			bottom: 2,
			borderRadius: '0 0 2px 2px',
			borderWidth: '0 1px 1px 1px'
		},

		'btnDown.mobile': {
			width: '3.3ex',
			bottom: 2,
			left: 2,
			top: 2,
			right: 'auto',
			boxShadow: 'none',
			borderRadius: 2,
			borderWidth: 1
		},

		'btn:hover': {
			background: 'rgba(0,0,0,.2)'
		},

		'btn:active': {
			background: 'rgba(0,0,0,.3)',
			boxShadow: '0 1px 3px rgba(0,0,0,.2) inset,' + '-1px -1px 4px rgba(255,255,255,.5) inset'
		},

		'btn:disabled': {
			opacity: 0.5,
			boxShadow: 'none',
			cursor: 'not-allowed'
		},

		input: {
			paddingRight: '3ex',
			boxSizing: 'border-box'
		},

		'input:not(.form-control)': {
			border: '1px solid #ccc',
			borderRadius: 2,
			paddingLeft: 4,
			display: 'block',
			WebkitAppearance: 'none',
			lineHeight: 'normal'
		},

		'input.mobile': {
			paddingLeft: ' 3.4ex',
			paddingRight: '3.4ex',
			textAlign: 'center'
		},

		'input:focus': {},

		'input:disabled': {
			color: 'rgba(0, 0, 0, 0.3)',
			textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)'
		}
	};
	NumericInput.SPEED = 50;
	NumericInput.DELAY = 500;
	NumericInput.DIRECTION_UP = "up";
	NumericInput.DIRECTION_DOWN = "down";

	module.exports = NumericInput;

	/***/
},
/* 1 */
/***/function (module, exports) {

	module.exports = __webpack_require__(0);

	/***/
},
/* 2 */
/***/function (module, exports) {

	module.exports = __webpack_require__(1);

	/***/
}]
/******/);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GuideList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _api = __webpack_require__(4);

var _GuideItem = __webpack_require__(51);

var _GuideForm = __webpack_require__(52);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GuideList = exports.GuideList = function (_React$Component) {
    _inherits(GuideList, _React$Component);

    function GuideList(props) {
        _classCallCheck(this, GuideList);

        var _this2 = _possibleConstructorReturn(this, (GuideList.__proto__ || Object.getPrototypeOf(GuideList)).call(this, props));

        _this2.state = {
            loaded: false,
            items: [],
            errors: []
        };
        return _this2;
    }

    _createClass(GuideList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loaded = _state.loaded,
                items = _state.items,
                errors = _state.errors;

            var render = void 0;

            if (!loaded) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...'
                );
            } else if (errors.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    '\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430!'
                );
            } else if (items.length > 0) {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_GuideForm.GuideForm, { getCourses: function getCourses(callback) {
                            return _this3.getCourses(callback);
                        }, createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    items.map(function (item, index) {
                        return React.createElement(_GuideItem.GuideItem, { key: index, item: item });
                    })
                );
            } else {
                render = React.createElement(
                    'div',
                    null,
                    React.createElement(_GuideForm.GuideForm, { getCourses: function getCourses(callback) {
                            return _this3.getCourses(callback);
                        }, createItem: function createItem(data) {
                            return _this3.createItem(data);
                        } }),
                    React.createElement(
                        'div',
                        null,
                        '\u041D\u0435\u0442 \u041C\u0435\u0442\u043E\u0434\u0438\u0447\u0435\u043A!'
                    )
                );
            }

            return render;
        }
    }, {
        key: 'getCourses',
        value: function getCourses(callback) {
            this.props.get(_api.urls.courses, function (result) {
                if (result.success === true) {
                    callback(result.data);
                } else {
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }, {
        key: 'createItem',
        value: function createItem(data) {
            var _this4 = this;

            var reload = function reload() {
                return _this4.load();
            };
            this.props.postFormData(_api.urls.guides, data, function (result) {
                if (result.success === true) {
                    reload();
                } else {
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            this.props.get(_api.urls.guides, function (response) {
                if (response.success === true) {
                    _this.setState({
                        loaded: true,
                        items: response.data
                    });
                } else {
                    console.error(response.errors);
                    _this.setState({
                        loaded: true,
                        items: []
                    });
                    // TODO
                    // implement error display
                    alert('Error');
                }
            });
        }
    }]);

    return GuideList;
}(React.Component);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GuideItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GuideItem = exports.GuideItem = function (_React$Component) {
    _inherits(GuideItem, _React$Component);

    function GuideItem(props) {
        _classCallCheck(this, GuideItem);

        return _possibleConstructorReturn(this, (GuideItem.__proto__ || Object.getPrototypeOf(GuideItem)).call(this, props));
    }

    _createClass(GuideItem, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.item.name
            );
        }
    }]);

    return GuideItem;
}(React.Component);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GuideForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _api = __webpack_require__(4);

var _date = __webpack_require__(53);

var _reactDropdown = __webpack_require__(16);

var _reactDropdown2 = _interopRequireDefault(_reactDropdown);

var _reactFileInput = __webpack_require__(15);

var _reactFileInput2 = _interopRequireDefault(_reactFileInput);

var _reactDatePicker = __webpack_require__(54);

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

__webpack_require__(78);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GuideForm = exports.GuideForm = function (_React$Component) {
    _inherits(GuideForm, _React$Component);

    function GuideForm(props) {
        _classCallCheck(this, GuideForm);

        var _this2 = _possibleConstructorReturn(this, (GuideForm.__proto__ || Object.getPrototypeOf(GuideForm)).call(this, props));

        _this2.state = {
            name: '',
            file: null,
            dateAvailable: null,
            course: null,
            courses: []
        };
        return _this2;
    }

    _createClass(GuideForm, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;
            this.props.getCourses(function (courses) {
                _this.setState({
                    courses: courses
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var options = this.state.courses.map(function (course) {
                return {
                    value: course.id,
                    label: course.name
                };
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435'
                    ),
                    React.createElement('input', { type: 'text', name: 'name', value: this.state.name, onChange: function onChange(e) {
                            return _this3.setState({ name: e.target.value });
                        } })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(_reactDropdown2.default, { options: options, onChange: function onChange(option) {
                            return _this3.setState({ course: option });
                        }, value: this.state.course, placeholder: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C' })
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'label',
                        null,
                        '\u0424\u0430\u0439\u043B'
                    ),
                    React.createElement(_reactFileInput2.default, {
                        name: 'file',
                        accept: '.docx,.doc,.xls,.pdf,.txt',
                        placeholder: 'Attach Document',
                        onChange: function onChange(e) {
                            return _this3.setState({ file: e.target.files[0] });
                        },
                        className: 'file-input' })
                ),
                React.createElement(
                    'label',
                    null,
                    '\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0441'
                ),
                React.createElement(_reactDatePicker2.default, { locale: 'ru', value: this.state.dateAvailable, onChange: function onChange(date) {
                        return _this3.setState({ dateAvailable: date });
                    } }),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { type: 'submit', onClick: function onClick(e) {
                                e.preventDefault();_this3.sendForm();
                            } },
                        '\u0421\u043E\u0437\u0434\u0430\u0442\u044C'
                    )
                )
            );
        }
    }, {
        key: 'sendForm',
        value: function sendForm() {
            var validated = this.validateForm();
            if (validated) {
                var data = {
                    name: this.state.name,
                    file: this.state.file,
                    dateAvailable: this.state.dateAvailable != null ? (0, _date.yyyymmdd)(this.state.dateAvailable, '-') : null,
                    courseId: this.state.course.value
                };

                this.props.createItem(data);
            } else {
                // TODO
                // temp implementation
                console.log('Invalid form');
            }
        }
    }, {
        key: 'validateForm',
        value: function validateForm() {
            var _state = this.state,
                name = _state.name,
                file = _state.file,
                course = _state.course;


            var valid = true;

            if (name.length < 1 || name.length > 100) {
                valid = false;
            } else if (!file) {
                valid = false;
            } else if (!course) {
                valid = false;
            }

            return valid;
        }
    }]);

    return GuideForm;
}(React.Component);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var yyyymmdd = exports.yyyymmdd = function yyyymmdd(date, divider) {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join(divider);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(55);

var _DatePicker = __webpack_require__(57);

var _DatePicker2 = _interopRequireDefault(_DatePicker);

__webpack_require__(76);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _DatePicker2.default;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./Calendar.css", function() {
			var newContent = require("!!../../css-loader/index.js!./Calendar.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, ".react-calendar {\n  width: 350px;\n  max-width: 100%;\n  background: white;\n  border: 1px solid #a0a096;\n  font-family: Arial, Helvetica, sans-serif;\n  line-height: 1.125em;\n}\n.react-calendar,\n.react-calendar *,\n.react-calendar *:before,\n.react-calendar *:after {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.react-calendar button {\n  border: 0;\n  outline: none;\n}\n.react-calendar button:not([disabled]):hover {\n  cursor: pointer;\n}\n.react-calendar__navigation {\n  height: 44px;\n  margin-bottom: 1em;\n}\n.react-calendar__navigation button {\n  min-width: 44px;\n  background: none;\n}\n.react-calendar__navigation button:not([disabled]):hover {\n  background-color: #e6e6e6;\n}\n.react-calendar__navigation button[disabled] {\n  background-color: #f0f0f0;\n}\n.react-calendar__month-view__weekdays {\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: bold;\n  font-size: .75em;\n}\n.react-calendar__month-view__weekdays__weekday {\n  padding: .5em;\n}\n.react-calendar__month-view__weekNumbers {\n  font-weight: bold;\n}\n.react-calendar__month-view__weekNumbers .react-calendar__tile {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: .75em;\n  padding: calc(1em) calc(0.66666667em);\n}\n.react-calendar__month-view__days__day--weekend {\n  color: red;\n}\n.react-calendar__month-view__days__day--neighboringMonth {\n  color: #969696;\n}\n.react-calendar__year-view .react-calendar__tile,\n.react-calendar__decade-view .react-calendar__tile,\n.react-calendar__century-view .react-calendar__tile {\n  padding: 2em .5em;\n}\n.react-calendar__tile {\n  max-width: 100%;\n  text-align: center;\n  padding: .75em .5em;\n  background: none;\n}\nbutton.react-calendar__tile[disabled] {\n  background-color: #f0f0f0;\n}\nbutton.react-calendar__tile:not([disabled]):hover {\n  background-color: #e6e6e6;\n}\n.react-calendar__tile--hasActive {\n  background: #76baff;\n}\nbutton.react-calendar__tile--hasActive:not([disabled]):hover {\n  background: #a9d4ff;\n}\n.react-calendar__tile--active {\n  background: #006edc;\n  color: white;\n}\nbutton.react-calendar__tile--active:not([disabled]):hover {\n  background: #1087ff;\n}\n", ""]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mergeClassNames = __webpack_require__(18);

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _entry = __webpack_require__(58);

var _entry2 = _interopRequireDefault(_entry);

var _detectElementOverflow = __webpack_require__(72);

var _detectElementOverflow2 = _interopRequireDefault(_detectElementOverflow);

var _DateInput = __webpack_require__(73);

var _DateInput2 = _interopRequireDefault(_DateInput);

var _propTypes3 = __webpack_require__(24);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var allViews = ['century', 'decade', 'year', 'month'];

var DatePicker = function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: _this.props.isOpen
    }, _this.openCalendar = function () {
      _this.setState({ isOpen: true });
    }, _this.closeCalendar = function () {
      _this.setState({ isOpen: false });
    }, _this.toggleCalendar = function () {
      _this.setState(function (prevState) {
        return { isOpen: !prevState.isOpen };
      });
    }, _this.onChange = function (value) {
      var closeCalendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _this.setState({
        isOpen: !closeCalendar
      });

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
    }, _this.onFocus = function () {
      _this.blurRequested = false;

      _this.openCalendar();
    }, _this.onBlur = function () {
      _this.blurRequested = true;

      setTimeout(function () {
        if (_this.blurRequested) {
          _this.closeCalendar();

          _this.blurRequested = false;
        }
      }, 100);
    }, _this.stopPropagation = function (event) {
      return event.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;

      if (nextProps.isOpen !== props.isOpen) {
        this.setState({ isOpen: nextProps.isOpen });
      }
    }
  }, {
    key: 'renderInput',
    value: function renderInput() {
      var _props = this.props,
          locale = _props.locale,
          maxDate = _props.maxDate,
          maxDetail = _props.maxDetail,
          minDate = _props.minDate,
          returnValue = _props.returnValue,
          value = _props.value;

      var _concat = [].concat(value),
          _concat2 = _slicedToArray(_concat, 1),
          valueFrom = _concat2[0];

      return _react2.default.createElement('div', { className: 'react-date-picker__button' }, _react2.default.createElement(_DateInput2.default, {
        locale: locale,
        maxDate: maxDate,
        maxDetail: maxDetail,
        minDate: minDate,
        onChange: this.onChange,
        placeholder: this.placeholder,
        returnValue: returnValue,
        value: valueFrom
      }), _react2.default.createElement('button', {
        className: 'react-date-picker__button__icon',
        onClick: this.toggleCalendar,
        onFocus: this.stopPropagation
      }, _react2.default.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '19', height: '19', viewBox: '0 0 19 19' }, _react2.default.createElement('g', { stroke: 'black', strokeWidth: '2' }, _react2.default.createElement('rect', { width: '15', height: '15', x: '2', y: '2', fill: 'none' }), _react2.default.createElement('line', { x1: '6', y1: '0', x2: '6', y2: '4' }), _react2.default.createElement('line', { x1: '13', y1: '0', x2: '13', y2: '4' })))));
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar() {
      var isOpen = this.state.isOpen;

      if (isOpen === null) {
        return null;
      }

      var _props2 = this.props,
          calendarClassName = _props2.calendarClassName,
          datePickerClassName = _props2.className,
          onChange = _props2.onChange,
          calendarProps = _objectWithoutProperties(_props2, ['calendarClassName', 'className', 'onChange']);

      var className = 'react-date-picker__calendar';

      return _react2.default.createElement('div', {
        className: (0, _mergeClassNames2.default)(className, className + '--' + (isOpen ? 'open' : 'closed')),
        ref: function ref(_ref2) {
          if (!_ref2) {
            return;
          }

          _ref2.classList.remove(className + '--above-label');

          var collisions = (0, _detectElementOverflow2.default)(_ref2, document.body);

          if (collisions.collidedBottom) {
            _ref2.classList.add(className + '--above-label');
          }
        }
      }, _react2.default.createElement(_entry2.default, _extends({
        className: calendarClassName,
        onChange: this.onChange
      }, calendarProps)));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        className: (0, _mergeClassNames2.default)('react-date-picker', this.props.className),
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }, this.renderInput(), this.renderCalendar());
    }
  }]);

  return DatePicker;
}(_react.Component);

exports.default = DatePicker;

DatePicker.defaultProps = {
  isOpen: null,
  maxDetail: 'month',
  returnValue: 'start'
};

DatePicker.propTypes = {
  calendarClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  calendarType: _propTypes3.isCalendarType,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  isOpen: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  minDetail: _propTypes2.default.oneOf(allViews),
  next2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  onChange: _propTypes2.default.func,
  onClickDay: _propTypes2.default.func,
  onClickDecade: _propTypes2.default.func,
  onClickMonth: _propTypes2.default.func,
  onClickYear: _propTypes2.default.func,
  prev2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prevLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  returnValue: _propTypes2.default.oneOf(['start', 'end']).isRequired,
  showNeighboringMonth: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  value: _propTypes3.isValue
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthView = exports.YearView = exports.DecadeView = exports.CenturyView = exports.Calendar = undefined;

var _Calendar = __webpack_require__(59);

var _Calendar2 = _interopRequireDefault(_Calendar);

var _CenturyView = __webpack_require__(19);

var _CenturyView2 = _interopRequireDefault(_CenturyView);

var _DecadeView = __webpack_require__(20);

var _DecadeView2 = _interopRequireDefault(_DecadeView);

var _YearView = __webpack_require__(21);

var _YearView2 = _interopRequireDefault(_YearView);

var _MonthView = __webpack_require__(22);

var _MonthView2 = _interopRequireDefault(_MonthView);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _Calendar2.default;
exports.Calendar = _Calendar2.default;
exports.CenturyView = _CenturyView2.default;
exports.DecadeView = _DecadeView2.default;
exports.YearView = _YearView2.default;
exports.MonthView = _MonthView2.default;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mergeClassNames = __webpack_require__(18);

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _Navigation = __webpack_require__(60);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _CenturyView = __webpack_require__(19);

var _CenturyView2 = _interopRequireDefault(_CenturyView);

var _DecadeView = __webpack_require__(20);

var _DecadeView2 = _interopRequireDefault(_DecadeView);

var _YearView = __webpack_require__(21);

var _YearView2 = _interopRequireDefault(_YearView);

var _MonthView = __webpack_require__(22);

var _MonthView2 = _interopRequireDefault(_MonthView);

var _dates = __webpack_require__(3);

var _locales = __webpack_require__(11);

var _propTypes3 = __webpack_require__(2);

var _utils = __webpack_require__(6);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeStartDate: _this.getActiveStartDate(),
      view: _this.getView()
    }, _this.setView = function (view) {
      _this.setState(function (prevState) {
        var activeRange = (0, _dates.getRange)(view, prevState.activeStartDate);

        var _activeRange = _slicedToArray(activeRange, 1),
            activeStartDate = _activeRange[0];

        return {
          activeStartDate: activeStartDate,
          view: view
        };
      });
    }, _this.setActiveStartDate = function (activeStartDate) {
      return _this.setState({ activeStartDate: activeStartDate });
    }, _this.drillDown = function (activeStartDate) {
      if (!_this.drillDownAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      _this.setState(function (prevState) {
        return {
          activeStartDate: activeStartDate,
          view: views[views.indexOf(prevState.view) + 1]
        };
      });
    }, _this.drillUp = function () {
      if (!_this.drillUpAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      _this.setState(function (prevState) {
        return {
          view: views[views.indexOf(prevState.view) - 1]
        };
      });
    }, _this.onChange = function (value) {
      _this.setState({ value: value });

      var onChange = _this.props.onChange;

      if (onChange) {
        var processedValue = _this.getProcessedValue(value);
        onChange(processedValue);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'getValueArray',
    value: function getValueArray(value) {
      if (value instanceof Array) {
        return value;
      }
      return [this.getValueFrom(value), this.getValueTo(value)];
    }
  }, {
    key: 'getValueFrom',
    value: function getValueFrom(value) {
      if (!value) {
        return value;
      }
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate;

      var rawValueFrom = value instanceof Array ? value[0] : value;
      var valueFrom = (0, _dates.getBegin)(this.valueType, rawValueFrom);

      if (minDate && minDate > valueFrom) {
        return minDate;
      }
      if (maxDate && maxDate < valueFrom) {
        return maxDate;
      }
      return valueFrom;
    }
  }, {
    key: 'getValueTo',
    value: function getValueTo(value) {
      if (!value) {
        return value;
      }
      var _props2 = this.props,
          maxDate = _props2.maxDate,
          minDate = _props2.minDate;

      var rawValueFrom = value instanceof Array ? value[1] : value;
      var valueTo = (0, _dates.getEnd)(this.valueType, rawValueFrom);

      if (minDate && minDate > valueTo) {
        return minDate;
      }
      if (maxDate && maxDate < valueTo) {
        return maxDate;
      }
      return valueTo;
    }

    /**
     * Returns views array with disallowed values cut off.
     */

  }, {
    key: 'getLimitedViews',
    value: function getLimitedViews() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var minDetail = props.minDetail,
          maxDetail = props.maxDetail;

      return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
    }

    /**
     * Determines whether a given view is allowed with currently applied settings.
     */

  }, {
    key: 'isViewAllowed',
    value: function isViewAllowed() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.view;

      var views = this.getLimitedViews(props);

      return views.indexOf(view) !== -1;
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getProcessedValue',
    value: function getProcessedValue(value) {
      var returnValue = this.props.returnValue;

      switch (returnValue) {
        case 'start':
          return this.getValueFrom(value);
        case 'end':
          return this.getValueTo(value);
        case 'range':
          return this.getValueArray(value);
        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _locales.setLocale)(this.props.locale);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;

      var allowedViewChanged = nextProps.minDetail !== props.minDetail || nextProps.maxDetail !== props.maxDetail;

      var nextValueFrom = this.getValueFrom(nextProps.value);
      var valueFrom = this.getValueFrom(props.value);
      var valueFromChanged = nextValueFrom && !valueFrom || nextValueFrom && valueFrom && nextValueFrom.getTime() !== valueFrom.getTime();

      var nextValueTo = this.getValueTo(nextProps.value);
      var valueTo = this.getValueTo(props.value);
      var valueToChanged = nextValueTo && !valueTo || nextValueTo && valueTo && nextValueTo.getTime() !== valueTo.getTime();

      var valueChanged = valueFromChanged || valueToChanged;

      var nextState = {};

      if (nextProps.locale !== props.locale) {
        (0, _locales.setLocale)(nextProps.locale);
      }

      if (allowedViewChanged) {
        if (!this.isViewAllowed(nextProps)) {
          nextState.view = this.getView(nextProps);
        }
      }

      if (allowedViewChanged || valueChanged) {
        nextState.activeStartDate = this.getActiveStartDate(nextProps);
      }

      this.setState(nextState);
    }
  }, {
    key: 'getActiveStartDate',
    value: function getActiveStartDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var rangeType = this.getView(props);
      var valueFrom = this.getValueFrom(props.value) || new Date();
      return (0, _dates.getBegin)(rangeType, valueFrom);
    }
  }, {
    key: 'getView',
    value: function getView() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = props.view;

      if (view && this.getLimitedViews(props).indexOf(view) !== -1) {
        return view;
      }

      return this.getLimitedViews(props).pop();
    }

    /**
     * Called when the user opens a new view.
     */

    /**
     * Called when the user uses navigation buttons.
     */

  }, {
    key: 'renderContent',
    value: function renderContent() {
      var setView = this.setView,
          valueType = this.valueType;
      var _props3 = this.props,
          calendarType = _props3.calendarType,
          maxDate = _props3.maxDate,
          minDate = _props3.minDate,
          renderChildren = _props3.renderChildren,
          value = _props3.value;
      var _state = this.state,
          activeStartDate = _state.activeStartDate,
          view = _state.view;

      var commonProps = {
        activeStartDate: activeStartDate,
        maxDate: maxDate,
        minDate: minDate,
        renderChildren: renderChildren,
        setView: setView,
        value: value,
        valueType: valueType
      };

      var clickAction = this.drillDownAvailable ? this.drillDown : this.onChange;

      switch (view) {
        case 'century':
          return _react2.default.createElement(_CenturyView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDecade)
          }, commonProps));
        case 'decade':
          return _react2.default.createElement(_DecadeView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickYear)
          }, commonProps));
        case 'year':
          return _react2.default.createElement(_YearView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickMonth)
          }, commonProps));
        case 'month':
          return _react2.default.createElement(_MonthView2.default, _extends({
            calendarType: calendarType,
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDay),
            showNeighboringMonth: this.props.showNeighboringMonth,
            showWeekNumbers: this.props.showWeekNumbers
          }, commonProps));
        default:
          throw new Error('Invalid view: ' + view + '.');
      }
    }
  }, {
    key: 'renderNavigation',
    value: function renderNavigation() {
      var showNavigation = this.props.showNavigation;

      if (!showNavigation) {
        return null;
      }

      return _react2.default.createElement(_Navigation2.default, {
        activeRange: this.state.activeRange,
        activeStartDate: this.state.activeStartDate,
        drillUp: this.drillUp,
        maxDate: this.props.maxDate,
        minDate: this.props.minDate,
        next2Label: this.props.next2Label,
        nextLabel: this.props.nextLabel,
        prev2Label: this.props.prev2Label,
        prevLabel: this.props.prevLabel,
        setActiveStartDate: this.setActiveStartDate,
        view: this.state.view,
        views: this.getLimitedViews()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: (0, _mergeClassNames2.default)('react-calendar', this.props.className) }, this.renderNavigation(), this.renderContent());
    }
  }, {
    key: 'drillDownAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;

      return views.indexOf(view) < views.length - 1;
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;

      return views.indexOf(view) > 0;
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;

      return allValueTypes[allViews.indexOf(maxDetail)];
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;

Calendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  showNavigation: true,
  showNeighboringMonth: true,
  view: 'month'
};

Calendar.propTypes = {
  calendarType: _propTypes3.isCalendarType,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  minDetail: _propTypes2.default.oneOf(allViews),
  next2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  onChange: _propTypes2.default.func,
  onClickDay: _propTypes2.default.func,
  onClickDecade: _propTypes2.default.func,
  onClickMonth: _propTypes2.default.func,
  onClickYear: _propTypes2.default.func,
  prev2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prevLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  renderChildren: _propTypes2.default.func,
  returnValue: _propTypes2.default.oneOf(['start', 'end', 'range']).isRequired,
  showNavigation: _propTypes2.default.bool,
  showNeighboringMonth: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  value: _propTypes3.isValue,
  view: _propTypes2.default.oneOf(allViews) // eslint-disable-line react/no-unused-prop-types
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = __webpack_require__(3);

var _dateFormatter = __webpack_require__(13);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Navigation = function (_Component) {
  _inherits(Navigation, _Component);

  function Navigation() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Navigation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call.apply(_ref, [this].concat(args))), _this), _this.onClickPrevious = function () {
      var _this$props = _this.props,
          date = _this$props.activeStartDate,
          view = _this$props.view,
          setActiveStartDate = _this$props.setActiveStartDate;

      setActiveStartDate((0, _dates.getBeginPrevious)(view, date));
    }, _this.onClickNext = function () {
      var _this$props2 = _this.props,
          date = _this$props2.activeStartDate,
          view = _this$props2.view,
          setActiveStartDate = _this$props2.setActiveStartDate;

      setActiveStartDate((0, _dates.getBeginNext)(view, date));
    }, _this.onClickPrevious2 = function () {
      var _this$props3 = _this.props,
          date = _this$props3.activeStartDate,
          view = _this$props3.view,
          setActiveStartDate = _this$props3.setActiveStartDate;

      setActiveStartDate((0, _dates.getBeginPrevious2)(view, date));
    }, _this.onClickNext2 = function () {
      var _this$props4 = _this.props,
          date = _this$props4.activeStartDate,
          view = _this$props4.view,
          setActiveStartDate = _this$props4.setActiveStartDate;

      setActiveStartDate((0, _dates.getBeginNext2)(view, date));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Navigation, [{
    key: 'render',
    value: function render() {
      var label = this.label;
      var _props = this.props,
          drillUp = _props.drillUp,
          view = _props.view;

      return _react2.default.createElement('div', {
        className: 'react-calendar__navigation',
        style: { display: 'flex' }
      }, view !== 'century' && _react2.default.createElement('button', {
        className: 'react-calendar__navigation__arrow',
        disabled: this.prev2ButtonDisabled,
        onClick: this.onClickPrevious2,
        type: 'button'
      }, this.props.prev2Label), _react2.default.createElement('button', {
        className: 'react-calendar__navigation__arrow',
        disabled: this.prevButtonDisabled,
        onClick: this.onClickPrevious,
        type: 'button'
      }, this.props.prevLabel), _react2.default.createElement('button', {
        className: 'react-calendar__navigation__label',
        onClick: drillUp,
        disabled: !this.drillUpAvailable,
        style: { flexGrow: 1 },
        type: 'button'
      }, label), _react2.default.createElement('button', {
        className: 'react-calendar__navigation__arrow',
        disabled: this.nextButtonDisabled,
        onClick: this.onClickNext,
        type: 'button'
      }, this.props.nextLabel), view !== 'century' && _react2.default.createElement('button', {
        className: 'react-calendar__navigation__arrow',
        disabled: this.next2ButtonDisabled,
        onClick: this.onClickNext2,
        type: 'button'
      }, this.props.next2Label));
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var _props2 = this.props,
          view = _props2.view,
          views = _props2.views;

      return views.indexOf(view) > 0;
    }
  }, {
    key: 'prevButtonDisabled',
    get: function get() {
      var _props3 = this.props,
          date = _props3.activeStartDate,
          minDate = _props3.minDate,
          view = _props3.view;

      var previousActiveStartDate = (0, _dates.getBeginPrevious)(view, date);
      if (previousActiveStartDate.getFullYear() < 1000) {
        return true;
      }
      var previousActiveEndDate = (0, _dates.getEndPrevious)(view, date);
      return minDate && minDate >= previousActiveEndDate;
    }
  }, {
    key: 'prev2ButtonDisabled',
    get: function get() {
      var _props4 = this.props,
          date = _props4.activeStartDate,
          minDate = _props4.minDate,
          view = _props4.view;

      var previousActiveStartDate = (0, _dates.getBeginPrevious2)(view, date);
      if (previousActiveStartDate.getFullYear() < 1000) {
        return true;
      }
      var previousActiveEndDate = (0, _dates.getEndPrevious2)(view, date);
      return minDate && minDate >= previousActiveEndDate;
    }
  }, {
    key: 'nextButtonDisabled',
    get: function get() {
      var _props5 = this.props,
          date = _props5.activeStartDate,
          maxDate = _props5.maxDate,
          view = _props5.view;

      var nextActiveStartDate = (0, _dates.getBeginNext)(view, date);
      return maxDate && maxDate <= nextActiveStartDate;
    }
  }, {
    key: 'next2ButtonDisabled',
    get: function get() {
      var _props6 = this.props,
          date = _props6.activeStartDate,
          maxDate = _props6.maxDate,
          view = _props6.view;

      var nextActiveStartDate = (0, _dates.getBeginNext2)(view, date);
      return maxDate && maxDate <= nextActiveStartDate;
    }
  }, {
    key: 'label',
    get: function get() {
      var _props7 = this.props,
          date = _props7.activeStartDate,
          view = _props7.view;

      switch (view) {
        case 'century':
          return (0, _dates.getCenturyLabel)(date);
        case 'decade':
          return (0, _dates.getDecadeLabel)(date);
        case 'year':
          return (0, _dates.getYear)(date);
        case 'month':
          return (0, _dateFormatter.formatMonthYear)(date);
        default:
          throw new Error('Invalid view: ' + view + '.');
      }
    }
  }]);

  return Navigation;
}(_react.Component);

exports.default = Navigation;

Navigation.defaultProps = {
  next2Label: '»',
  nextLabel: '›',
  prev2Label: '«',
  prevLabel: '‹'
};

Navigation.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  drillUp: _propTypes2.default.func.isRequired,
  maxDate: _propTypes2.default.instanceOf(Date),
  minDate: _propTypes2.default.instanceOf(Date),
  next2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prev2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prevLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  setActiveStartDate: _propTypes2.default.func.isRequired,
  view: _propTypes3.isView.isRequired,
  views: _propTypes3.isViews.isRequired
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery(element).on('click', _.before(5, addContactToList));
 * // => Allows adding up to 4 contacts to the list.
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function () {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 */
function once(func) {
  return before(2, func);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? remainder ? result - remainder : result : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = once;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = __webpack_require__(5);

var _Flex2 = _interopRequireDefault(_Flex);

var _Decade = __webpack_require__(63);

var _Decade2 = _interopRequireDefault(_Decade);

var _dates = __webpack_require__(3);

var _utils = __webpack_require__(6);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Decades = function (_Component) {
  _inherits(Decades, _Component);

  function Decades() {
    _classCallCheck(this, Decades);

    return _possibleConstructorReturn(this, (Decades.__proto__ || Object.getPrototypeOf(Decades)).apply(this, arguments));
  }

  _createClass(Decades, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onClick = _props.onClick,
          renderChildren = _props.renderChildren,
          value = _props.value,
          valueType = _props.valueType;

      var decadeProps = {
        maxDate: maxDate,
        minDate: minDate,
        onClick: onClick,
        renderChildren: renderChildren
      };

      var decades = [];
      for (var decade = start; decade <= end; decade += 10) {
        var date = (0, _dates.getBeginOfDecade)(decade);

        decades.push(_react2.default.createElement(_Decade2.default, _extends({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'decade'), {
          date: date,
          decade: decade,
          key: decade
        }, decadeProps)));
      }

      return _react2.default.createElement(_Flex2.default, {
        className: 'react-calendar__century-view__decades',
        count: 3,
        wrap: true
      }, decades);
    }
  }, {
    key: 'start',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getBeginOfCenturyYear)(activeStartDate);
    }
  }, {
    key: 'end',
    get: function get() {
      return this.start + 99;
    }
  }]);

  return Decades;
}(_react.Component);

exports.default = Decades;

Decades.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = __webpack_require__(3);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var className = 'react-calendar__century-view__decades__decade';

var Decade = function Decade(_ref) {
  var active = _ref.active,
      date = _ref.date,
      decade = _ref.decade,
      hasActive = _ref.hasActive,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      renderChildren = _ref.renderChildren;
  return _react2.default.createElement('button', {
    className: [className, active ? 'react-calendar__tile--active' : '', hasActive ? 'react-calendar__tile--hasActive' : '', 'react-calendar__tile'].join(' '),
    disabled: minDate && (0, _dates.getBeginOfDecade)(minDate) > date || maxDate && (0, _dates.getEndOfDecade)(maxDate) < date,
    onClick: onClick && function () {
      return onClick(date);
    },
    style: { flexGrow: 1 },
    type: 'button'
  }, _react2.default.createElement('time', null, (0, _dates.getDecadeLabel)(decade)), renderChildren && renderChildren({ date: date, view: 'century' }));
};

Decade.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  decade: _propTypes2.default.number.isRequired,
  hasActive: _propTypes2.default.bool.isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func
};

exports.default = Decade;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = __webpack_require__(5);

var _Flex2 = _interopRequireDefault(_Flex);

var _Year = __webpack_require__(65);

var _Year2 = _interopRequireDefault(_Year);

var _dates = __webpack_require__(3);

var _utils = __webpack_require__(6);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Years = function (_Component) {
  _inherits(Years, _Component);

  function Years() {
    _classCallCheck(this, Years);

    return _possibleConstructorReturn(this, (Years.__proto__ || Object.getPrototypeOf(Years)).apply(this, arguments));
  }

  _createClass(Years, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onClick = _props.onClick,
          renderChildren = _props.renderChildren,
          value = _props.value,
          valueType = _props.valueType;

      var yearProps = {
        maxDate: maxDate,
        minDate: minDate,
        onClick: onClick,
        renderChildren: renderChildren
      };

      var years = [];
      for (var year = start; year <= end; year += 1) {
        var date = new Date(year, 0, 1);

        years.push(_react2.default.createElement(_Year2.default, _extends({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'year'), {
          date: date,
          key: year,
          year: year
        }, yearProps)));
      }

      return _react2.default.createElement(_Flex2.default, {
        className: 'react-calendar__decade-view__years',
        count: 3,
        wrap: true
      }, years);
    }
  }, {
    key: 'start',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getBeginOfDecadeYear)(activeStartDate);
    }
  }, {
    key: 'end',
    get: function get() {
      return this.start + 9;
    }
  }]);

  return Years;
}(_react.Component);

exports.default = Years;

Years.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = __webpack_require__(3);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var className = 'react-calendar__decade-view__years__year';

var Year = function Year(_ref) {
  var active = _ref.active,
      date = _ref.date,
      hasActive = _ref.hasActive,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      renderChildren = _ref.renderChildren,
      year = _ref.year;
  return _react2.default.createElement('button', {
    className: [className, active ? 'react-calendar__tile--active' : '', hasActive ? 'react-calendar__tile--hasActive' : '', 'react-calendar__tile'].join(' '),
    disabled: minDate && (0, _dates.getBeginOfYear)(minDate) > date || maxDate && (0, _dates.getEndOfYear)(maxDate) < date,
    onClick: onClick && function () {
      return onClick(date);
    },
    style: { flexGrow: 1 },
    type: 'button'
  }, _react2.default.createElement('time', { dateTime: year }, year), renderChildren && renderChildren({ date: date, view: 'decade' }));
};

Year.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  hasActive: _propTypes2.default.bool.isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func,
  year: _propTypes2.default.number.isRequired
};

exports.default = Year;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = __webpack_require__(5);

var _Flex2 = _interopRequireDefault(_Flex);

var _Month = __webpack_require__(67);

var _Month2 = _interopRequireDefault(_Month);

var _dates = __webpack_require__(3);

var _utils = __webpack_require__(6);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Months = function (_Component) {
  _inherits(Months, _Component);

  function Months() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Months);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Months.__proto__ || Object.getPrototypeOf(Months)).call.apply(_ref, [this].concat(args))), _this), _this.start = 0, _this.end = 11, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Months, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start,
          year = this.year;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onClick = _props.onClick,
          renderChildren = _props.renderChildren,
          value = _props.value,
          valueType = _props.valueType;

      var monthProps = {
        maxDate: maxDate,
        minDate: minDate,
        onClick: onClick,
        renderChildren: renderChildren
      };

      var months = [];
      for (var monthIndex = start; monthIndex <= end; monthIndex += 1) {
        var date = new Date(year, monthIndex, 1);

        months.push(_react2.default.createElement(_Month2.default, _extends({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'month'), {
          date: date,
          key: monthIndex
        }, monthProps)));
      }

      return _react2.default.createElement(_Flex2.default, {
        className: 'react-calendar__year-view__months',
        count: 3,
        wrap: true
      }, months);
    }
  }, {
    key: 'year',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getYear)(activeStartDate);
    }
  }]);

  return Months;
}(_react.Component);

exports.default = Months;

Months.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = __webpack_require__(3);

var _dateFormatter = __webpack_require__(13);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var className = 'react-calendar__year-view__months__month';

var Month = function Month(_ref) {
  var active = _ref.active,
      date = _ref.date,
      hasActive = _ref.hasActive,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      renderChildren = _ref.renderChildren;
  return _react2.default.createElement('button', {
    className: [className, active ? 'react-calendar__tile--active' : '', hasActive ? 'react-calendar__tile--hasActive' : '', 'react-calendar__tile'].join(' '),
    disabled: minDate && (0, _dates.getBeginOfMonth)(minDate) > date || maxDate && (0, _dates.getEndOfMonth)(maxDate) < date,
    onClick: onClick && function () {
      return onClick(date);
    },
    style: { flexGrow: 1 },
    type: 'button'
  }, _react2.default.createElement('time', { dateTime: date.toISOString() }, (0, _dateFormatter.formatMonth)(date)), renderChildren && renderChildren({ date: date, view: 'year' }));
};

Month.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  hasActive: _propTypes2.default.bool.isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func
};

exports.default = Month;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = __webpack_require__(5);

var _Flex2 = _interopRequireDefault(_Flex);

var _Day = __webpack_require__(69);

var _Day2 = _interopRequireDefault(_Day);

var _dates = __webpack_require__(3);

var _propTypes3 = __webpack_require__(2);

var _utils = __webpack_require__(6);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Days = function (_Component) {
  _inherits(Days, _Component);

  function Days() {
    _classCallCheck(this, Days);

    return _possibleConstructorReturn(this, (Days.__proto__ || Object.getPrototypeOf(Days)).apply(this, arguments));
  }

  _createClass(Days, [{
    key: 'render',
    value: function render() {
      var start = this.start,
          end = this.end,
          year = this.year,
          monthIndex = this.monthIndex;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onClick = _props.onClick,
          renderChildren = _props.renderChildren,
          value = _props.value,
          valueType = _props.valueType;

      var dayProps = {
        maxDate: maxDate,
        minDate: minDate,
        onClick: onClick,
        renderChildren: renderChildren
      };

      var days = [];
      for (var day = start; day <= end; day += 1) {
        var date = new Date(year, monthIndex, day);

        days.push(_react2.default.createElement(_Day2.default, _extends({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'day'), {
          currentMonthIndex: monthIndex,
          date: date,
          key: day
        }, dayProps)));
      }

      return _react2.default.createElement(_Flex2.default, {
        className: 'react-calendar__month-view__days',
        count: 7,
        offset: this.offset,
        wrap: true
      }, days);
    }
  }, {
    key: 'offset',
    get: function get() {
      if (this.props.showNeighboringMonth) {
        return 0;
      }

      var _props2 = this.props,
          activeStartDate = _props2.activeStartDate,
          calendarType = _props2.calendarType;

      return (0, _dates.getDayOfWeek)(activeStartDate, calendarType);
    }

    /**
     * Defines on which day of the month the grid shall start. If we simply show current
     * month, we obviously start on day one, but if showNeighboringMonth is set to
     * true, we need to find the beginning of the week the first day of the month is in.
     */

  }, {
    key: 'start',
    get: function get() {
      if (this.props.showNeighboringMonth) {
        var _props3 = this.props,
            activeStartDate = _props3.activeStartDate,
            calendarType = _props3.calendarType;

        return -(0, _dates.getDayOfWeek)(activeStartDate, calendarType) + 1;
      }
      return 1;
    }

    /**
     * Defines on which day of the month the grid shall end. If we simply show current
     * month, we need to stop on the last day of the month, but if showNeighboringMonth
     * is set to true, we need to find the end of the week the last day of the month is in.
     */

  }, {
    key: 'end',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      var daysInMonth = (0, _dates.getDaysInMonth)(activeStartDate);
      if (this.props.showNeighboringMonth) {
        var year = this.year,
            monthIndex = this.monthIndex;
        var calendarType = this.props.calendarType;

        var activeEndDate = new Date(year, monthIndex, daysInMonth);
        return daysInMonth + (7 - (0, _dates.getDayOfWeek)(activeEndDate, calendarType) - 1);
      }
      return daysInMonth;
    }
  }, {
    key: 'year',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getYear)(activeStartDate);
    }
  }, {
    key: 'monthIndex',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getMonthIndex)(activeStartDate);
    }
  }]);

  return Days;
}(_react.Component);

exports.default = Days;

Days.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarType: _propTypes3.isCalendarType.isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func,
  showNeighboringMonth: _propTypes2.default.bool,
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = __webpack_require__(3);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var className = 'react-calendar__month-view__days__day';

var Day = function Day(_ref) {
  var active = _ref.active,
      currentMonthIndex = _ref.currentMonthIndex,
      date = _ref.date,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      renderChildren = _ref.renderChildren;
  return _react2.default.createElement('button', {
    className: [className, 'react-calendar__tile', active ? 'react-calendar__tile--active' : '', (0, _dates.isWeekend)(date) ? className + '--weekend' : '', date.getMonth() !== currentMonthIndex ? className + '--neighboringMonth' : ''].join(' '),
    disabled: minDate && (0, _dates.getBeginOfDay)(minDate) > date || maxDate && (0, _dates.getEndOfDay)(maxDate) < date,
    key: date,
    onClick: onClick && function () {
      return onClick(date);
    },
    style: { flexGrow: 1 },
    type: 'button'
  }, _react2.default.createElement('time', { dateTime: date.toISOString() }, (0, _dates.getDay)(date)), renderChildren && renderChildren({ date: date, view: 'month' }));
};

Day.propTypes = {
  active: _propTypes2.default.bool.isRequired,
  currentMonthIndex: _propTypes2.default.number.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  renderChildren: _propTypes2.default.func
};

exports.default = Day;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = __webpack_require__(5);

var _Flex2 = _interopRequireDefault(_Flex);

var _dates = __webpack_require__(3);

var _dateFormatter = __webpack_require__(13);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Weekdays = function (_Component) {
  _inherits(Weekdays, _Component);

  function Weekdays() {
    _classCallCheck(this, Weekdays);

    return _possibleConstructorReturn(this, (Weekdays.__proto__ || Object.getPrototypeOf(Weekdays)).apply(this, arguments));
  }

  _createClass(Weekdays, [{
    key: 'render',
    value: function render() {
      var beginOfMonth = this.beginOfMonth,
          year = this.year,
          monthIndex = this.monthIndex;
      var calendarType = this.props.calendarType;

      var weekdays = [];

      for (var weekday = 1; weekday <= 7; weekday += 1) {
        var weekdayDate = new Date(year, monthIndex, weekday - (0, _dates.getDayOfWeek)(beginOfMonth, calendarType));

        weekdays.push(_react2.default.createElement('div', {
          className: 'react-calendar__month-view__weekdays__weekday',
          key: weekday,
          style: { flexGrow: 1 }
        }, (0, _dateFormatter.formatShortWeekday)(weekdayDate).replace('.', '')));
      }

      return _react2.default.createElement(_Flex2.default, {
        className: 'react-calendar__month-view__weekdays',
        count: 7
      }, weekdays);
    }
  }, {
    key: 'beginOfMonth',
    get: function get() {
      var month = this.props.month;

      return (0, _dates.getBeginOfMonth)(month);
    }
  }, {
    key: 'year',
    get: function get() {
      var beginOfMonth = this.beginOfMonth;

      return (0, _dates.getYear)(beginOfMonth);
    }
  }, {
    key: 'monthIndex',
    get: function get() {
      var beginOfMonth = this.beginOfMonth;

      return (0, _dates.getMonthIndex)(beginOfMonth);
    }
  }]);

  return Weekdays;
}(_react.Component);

exports.default = Weekdays;

Weekdays.propTypes = {
  calendarType: _propTypes3.isCalendarType.isRequired,
  month: _propTypes2.default.oneOfType([_propTypes2.default.string, // Only strings that are parseable to integer
  _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]).isRequired
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = __webpack_require__(3);

var _propTypes3 = __webpack_require__(2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var WeekNumbers = function (_Component) {
  _inherits(WeekNumbers, _Component);

  function WeekNumbers() {
    _classCallCheck(this, WeekNumbers);

    return _possibleConstructorReturn(this, (WeekNumbers.__proto__ || Object.getPrototypeOf(WeekNumbers)).apply(this, arguments));
  }

  _createClass(WeekNumbers, [{
    key: 'render',
    value: function render() {
      var year = this.year,
          monthIndex = this.monthIndex,
          day = this.day;
      var calendarType = this.props.calendarType;

      var weekNumbers = [];
      for (var index = 0; index < this.numberOfWeeks; index += 1) {
        var date = new Date(year, monthIndex, day + index * 7);
        weekNumbers.push((0, _dates.getWeekNumber)(date, calendarType));
      }

      return _react2.default.createElement('div', {
        className: 'react-calendar__month-view__weekNumbers',
        style: { flexBasis: 'calc(100% * (1 / 8)', flexShrink: 0 }
      }, weekNumbers.map(function (weekNumber) {
        return _react2.default.createElement('div', {
          className: 'react-calendar__tile',
          key: weekNumber
        }, _react2.default.createElement('span', null, weekNumber));
      }));
    }
  }, {
    key: 'numberOfDays',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getDaysInMonth)(activeStartDate);
    }
  }, {
    key: 'startWeekday',
    get: function get() {
      var _props = this.props,
          activeStartDate = _props.activeStartDate,
          calendarType = _props.calendarType;

      return (0, _dates.getDayOfWeek)(activeStartDate, calendarType);
    }
  }, {
    key: 'year',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getYear)(activeStartDate);
    }
  }, {
    key: 'monthIndex',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getMonthIndex)(activeStartDate);
    }
  }, {
    key: 'day',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getDay)(activeStartDate);
    }
  }, {
    key: 'numberOfWeeks',
    get: function get() {
      var days = this.numberOfDays - (7 - this.startWeekday);
      return 1 + Math.ceil(days / 7);
    }
  }]);

  return WeekNumbers;
}(_react.Component);

exports.default = WeekNumbers;

WeekNumbers.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarType: _propTypes3.isCalendarType.isRequired
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var detectElementOverflow = function detectElementOverflow(element, container) {
  return {
    get collidedTop() {
      return element.getBoundingClientRect().top < container.getBoundingClientRect().top;
    },
    get collidedBottom() {
      return element.getBoundingClientRect().bottom > container.getBoundingClientRect().bottom;
    },
    get collidedLeft() {
      return element.getBoundingClientRect().left < container.getBoundingClientRect().left;
    },
    get collidedRight() {
      return element.getBoundingClientRect().right > container.getBoundingClientRect().right;
    },
    get overflowTop() {
      return container.getBoundingClientRect().top - element.getBoundingClientRect().top;
    },
    get overflowBottom() {
      return element.getBoundingClientRect().bottom - container.getBoundingClientRect().bottom;
    },
    get overflowLeft() {
      return container.getBoundingClientRect().left - element.getBoundingClientRect().left;
    },
    get overflowRight() {
      return element.getBoundingClientRect().right - container.getBoundingClientRect().right;
    }
  };
};

exports.default = detectElementOverflow;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateFormatter = __webpack_require__(74);

var _dates = __webpack_require__(75);

var _locales = __webpack_require__(23);

var _propTypes3 = __webpack_require__(24);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var updateInputWidth = function updateInputWidth(element) {
  var span = document.createElement('span');
  span.innerHTML = element.value;

  var container = element.parentElement;

  container.appendChild(span);

  var width = span.clientWidth + 4;
  element.style.width = width + 'px';

  container.removeChild(span);
};

var min = function min() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Math.min.apply(Math, _toConsumableArray(args.filter(function (a) {
    return typeof a === 'number';
  })));
};
var max = function max() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Math.max.apply(Math, _toConsumableArray(args.filter(function (a) {
    return typeof a === 'number';
  })));
};

var DateInput = function (_Component) {
  _inherits(DateInput, _Component);

  function DateInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateInput);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      year: '',
      month: '',
      day: ''
    }, _this.onSubmit = function (event) {
      if (event.preventDefault) {
        event.preventDefault();
      }

      var form = event.target;

      var values = {};

      for (var i = 0; i < form.length; i += 1) {
        var element = form.elements[i];
        values[element.name] = element.value;
      }

      var formElements = [_this.dayInput, _this.monthInput, _this.yearInput].filter(function (a) {
        return a;
      });

      if (formElements.every(function (formElement) {
        return formElement.checkValidity();
      })) {
        var proposedValue = new Date(values.year, values.month - 1 || 0, values.day || 1);
        var processedValue = _this.getProcessedValue(proposedValue);
        if (_this.props.onChange) {
          _this.props.onChange(processedValue, false);
        }
      }
    }, _this.onKeyDown = function (event) {
      if (event.key === _this.divider) {
        event.preventDefault();

        var input = event.target;
        var nextInput = input.nextElementSibling;

        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      }
    }, _this.onChange = function (event) {
      _this.setState(_defineProperty({}, event.target.name, event.target.value));

      updateInputWidth(event.target);

      _this.onSubmit({ target: event.target.form });
    }, _this.onChangeNative = function (event) {
      var value = event.target.value;

      if (_this.props.onChange) {
        _this.props.onChange(new Date(value));
      }
    }, _this.stopPropagation = function (event) {
      return event.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateInput, [{
    key: 'getValueFrom',
    value: function getValueFrom(value) {
      if (!value) {
        return value;
      }
      var minDate = this.props.minDate;

      var rawValueFrom = value instanceof Array ? value[0] : value;
      var valueFrom = (0, _dates.getBegin)(this.valueType, rawValueFrom);
      return minDate && minDate > valueFrom ? minDate : valueFrom;
    }
  }, {
    key: 'getValueTo',
    value: function getValueTo(value) {
      if (!value) {
        return value;
      }
      var maxDate = this.props.maxDate;

      var rawValueFrom = value instanceof Array ? value[1] : value;
      var valueTo = (0, _dates.getEnd)(this.valueType, rawValueFrom);
      return maxDate && maxDate < valueTo ? maxDate : valueTo;
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getProcessedValue',
    value: function getProcessedValue(value) {
      var returnValue = this.props.returnValue;

      switch (returnValue) {
        case 'start':
          return this.getValueFrom(value);
        case 'end':
          return this.getValueTo(value);
        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _locales.setLocale)(this.props.locale);
      this.updateValues();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;

      if (nextProps.locale !== props.locale) {
        (0, _locales.setLocale)(nextProps.locale);
      }

      if (!!nextProps.value !== !!props.value || nextProps.value && props.value && nextProps.value.getTime() !== props.value.getTime()) {
        this.updateValues(nextProps);
      }
    }
  }, {
    key: 'updateValues',
    value: function updateValues() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var value = props.value;

      this.setState({
        year: value ? (0, _dates.getYear)(value) : '',
        month: value ? (0, _dates.getMonth)(value) : '',
        day: value ? (0, _dates.getDay)(value) : ''
      });
    }
  }, {
    key: 'renderDay',
    value: function renderDay() {
      var maxDetail = this.props.maxDetail;

      // Do not display if maxDetail is "year" or less

      if (allViews.indexOf(maxDetail) < 3) {
        return null;
      }

      return _react2.default.createElement('input', _extends({
        className: 'react-date-picker__button__input__day',
        name: 'day',
        key: 'day',
        max: this.maxDay,
        min: this.minDay,
        value: this.state.day
      }, this.commonInputProps));
    }
  }, {
    key: 'renderMonth',
    value: function renderMonth() {
      var maxDetail = this.props.maxDetail;

      // Do not display if maxDetail is "decade" or less

      if (allViews.indexOf(maxDetail) < 2) {
        return null;
      }

      return _react2.default.createElement('input', _extends({
        className: 'react-date-picker__button__input__month',
        name: 'month',
        key: 'month',
        max: this.maxMonth,
        min: this.minMonth,
        value: this.state.month
      }, this.commonInputProps));
    }
  }, {
    key: 'renderYear',
    value: function renderYear() {
      return _react2.default.createElement('input', _extends({
        className: 'react-date-picker__button__input__year',
        name: 'year',
        key: 'year',
        max: this.maxYear,
        min: this.minYear,
        step: this.yearStep,
        value: this.state.year
      }, this.commonInputProps));
    }
  }, {
    key: 'renderCustomInputs',
    value: function renderCustomInputs() {
      var _this2 = this;

      var divider = this.divider,
          placeholder = this.placeholder;

      return placeholder.split('')
      // Internet Explorer specific
      .filter(function (a) {
        return a.charCodeAt(0) !== 8206;
      }).join('').split(divider).map(function (part) {
        switch (part) {
          case 'day':
            return _this2.renderDay();
          case 'month':
            return _this2.renderMonth();
          case 'year':
            return _this2.renderYear();
          default:
            return null;
        }
      }).filter(function (part) {
        return part;
      }).reduce(function (result, element, index, array) {
        result.push(element);

        if (index + 1 < array.length) {
          result.push(divider);
        }

        return result;
      }, []);
    }
  }, {
    key: 'renderNativeInput',
    value: function renderNativeInput() {
      var nativeValueParser = this.nativeValueParser;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          value = _props.value;

      return _react2.default.createElement('input', {
        type: this.nativeInputType,
        max: maxDate ? nativeValueParser(maxDate) : null,
        min: minDate ? nativeValueParser(minDate) : null,
        name: 'date',
        onChange: this.onChangeNative,
        onFocus: this.stopPropagation,
        step: this.yearStep,
        style: {
          visibility: 'hidden',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px'
        },
        value: value ? nativeValueParser(value) : ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'react-date-picker__button__input' }, _react2.default.createElement('form', { onSubmit: this.onSubmit }, _react2.default.createElement('button', { type: 'submit', style: { display: 'none' } }), this.renderNativeInput(), this.renderCustomInputs()));
    }
  }, {
    key: 'maxDay',
    get: function get() {
      var maxDate = this.props.maxDate;
      var _state = this.state,
          month = _state.month,
          year = _state.year;

      return min(this.currentMonthMaxDays, maxDate && year === (0, _dates.getYear)(maxDate) && month === (0, _dates.getMonth)(maxDate) && (0, _dates.getDay)(maxDate));
    }
  }, {
    key: 'minDay',
    get: function get() {
      var minDate = this.props.minDate;
      var _state2 = this.state,
          month = _state2.month,
          year = _state2.year;

      return max(1, minDate && year === (0, _dates.getYear)(minDate) && month === (0, _dates.getMonth)(minDate) && (0, _dates.getDay)(minDate));
    }
  }, {
    key: 'maxMonth',
    get: function get() {
      var maxDate = this.props.maxDate;
      var year = this.state.year;

      return min(12, maxDate && year === (0, _dates.getYear)(maxDate) && (0, _dates.getMonth)(maxDate));
    }
  }, {
    key: 'minMonth',
    get: function get() {
      var minDate = this.props.minDate;
      var year = this.state.year;

      return max(1, minDate && year === (0, _dates.getYear)(minDate) && (0, _dates.getMonth)(minDate));
    }
  }, {
    key: 'maxYear',
    get: function get() {
      var maxDate = this.props.maxDate;

      return maxDate ? (0, _dates.getYear)(maxDate) : null;
    }
  }, {
    key: 'minYear',
    get: function get() {
      var minDate = this.props.minDate;

      return max(1000, minDate && (0, _dates.getYear)(minDate));
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;

      return allValueTypes[allViews.indexOf(maxDetail)];
    }
  }, {
    key: 'nativeInputType',
    get: function get() {
      switch (this.valueType) {
        case 'decade':
        case 'year':
          return 'number';
        case 'month':
          return 'month';
        case 'day':
          return 'date';
        default:
          throw new Error('Invalid valueType.');
      }
    }
  }, {
    key: 'nativeValueParser',
    get: function get() {
      switch (this.valueType) {
        case 'century':
        case 'decade':
        case 'year':
          return _dates.getYear;
        case 'month':
          return _dates.getISOLocalMonth;
        case 'day':
          return _dates.getISOLocalDate;
        default:
          throw new Error('Invalid valueType.');
      }
    }
  }, {
    key: 'yearStep',
    get: function get() {
      if (this.valueType === 'century') {
        return 10;
      }
      return 1;
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'divider',
    get: function get() {
      var date = new Date(2017, 11, 11);

      return (0, _dateFormatter.formatDate)(date).split('')
      // Internet Explorer specific
      .filter(function (a) {
        return a.charCodeAt(0) !== 8206;
      }).join('').match(/[^0-9]/)[0];
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'placeholder',
    get: function get() {
      var date = new Date(2017, 11, 11);

      return (0, _dateFormatter.formatDate)(date).replace('2017', 'year').replace('12', 'month').replace('11', 'day');
    }
  }, {
    key: 'currentMonthMaxDays',
    get: function get() {
      var value = this.props.value;

      if (!value) {
        return null;
      }

      return (0, _dates.getDaysInMonth)(value);
    }
  }, {
    key: 'commonInputProps',
    get: function get() {
      var _this3 = this;

      return {
        type: 'number',
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        required: true,
        ref: function ref(_ref2) {
          if (!_ref2) {
            return;
          }

          // Save a reference to each input field
          _this3[_ref2.name + 'Input'] = _ref2;

          updateInputWidth(_ref2);
        }
      };
    }
  }]);

  return DateInput;
}(_react.Component);

exports.default = DateInput;

DateInput.defaultProps = {
  maxDetail: 'month',
  returnValue: 'start'
};

DateInput.propTypes = {
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews).isRequired,
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  returnValue: _propTypes2.default.oneOf(['start', 'end']).isRequired,
  value: _propTypes2.default.instanceOf(Date)
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatMonthYear = exports.formatDate = undefined;

var _locales = __webpack_require__(23);

var formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
var getFormatter = function getFormatter(options) {
  var locales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _locales.getLocale)();

  var stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locales]) {
    formatterCache[locales] = {};
  }

  if (!formatterCache[locales][stringifiedOptions]) {
    formatterCache[locales][stringifiedOptions] = new Intl.DateTimeFormat(locales, options).format;
  }

  return formatterCache[locales][stringifiedOptions];
};

var formatDate = exports.formatDate = function formatDate(date) {
  return getFormatter({ day: 'numeric', month: 'numeric', year: 'numeric' })(date);
};

var formatMonthYear = exports.formatMonthYear = function formatMonthYear(date) {
  return getFormatter({ month: 'long', year: 'numeric' })(date);
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getISOLocalDate = exports.getISOLocalMonth = exports.getMonth = exports.getEnd = exports.getBegin = exports.getDaysInMonth = exports.getDay = exports.getMonthIndex = exports.getYear = undefined;

var _dates = __webpack_require__(3);

exports.getYear = _dates.getYear;
exports.getMonthIndex = _dates.getMonthIndex;
exports.getDay = _dates.getDay;
exports.getDaysInMonth = _dates.getDaysInMonth;
exports.getBegin = _dates.getBegin;
exports.getEnd = _dates.getEnd;

/* Simple getters - getting a property of a given point in time */

var getMonth = exports.getMonth = function getMonth(date) {
  return date.getMonth() + 1;
};

/* Complex getters - getting a property somehow related to a given point in time */

/**
 * Returns local month in ISO-like format (YYYY-MM).
 */
var getISOLocalMonth = exports.getISOLocalMonth = function getISOLocalMonth(value) {
  if (!value) {
    return value;
  }

  if (!(value instanceof Date)) {
    throw new Error('Invalid date: ' + value);
  }

  var year = (0, _dates.getYear)(value);
  var month = ('0' + getMonth(value)).slice(-2);

  return year + '-' + month;
};

/**
 * Returns local date in ISO-like format (YYYY-MM-DD).
 */
var getISOLocalDate = exports.getISOLocalDate = function getISOLocalDate(value) {
  if (!value) {
    return value;
  }

  if (!(value instanceof Date)) {
    throw new Error('Invalid date: ' + value);
  }

  var year = (0, _dates.getYear)(value);
  var month = ('0' + getMonth(value)).slice(-2);
  var day = ('0' + (0, _dates.getDay)(value)).slice(-2);

  return year + '-' + month + '-' + day;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./DatePicker.css", function() {
			var newContent = require("!!../../css-loader/index.js!./DatePicker.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, ".react-date-picker {\n  display: inline-flex;\n  position: relative;\n}\n.react-date-picker,\n.react-date-picker *,\n.react-date-picker *:before,\n.react-date-picker *:after {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.react-date-picker__button {\n  min-width: 135px;\n  display: flex;\n  border: thin solid gray;\n}\n.react-date-picker__button__input {\n  flex-grow: 1;\n  display: flex;\n  padding: 0 2px;\n}\n.react-date-picker__button__input form {\n  display: flex;\n  align-items: baseline;\n  height: 100%;\n}\n.react-date-picker__button__input input {\n  min-width: 9px;\n  height: 100%;\n  padding: 1px;\n  border: 0;\n  -moz-appearance: textfield;\n}\n.react-date-picker__button__input input::-webkit-outer-spin-button,\n.react-date-picker__button__input input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.react-date-picker__button__input input:invalid {\n  background: rgba(255, 0, 0, 0.1);\n}\n.react-date-picker__button__icon {\n  border: 0;\n  background: transparent;\n  padding: 4px 6px;\n}\n.react-date-picker__button__icon svg {\n  display: inherit;\n}\n.react-date-picker__calendar {\n  width: 350px;\n  max-width: 100%;\n  position: absolute;\n  top: 100%;\n  left: 0;\n}\n.react-date-picker__calendar--closed {\n  display: none;\n}\n.react-date-picker__calendar--above-label {\n  bottom: 100%;\n  top: auto;\n}\n.react-date-picker__calendar .react-calendar {\n  border-width: thin;\n}\n", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./guideForm.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./guideForm.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, ".file-input {\n  z-index: 1 !important; }\n", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map