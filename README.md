jquery.honey.pagination
------------
A jquery plugin for pagination.

## Dependencies

Jquery

## GettingStart
### How to install
#### Install pagination if you know bower.js

```shell
git clone https://github.com/huyinghuan/jquery-honey-pagination.git pagination
cd pagination
bower install jquery.honey.pagination
```
and open ```index.html``` see the demo

or open ```index-require.html``` in a http server. (because requirejs need it)

#### Install pagination If you don't know bower.js
Just download it and import jquery.js and jquery.honey.pagination.js in your html page if you don't have bower.js .

```shell
git clone https://github.com/huyinghuan/jquery-honey-pagination.git pagination
```
you can get it from pagination/lib/jquery.honey.pagination.js

### How to use

#### Usually
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
#### AMD
If you want load it by requirejs, the demo become
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

### Where is Demo?

```shell
git clone https://github.com/huyinghuan/jquery-honey-pagination.git pagination
```

```pagination/index.html``` or ```pagination/index-require.html```



## Init

```
$(selector).pagination(pageDate, setting)
```


## Setting


### pageDate

#### pageDate.pageIndex



#### pageDate.pageCount



### setting
#### setting.pageIndex

  the current page index.
  
#### setting.pageCount

  the total page count.
  
#### setting.prefix

  default is 7

#### setting.suffix

  default is 7

#### setting.minPrefix

  default is 3
  
#### setting.minSuffix

  default is 3
 
#### setting.middle

  default is 5

#### setting.maxPage

  default is 15

#### setting.href
 
  default is ```#```

#### setting.pageEllipsis

  default is ```...```
  
#### setting.className

  default is ```hhoney-pagination```

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
pager = $(selector).pagination(setting)

pager.goto(2)
//or
pager.goto({pageIndex: 2})
//or
pager.goto({pageIndex: 2, pageCount: 45})
//or
$(selector).pagination('goto', 4)
//or
$(selector).pagination('goto', {pageIndex: 2})
//or
$(selector).pagination('goto' ,{pageIndex: 2, pageCount: 45})
```
### Events

```
pager.on('goto', function(event, data){
  console.log(data)
})
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
v0.0.3

1. fix a bug

v0.0.2

1. return a jquery object
2. bind ```goto``` function to pagination
3. add ```goto``` event

v0.0.1

1. finish version 0.0.1


