(function() {
  "use strict";
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(jQuery);
    }
  })(function($) {
    var Pagination;
    Pagination = (function() {
      function Pagination(parentElement, data, setting) {
        this.parentElement = parentElement;
        this.setting = setting;
        this.className = "honey-pagination";
        this.initUI(data);
      }

      Pagination.prototype.initUI = function(data) {
        var lis, lisData, ui;
        lisData = this.generateLIData(data);
        lis = this.generateLIElements(lisData, data.pageIndex);
        ui = this.generateUI(lis);
        this.parentElement.html(ui);
        return this.pageElement = this.parentElement.find("ul." + this.className + ":first");
      };

      Pagination.prototype.generateArray = function(number, start) {
        var arr, index, _i;
        if (start == null) {
          start = 0;
        }
        arr = [];
        for (index = _i = 0; 0 <= number ? _i <= number : _i >= number; index = 0 <= number ? ++_i : --_i) {
          arr.push(index + 1 + start);
        }
        return arr;
      };

      Pagination.prototype.generateLIElements = function(arr, pageIndex) {
        var clazz, index, lis, _i, _len;
        lis = [];
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          index = arr[_i];
          clazz = '';
          if (index === pageIndex) {
            clazz = "class='active'";
          }
          lis.push("<li " + clazz + "><a href='#'>" + index + "</a></li>");
        }
        return lis.join('');
      };

      Pagination.prototype.generateLIData = function(data) {
        var maxPage, middle, minPrefix, minSuffix, pageCount, pageIndex, pageNumber, prefix, setting, suffix;
        setting = this.setting;
        prefix = setting.prefix;
        suffix = setting.suffix;
        minPrefix = setting.minPrefix;
        minSuffix = setting.minSuffix;
        middle = setting.middle;
        maxPage = setting.maxPage;
        pageCount = +data.pageCount;
        pageIndex = +data.pageIndex;
        if (pageCount < maxPage) {
          return this.generateArray(pageCount);
        }
        if (pageIndex < prefix) {
          pageNumber = this.generateArray(prefix);
          pageNumber.push('...');
          pageNumber = pageNumber.concat(this.generateArray(minSuffix, pageCount - minSuffix));
        } else if (pageIndex > (pageCount - suffix + 1)) {
          pageNumber = this.generateArray(minPrefix);
          pageNumber.push('...');
          pageNumber = pageNumber.concat(this.generateArray(suffix, pageCount - suffix));
        } else {
          pageNumber = this.generateArray(minPrefix);
          pageNumber.push('...');
          pageNumber = pageNumber.concat(this.generateArray(middle, pageIndex - parseInt((middle - 1) / 2) - 1));
          pageNumber.push('...');
          pageNumber = pageNumber.concat(this.generateArray(minSuffix, pageCount - minSuffix));
        }
        return pageNumber;
      };

      Pagination.prototype.generateUI = function(lis) {
        var className;
        if (lis == null) {
          lis = '';
        }
        className = this.className;
        return this.html = "<ul class='" + className + "'> <li><a href='#'><<</a></li> " + lis + " <li><a href='#'>>></a></li> </ul>";
      };

      return Pagination;

    })();
    return $.fn.pagination = function(pageData, options) {
      var data, defaultData, defaultSetting, pager, setting;
      defaultSetting = {
        prefix: 7,
        suffix: 7,
        minPrefix: 3,
        minSuffix: 3,
        middle: 5,
        maxPage: 15,
        goto: function() {}
      };
      defaultData = {
        pageCount: 1,
        pageIndex: 1
      };
      setting = $.extend(defaultSetting, options);
      data = $.extend(defaultData, pageData);
      pager = new Pagination(this, data, setting);
      return pager;
    };
  });

}).call(this);
