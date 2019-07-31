# 原生造jQuery轮子 #

目标:
1. 通过造轮子加深js语言了解 顺便读一下源代码
2. 加深对原型 原型链的 了解

具体思路: 
1. 首先我就想到了用原型链来解决问题

```javascript

    var jQuery = function(selector) {
    }
    
    jQuery.prototype = {
      addClass: function() {
        console.log('add Class')
      }
    }
    
    var $node = new jQuery()
    $node.addClass()
    
    window.$ = jQuery
    $().addClass

```

很简单，但是不理想 真正的jQuery是不会new一下的 ...

2. 然后我尝试用return new jQuery(selector)一个来实现
出现了无限循环 没有发现addClass对象等问题

3. 最终解决方案

```javascript

    var jQuery = function(selector) {
      return new jQuery.fn.init(selector)
    }
    
    jQuery.fn = jQuery.prototype = {
      constructor: jQuery,
    
      init: function() {
        console.log(this)
      },
    
      addClass: function() {
        console.log(this)
        console.log('add Class')
        return this
      }
    }
    
    //最终解决方案
    jQuery.fn.init.prototype = jQuery.fn
    
    window.$ = jQuery
    
    /*
        1. 我们因为定义了一个init函数 所以只能初始化一次
        2. 然后通过 jQuery.fn.init.prototype = jQuery.fn 解决函数挂载问题
        3. 在用return this 来解决链式调用问题
    */
```
    

4. 然后在用写的extend函数解决函数模块化 防止因为写在prototype所产生一个错误导致了整个js都不能用的问题

然后我有写了几个方法 也可以大家提供一下方法~

https://github.com/Xia121/ImitationJq.git









