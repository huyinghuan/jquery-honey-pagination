jquery.honey.pagination
------------
A plugin for pagination

## Fast GettingStart

### don't use bower.js
Just download it and import jquery.js and jquery.honey.pagination.js in your html page if you don't have bower.js .

#### Don't have requirejs
use it like this:

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
  <link href="pager.css" type="text/css" rel="stylesheet">
  <script src="jquery.js"></script>
  <script src="jquery.honey.pagination.js"></script>
</head>
<body>
<div id="test"></div>
<script>
 var test =  $("#test").pagination({pageIndex:12, pageCount: 25})
</script>
</body>
</html>
```
#### Use requirejs
if you use ```require.js```, the demo become
```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
  <link href="pager.css" type="text/css" rel="stylesheet">
  <script src="require.js"></script>
</head>
<body>
<div id="test"></div>
<script>
  require.config({
    paths:{
      jquery: 'jquery'
    }
  });
  require(['jquery.honey.pagination'], function(){
    $('#test').pagination({pageIndex:12, pageCount: 25})
  });
</script>
</body>
</html>
```

### Use bowerjs

```shell
git clone https://github.com/huyinghuan/jquery-honey-pagination.git pagination
cd pagination
bower install jquery.honey.pagination
```
and open ```index.html``` see the demo

or open ```index-require.html``` in a http server. (because requirejs need it)

## Setting

### Init

```
$(selector).pagination(pageDate, setting)
```

### pageDate

#### pageDate.pageIndex

the current page index.

#### pageDate.pageCount

the total page count.

### setting

#### setting.prefix
#### setting.suffix
#### setting.minPrefix
#### setting.minSuffix
#### setting.middle
#### setting.maxPage
#### setting.href
#### setting.pageEllipsis

#### setting.gone
a callback. call after click page index.like this:
```
function(pageDate){
  console.log(pageData.pageIndex)
  console.log(pageData.pageCount)
}
```

## API

### pager.goto

```

pager = $(selector).pagination(pageDate, setting)
pager.goto(2)
//or
pager.goto({pageIndex: 2})
//or
pager.goto({pageIndex: 2, pageCount: 45})
```

## Style.

the pagiantion structor is:
```html
<ul class="honey-pagination">
<li><a href='#'><<</a></li>
<li class='active'><a href='#'>1</a></li>
...
<li class='active'><a href='#'>100</a></li>
<li><a href='#'>>></a></li>
</ul>
```

if you want to change the css style. just override ```.honey-pagination``` or set ```ul``` className by setting.className 

## Licence
MIT

## History

v0.0.1
 finish version 0.0.1


