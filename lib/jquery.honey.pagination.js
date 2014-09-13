(function() {
  "use strict";
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(jQuery);
    }
  })(function($) {
    var Pagination, utils;
    utils = {};
    utils.coverDataToInteger = function(data) {
      var key, reg, value;
      if (typeof data !== 'object') {
        return parseInt(data);
      }
      reg = /^\d+$/;
      for (key in data) {
        value = data[key];
        if (reg.test(value)) {
          data[key] = +value;
        }
      }
      return data;
    };
    Pagination = (function() {

      /*
       * 接收三个参数，第一个是jquery dom， 分页组件会插入到该dom元素中
       * 第二是，分页数据 json object，必须包含两个字段 pageIndex 初始化时的当前页码，pageCount 总页数。
       * 如果没有填写，则默认为1, 1
       * 第三个是可选参数，对于分页的一些设置。json object
       */
      function Pagination(parentElement, data, setting) {
        this.parentElement = parentElement;
        this.setting = setting;
        this.data = data;
        this.className = setting.className || "honey-pagination";
        this.generateUI();
      }

      Pagination.prototype.generateUI = function() {
        var lis, lisData, ul;
        lisData = this.generateLIData();
        lis = this.generateLIElements(lisData);
        ul = this.generateULElements(lis);
        this.parentElement.html(ul);
        this.pageElement = this.parentElement.find("ul." + this.className + ":first");
        return this.bindListener();
      };

      Pagination.prototype.getEllipsisIndex = function(node) {
        var currentIndex, nextIndex, nextNode, prevIndex, prevNode;
        currentIndex = this.data.pageIndex;
        prevNode = node.prev();
        nextNode = node.next();
        prevIndex = +prevNode.data('value');
        nextIndex = +nextNode.data('value');
        if (currentIndex > prevIndex) {
          return nextIndex - 1;
        }
        if (currentIndex < nextIndex) {
          return prevIndex + 1;
        }
      };

      Pagination.prototype.bindListener = function() {
        var ellipsis, self;
        self = this;
        ellipsis = this.setting.pageEllipsis;
        return this.pageElement.find('li').bind('click', function() {
          var pageIndex;
          pageIndex = $(this).data('value');
          if (pageIndex === -1) {
            pageIndex = self.data.pageCount;
          } else if (pageIndex === ellipsis) {
            pageIndex = self.getEllipsisIndex($(this));
          }
          self.data.pageIndex = pageIndex;
          self.setting.goto && self.setting.goto(self.data);
          return self.generateUI();
        });
      };

      Pagination.prototype.goToPage = function(data) {
        if (typeof data === 'number') {
          data = {
            pageIndex: data
          };
        }
        this.data = $.extend(this.data, data);
        this.generateUI();
      };

      Pagination.prototype.generateArray = function(number, start) {
        var arr, index, _i, _ref;
        if (start == null) {
          start = 0;
        }
        arr = [];
        for (index = _i = 0, _ref = number - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
          arr.push(index + 1 + start);
        }
        return arr;
      };

      Pagination.prototype.generateLIElements = function(arr) {
        var clazz, href, index, lis, pageIndex, _i, _len;
        if (this.data.pageIndex > this.data.pageCount) {
          this.data.pageIndex = this.data.pageCount;
        }
        if (this.data.pageIndex < 1) {
          this.data.pageindex = 1;
        }
        pageIndex = this.data.pageIndex;
        href = this.setting.href;
        lis = [];
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
          index = arr[_i];
          clazz = '';
          if (index === pageIndex) {
            clazz = "class='active'";
          }
          lis.push("<li " + clazz + " data-value=" + index + "><a href='" + href + index + "'>" + index + "</a></li>");
        }
        return lis.join('');
      };

      Pagination.prototype.generateLIData = function() {
        var ellipsis, maxPage, middle, minPrefix, minSuffix, pageCount, pageIndex, pageNumber, prefix, setting, suffix;
        setting = this.setting;
        prefix = setting.prefix;
        suffix = setting.suffix;
        minPrefix = setting.minPrefix;
        minSuffix = setting.minSuffix;
        middle = setting.middle;
        maxPage = setting.maxPage;
        pageCount = parseInt(this.data.pageCount || 1, 10);
        pageIndex = parseInt(this.data.pageIndex || 1, 10);
        if (pageCount < maxPage) {
          return this.generateArray(pageCount);
        }
        ellipsis = this.setting.pageEllipsis;
        if (pageIndex < prefix) {
          pageNumber = this.generateArray(prefix);
          pageNumber.push(ellipsis);
          pageNumber = pageNumber.concat(this.generateArray(minSuffix, pageCount - minSuffix));
        } else if (pageIndex > (pageCount - suffix + 1)) {
          pageNumber = this.generateArray(minPrefix);
          pageNumber.push(ellipsis);
          pageNumber = pageNumber.concat(this.generateArray(suffix, pageCount - suffix));
        } else {
          pageNumber = this.generateArray(minPrefix);
          pageNumber.push(ellipsis);
          pageNumber = pageNumber.concat(this.generateArray(middle, pageIndex - parseInt((middle - 1) / 2) - 1));
          pageNumber.push(ellipsis);
          pageNumber = pageNumber.concat(this.generateArray(minSuffix, pageCount - minSuffix));
        }
        return pageNumber;
      };

      Pagination.prototype.generateULElements = function(lis) {
        var className;
        if (lis == null) {
          lis = '';
        }
        className = this.className;
        return this.html = "<ul class='" + className + "'> <li data-value=1><a href='#'><<</a></li> " + lis + " <li data-value=-1><a href='#'>>></a></li> </ul>";
      };

      return Pagination;

    })();
    return $.fn.pagination = function(pageData, options) {
      var data, defaultData, defaultSetting, pager, pub, setting;
      defaultSetting = {
        prefix: 7,
        suffix: 7,
        minPrefix: 3,
        minSuffix: 3,
        middle: 5,
        maxPage: 15,
        href: '#',
        pageEllipsis: '...',
        gone: function(data) {
          return console.log(data);
        }
      };
      defaultData = {
        pageCount: 1,
        pageIndex: 1
      };
      setting = $.extend(defaultSetting, options);
      data = $.extend(defaultData, pageData);
      utils.coverDataToInteger(data);
      utils.coverDataToInteger(setting);
      pager = new Pagination(this, data, setting);
      return pub = {
        goto: function(data) {
          data = utils.coverDataToInteger(data);
          return pager.goToPage(data);
        },
        _pager_: pager
      };
    };
  });

}).call(this);
