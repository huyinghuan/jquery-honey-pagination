"use strict"

(((factory)->
  if typeof define is 'function' and define.amd
    define ['jquery'], factory
  else
    factory jQuery
)(($)->
  utils = {}
  utils.coverDataToInteger = (data)->
    if  typeof data isnt 'object'
      return parseInt data
    reg = /^\d+$/
    data[key] = +value for key, value of data when reg.test value
    return data

  class Pagination
    ###
    # 接收三个参数，第一个是jquery dom， 分页组件会插入到该dom元素中
    # 第二是，分页数据 json object，必须包含两个字段 pageIndex 初始化时的当前页码，pageCount 总页数。
    # 如果没有填写，则默认为1, 1
    # 第三个是可选参数，对于分页的一些设置。json object
    ###
    constructor: (parentElement, data, setting)->
      @parentElement = parentElement
      @setting = setting
      @data = data
      @className = setting.className or "honey-pagination" #分页组件的样式名称
      @generateUI();

    #初始化ui
    generateUI: ()->
      lisData = @generateLIData()
      lis = @generateLIElements lisData
      ul = @generateULElements lis
      @parentElement.html ul
      @pageElement = @parentElement.find("ul.#{@className}:first")
      #初始化事件监听器
      @bindListener()

    #获取省略号代表的页码。
    getEllipsisIndex: (node)->
      currentIndex = @data.pageIndex
      prevNode = node.prev()
      nextNode = node.next()

      prevIndex = +prevNode.data('value')
      nextIndex = +nextNode.data('value')
      return nextIndex - 1 if currentIndex > prevIndex
      return prevIndex + 1  if currentIndex < nextIndex

    bindListener: ()->
      self = @
      ellipsis = @setting.pageEllipsis
      @pageElement.find('li').bind 'click', ()->
        pageIndex = $(this).data('value')
        if pageIndex is -1
          pageIndex = self.data.pageCount
        else if pageIndex is ellipsis
          pageIndex = self.getEllipsisIndex($(this))
        self.data.pageIndex =pageIndex
        self.setting.goto && self.setting.goto self.data
        self.generateUI()

    #跳转到某页, 接收一个数字表示要跳转的页码。或者接收一个json object对象，包含pageIndex，pageCount
    goToPage: (data)->
      data = pageIndex: data if typeof data is 'number'
      @data = $.extend @data, data
      @generateUI()
      return;

    #生成数组
    generateArray: (number, start = 0)->
      arr = []
      arr.push index+1+start for index in [0..number-1]
      return arr

    #生成li 元素
    generateLIElements: (arr)->
      @data.pageIndex = @data.pageCount if @data.pageIndex > @data.pageCount
      @data.pageindex = 1 if @data.pageIndex < 1

      pageIndex = @data.pageIndex
      href  = @setting.href
      lis = []
      for index in arr
        clazz = ''
        if index is pageIndex
          clazz = "class='active'"
        lis.push "<li #{clazz} data-value=#{index}><a href='#{href}#{index}'>#{index}</a></li>"
      lis.join('')

    #生成LI的数据
    generateLIData: ()->
      setting = @setting
      prefix = setting.prefix
      suffix = setting.suffix
      minPrefix = setting.minPrefix
      minSuffix = setting.minSuffix
      middle = setting.middle
      maxPage = setting.maxPage
      pageCount = parseInt(@data.pageCount or 1, 10)
      pageIndex = parseInt(@data.pageIndex or 1, 10)
      #页面总数少于设置的最大不忽略显示页面数
      return @generateArray pageCount if pageCount < maxPage

      ellipsis = @setting.pageEllipsis

      #当前页面靠前
      if pageIndex < prefix
        pageNumber = @generateArray prefix
        pageNumber.push ellipsis
        pageNumber = pageNumber.concat @generateArray minSuffix, pageCount - minSuffix
      #当前页面靠后
      else if pageIndex > (pageCount - suffix + 1)
        pageNumber = @generateArray minPrefix
        pageNumber.push ellipsis
        pageNumber = pageNumber.concat @generateArray suffix, pageCount - suffix
      #当前页居中
      else
        pageNumber = @generateArray minPrefix
        pageNumber.push ellipsis
        pageNumber = pageNumber.concat @generateArray middle, pageIndex - parseInt((middle-1)/2) - 1
        pageNumber.push ellipsis
        pageNumber = pageNumber.concat @generateArray minSuffix, pageCount - minSuffix

      return pageNumber

    #生成ul
    generateULElements: (lis = '')->
      className = @className
      @html = "
        <ul class='#{className}'>
          <li data-value=1><a href='#'><<</a></li>
          #{lis}
          <li data-value=-1><a href='#'>>></a></li>
        </ul>
      "


  $.fn.pagination = (pageData, options)->
    defaultSetting =
      prefix: 7 #当前页码靠前时，靠前部分的页码显示多少个
      suffix: 7 #当前页码靠后时，靠后部分的页码显示多少个
      minPrefix: 3 #当前页码靠后时，靠前部分的页面显示多少个
      minSuffix: 3 #当前页码靠前时，靠后部分的页码显示多少个
      middle: 5 #当前页面靠中时， 中部页面显示多少个
      maxPage: 15 #在多少个页面内不省写
      href: '#'
      pageEllipsis: '...'
      gone: (data)->
        console.log data

    defaultData =
      pageCount: 1
      pageIndex: 1

    setting = $.extend defaultSetting, options
    data = $.extend defaultData, pageData

    #转整数
    utils.coverDataToInteger data
    utils.coverDataToInteger setting

    pager = new Pagination(this, data, setting)

    #公开的方法
    pub =
      goto: (data)->
        data = utils.coverDataToInteger data
        pager.goToPage data
      _pager_: pager
))