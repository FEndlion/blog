
![](https://user-gold-cdn.xitu.io/2019/9/8/16d105793144e24a?w=1080&h=309&f=webp&s=17610)

### 前言

浏览器的渲染原理是每个前端开发工程师的必修课，网络上也有很多这方面的文章，但大多数只是告诉你浏览器表现就是这样的，并没有一个直观的认识，让人读完就瞬间忘却。

所以小编决定通过node实践来模拟浏览器渲染时的一些场景，对市面上的文章的一些观点进行验证，希望能够加深自己的认识。


动手实践之前，先了解下浏览器的渲染机制的一些基本知识，如下图所示：

![](https://mmbiz.qpic.cn/mmbiz_png/2K5IuDFDWmicicagsOXODyxzIp66NicFibxP8ZqibrCndq4ejETSKuvXlenCOMkpxawEOOVk77xhqUcmUvZPicQw8dfQ/0?wx_fmt=png)

> DOM：Document Object Model，浏览器将HTML解析成树形的数据结构，简称DOM。
> 
> CSSOM：CSS Object Model，浏览器将CSS代码解析成树形的数据结构
> 
> Render Tree：DOM 和 CSSOM 合并后生成 Render Tree(Render Tree 和DOM一样，以多叉树的形式保存了每个节点的css属性、节点本身属性、以及节点的孩子节点)

### Node实例推导

为了方便观察静态资源加载情况和渲染细节，用node搭建一个静态服务器，代码如下：

```
const http = require('http');
const fs = require('fs');

let hostname = '127.0.0.1';
let port = 8080;

let server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url == '/a.js') {
        fs.readFile('src/a.js', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            setTimeout(() => {
                res.write(data);
                res.end();
            }, 10000) // 延迟 10s 再返回 a.js 文件
        })
    } else if(req.url == '/b.js') {
        fs.readFile('src/b.js', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        })
    } else if(req.url == '/index.html') {
        fs.readFile('src/index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    } else if (req.url == '/style.css') {
        fs.readFile('src/style.css', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        })
    } 
})

server.listen(port, hostname, () => {
    console.log(`server has already started: ${hostname}:${port}`)
})
```

**从上面代码中，我们知道`a.js`的请求是延迟10s才响应返回的**

**启动服务器，在浏览器打开 `http://127.0.0.1:8080/index.html`**

***

**1. 验证问题一：外部静态资源是如何请求的？**

**index.html 文件内容**

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浏览器渲染原理</title>
    <script src='http://127.0.0.1:8080/a.js'></script>
    <link rel="stylesheet" href="http://127.0.0.1:8080/style.css">
</head>
<body>
    <p id='hh'>1111111</p>
    <script src='http://127.0.0.1:8080/b.js'></script>
    <p>222222</p>
    <p>3333333</p>
</body>
</html>
```
刷新页面看下Timeline，如下图所示：

![](https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWmibCibQ012ou7jKTYNnibTehvy3fzdwzp7LuldKADibomNbREicKibrjZeXa6LFibLURc8EmSsibmp8xrNsug/0?wx_fmt=gif)

从上面的动画中我们能得到如下几点：

1. 页面10s之后才展示，所以`a.js`阻塞了页面的渲染展示；
2. 第一次`Parse HTML`解析时，`a.js`造成了阻塞，预解析就去发起请求`style.css，b.js`，所以三个静态资源看起来是一起请求的，这一点需要看下后面的验证；
3. 三个静态资源都是在解析`html`标签时发起请求的，这一点也需要再验证。

下面修改一下html内容

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浏览器渲染原理</title>
    <link rel="stylesheet" href="http://127.0.0.1:8080/style.css">
</head>
<body>
    <p id='hh'>1111111</p>
    <p>重复</p>
    <p>重复</p>
    ....
    ....重复5000行
    <script src='http://127.0.0.1:8080/a.js'></script>
    <script src='http://127.0.0.1:8080/b.js'></script>
    <p>222222</p>
    <p>3333333</p>
</body>
</html>
```
刷新页面，会得到如下TimeLine图片：

![](https://mmbiz.qpic.cn/mmbiz_png/2K5IuDFDWmibCibQ012ou7jKTYNnibTehvyQzqIuUSvNVUzYZvCj3vSxKuvmMbmDA2MouMV5kNrdsyCn0iaPwA8ZHQ/0?wx_fmt=png)

从图中我们可以得知：

1. 当html内容太多的时候，浏览器需要分段接收，解析的时候也要分段解析；
2. 静态资源并不是同时请求的，也不是解析到指定标签的时候才去请求的，浏览器会自行判断，如果当前操作比较耗时，就会请求后面的资源，所以静态资源请求的时机是无法确定的，浏览器有多重兼容处理方案。


**2. 验证问题二：JS 对 HTML 的解析和渲染方面的影响**

```
// index.html 文件

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浏览器渲染原理</title>
    <link rel="stylesheet" href="http://127.0.0.1:8080/style.css">
</head>
<body>
    <p id='hh'>1111111</p>
    
    <script src='http://127.0.0.1:8080/b.js'></script>
    <script src='http://127.0.0.1:8080/a.js'></script>
    <p>222222</p>
    <p>3333333</p>
</body>
</html>
```

刷新页面，执行过程如下图动画所示：

![](https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWmicicagsOXODyxzIp66NicFibxPBmicPBvBIrBaJlrJtXQAcWwokwicr0J0j9PvhbkN8xEsXpgFFibhQ3Ysg/0?wx_fmt=gif)

从执行过程中我们发现，由于`a.js`的延迟返回，`a.js`没有下载完成，Dom树解析构建过程被阻塞停止，但`a.js`前面解析出来的html标签被渲染展示出来了。当`a.js`下载完成后，继续解析后面的标签并渲染展示。当然，浏览器不是解析一个标签就绘制显示一次，当遇到阻塞或者比较耗时的操作的时候才会先绘制一部分解析好的。

**综上可知，JS会阻塞页面的解析和渲染，这也是JS文件常被放在页面底部的原因**

**3.验证问题三：CSS 对页面渲染解析的影响**

修改服务器node代码，将`style.css`延迟10s再返回

```
// style.css

p:nth-child(1) {
    color: red;
}

p:nth-child(2) {
    color: blue;
}

p:nth-child(3) {
    color: green;
}

```

```
// index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浏览器渲染原理</title>
    <link rel="stylesheet" href="http://127.0.0.1:8080/style.css">
</head>
<body>
    <p id='hh'>1111111</p>
    <p>222222</p>
    <p>3333333</p>
</body>
</html>
```
刷新页面，执行过程如下图动画所示：

![](https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWmicicagsOXODyxzIp66NicFibxPTo5jjf6JeeZhlz3Xc0N3Vg6C9bGhHWKpV7nqiciaNfgX59KiavSAiawGDw/0?wx_fmt=gif)

从上面执行流程中发现，`style.css` 延迟10s后返回，页面dom 树被正常解析构建，但是没有被渲染展示。当css下载完成后，页面被被渲染并且样式生效。

修改`index.html`中`style.css`的位置，将其移到body最下方，代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浏览器渲染原理</title>
</head>
<body>
    <p id='hh'>1111111</p>
    <p>222222</p>
    <p>3333333</p>
    <link rel="stylesheet" href="http://127.0.0.1:8080/style.css">
</body>
</html>
```

刷新页面，执行过程如下图动画所示：

![](https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWmicicagsOXODyxzIp66NicFibxPNSuTKqkibPtnFVmchnzTKSGVibVqaXtCKjWR1VyHTZxMT37XGxia28ufg/0?wx_fmt=gif)

从动画中发现，`style.css`的延迟加载，没有阻塞前面的dom树的解析构建和渲染，渲染的`P`元素没有样式。当`style.css`下载完成后，元素的样式生效并展示。

**综上可知，`CSS`不阻塞dom树的构建解析，只会阻塞其后面元素的渲染，不会阻塞其前面元素的渲染。**

如果将CSS放到页面底部，会先渲染出不带样式的页面内容，等CSS加载样式会生效，页面看着会有抖动的现象，所以CSS一般放在`head`中。


**4. 图片对页面渲染解析的影响**

修改node代码，对`code.png`做延时处理，具体代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浏览器渲染原理</title>
    <link rel="stylesheet" href="http://127.0.0.1:8080/style.css">
</head>
<body>
    <p id='hh'>1111111</p>
    <img src="./code.png"/>
    <p>222222</p>
    <p>3333333</p>
</body>
</html>

```
刷新页面，执行过程如下图动画所示：

![](https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWmicicagsOXODyxzIp66NicFibxPf9sWw1G0IelV5PL1NmrAzeODUeo8mU100ia5ys0bC7Kq3q1JOdtsxuQ/0?wx_fmt=gif)

从动画中可以发现，**图片既不阻塞解析，也不阻塞渲染。**

### 总结

根据上面的实例，我们得到如下几点重要的结论：

1. 静态资源并不是同时请求的，也不是解析到指定标签的时候才去请求的，浏览器会自行判断；
2. JS 会阻塞页面的解析和渲染，同时浏览器也存在预解析，遇到阻塞可以继续解析下面的元素；
3. CSS`不阻塞dom树的构建解析，只会阻塞其后面元素的渲染，不会阻塞其前面元素的渲染；
4. 图片既不阻塞解析，也不阻塞渲染。

浏览器相对于开发者而言，如同黑盒，学习浏览器渲染方面的知识时，可以从浏览器源码或者浏览器提供的调试工具两方面进行学习，网上的一些文章总结最好动手实践下，这样印象会更深刻。

**参考**

> https://segmentfault.com/a/1190000007766425

**扫一扫 关注我的公众号【前端名狮】，更多精彩内容陪伴你！**

![](https://user-gold-cdn.xitu.io/2019/9/8/16d105793144e24a?w=1080&h=309&f=webp&s=17610)
