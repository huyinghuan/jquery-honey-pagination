"use strict"

(((factory)->
  if typeof define is 'function' and define.amd
    define ['jquery'], factory
  else
    factory jQuery
)(($)->
  class Pagination
    constructor: (parentElement, data, setting)->
      @parentElement = parentElement
      @setting = setting
      @className = "honey-pagination" #分页组件的样式名称
      @initUI(data);


    #初始化ui
    initUI: (data)->
      lisData = @generateLIData data
      lis = @generateLIElements lisData, data.pageIndex
      ui = @generateUI lis
      @parentElement.html ui
      @pageElement = @parentElement.find("ul.#{@className}:first")

    #生成数组
    generateArray: (number, start = 0)->
      arr = []
      arr.push index+1+start for index in [0..number]
      return arr

    #生成li 元素
    generateLIElements: (arr, pageIndex)->
      lis = []
      for index in arr
        clazz = ''
        if index is pageIndex
          clazz = "class='active'"
        lis.push "<li #{clazz}><a href='#'>#{index}</a></li>"
      lis.join('')

    #生成LI的数据
    generateLIData: (data)->
      setting = @setting
      prefix = setting.prefix
      suffix = setting.suffix
      minPrefix = setting.minPrefix
      minSuffix = setting.minSuffix
      middle = setting.middle
      maxPage = setting.maxPage
      pageCount = +data.pageCount
      pageIndex = +data.pageIndex
      #页面总数少于设置的最大不忽略显示页面数
      return @generateArray pageCount if pageCount < maxPage

      #当前页面靠前
      if pageIndex < prefix
        pageNumber = @generateArray prefix
        pageNumber.push '...'
        pageNumber = pageNumber.concat @generateArray minSuffix, pageCount - minSuffix
      #当前页面靠后
      else if pageIndex > (pageCount - suffix + 1)
        pageNumber = @generateArray minPrefix
        pageNumber.push '...'
        pageNumber = pageNumber.concat @generateArray suffix, pageCount - suffix
      #当前页居中
      else
        pageNumber = @generateArray minPrefix
        pageNumber.push '...'
        pageNumber = pageNumber.concat @generateArray middle, pageIndex - parseInt((middle-1)/2) - 1
        pageNumber.push '...'
        pageNumber = pageNumber.concat @generateArray minSuffix, pageCount - minSuffix

      return pageNumber

    #生成ui
    generateUI: (lis = '')->
      className = @className
      @html = "
        <ul class='#{className}'>
          <li><a href='#'><<</a></li>
          #{lis}
          <li><a href='#'>>></a></li>
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
      goto: ()->

    defaultData =
      pageCount: 1
      pageIndex: 1

    setting = $.extend defaultSetting, options
    data = $.extend defaultData, pageData

    pager = new Pagination(this, data, setting)

    return pager

))