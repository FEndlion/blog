![](https://mmbiz.qpic.cn/mmbiz_jpg/2K5IuDFDWm8jgOdox6VzXuALCaEa2k8hEyuyEokZrAu1OxpnyXvT4wvGnuy1XIRAQQnvbhtncOSoGQsPOdm3Mg/0?wx_fmt=jpeg)

### 前言

倒计时是网页中最常见的一种功能，比如淘宝双十一定时抢购、小米手机定时抢购等，这些都是倒计时的常见场景。倒计时也是前端初学者必学的一个demo，正是由于倒计时功能的常见性，导致一些问题常常被忽略，比如：

1. 倒计时如何兼容跨时区的问题？
2. 在本地时间不准确的情况下，不依赖后端接口，如何保证倒计时精准无误？

也许在你刚开始学习前端，写倒计时的时候，并没有考虑上面的问题，但在真正的业务场景中，上面的问题会影响到倒计时的准确性的，是不容忽略的。

### 业务场景

> 活动页面中需要实现一个倒计时抢票功能，当北京时间为 2025/12/12 00:00:00 的时候，页面“立即抢票”按钮可点击。


### 1. 跨时区问题

看到上述场景，我们一般会想到下面的常规写法：


```
let target = Date.parse('2025/12/12 00:00:00');
let now = Date.now();
if(target <= now) {
    console.log('按钮可点击')
} else {
    console.log('按钮不可点击')
}
```
上面代码的核心思想：利用当前本地时间和目标时间比较。

上面代码看似正确，但没有考虑跨时区问题。北京时间到达了目标时间`2025/12/12 00:00:00`，由于不同的时区存在时差，其他时区有可能还没有到，所以按照代码逻辑，不同时区的用户有的可以点击抢票按钮，有的不可以，失去了公平性、同时性。

下面对时区的相关概念讲解一下：
 
 **时区**

> 时区是地球上的区域使用同一个时间定义。以前，人们通过观察太阳的位置（时角）决定时间，这就使得不同经度的地方的时间有所不同（地方时）。1863年，首次使用时区的概念。时区通过设立一个区域的标准时间部分地解决了这个问题。

**地球是自西向东自转，东边比西边先看到太阳，东边的时间也比西边的早。地球自转一周是24小时，所以划分为24个时区，即东1—12区，西1—12区，相邻两个时区的时间相差1小时**

> 例如，中国东8区的时间总比泰国东7区的时间早1小时，而比日本东9区的时间晚1小时。因此，出国旅行的人，必须随时调整自己的手表，才能和当地时间相一致。凡向西走，每过一个时区，就要把表拨慢1小时（比如2点拨到1点）；凡向东走，每过一个时区，就要把表拨快1小时（比如1点拨到2点）。并且规定英国（格林尼治天文台旧址）为本初子午线，即零度经线

**格林威治时间**

格林威治子午线上的地方时，或零时区（中时区）的区时叫做格林威治时间，也叫世界时。（更多详细的概念不说了，这里我们不需要。） 比如我们中国是东八区，北京时间是（GMT+08:00）

**本地与格林威治时间的时差：**

```
时差 = new Date().getTimezoneOffset(); // 单位是分钟
```

**已知格林威治时间，换算本地正确时间：**

本地时间 = 格林威治时间 - 时差

**已知本地时间，换算对应格林威治时间：**

格林威治时间 = 本地时间 + 时差

**已知本地时间，换算其他时区的时间：**

因为时区间的差异是以小时为单位的。所以算出0时区的时间后，再减去或加上相应的小时即可（东N区便+N小时，西N区便-N小时）。为了方便计算，东N区记做正数，西N区记做负数。

目标时区时间 = 本地时间 + 时差 + 时区间隔

**所以上面的业务场景，我们就可以把本地时间转换为东八区的北京时间，本地时间和目标倒计时时间都是东八区的时间，两者就可以进行比较判断了。**

```
let target = Date.parse('2025/12/12 00:00:00');
let now = getNowDate(8); // 将本地时间转换为东8区的时间

if(target <= now) {
    console.log('按钮可点击')
} else {
    console.log('按钮不可点击')
}


function getNowDate(timeZone) {
    var timezone = timeZone || 8; //目标时区时间，东八区
    // 本地时间和格林威治的时间差，单位为分钟
    var offset_GMT = new Date().getTimezoneOffset(); 
    // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var nowDate = new Date().getTime(); 
    var targetDate = nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000;
    return targetDate;
}
```


### 2. 本地时间不准问题

由于人为设置的原因，用户的本地时间，有可能不准确。要想保证倒计时的精确性，一般想到的方法是依赖后端接口，其实不依赖后端接口也可以保证倒计时精准，下面介绍下这两种方法：

**1. 服务端接口返回当前时间戳**
```
let targetTime =  Date.parse('2025/12/12 00:00:00');
let serverTime = getServerTime(); // 请求服务端接口，返回服务器当前时间戳
let localTime = getNowDate(8); // 用户本地时间戳

let timeOff = serverTime - localTime;
let rightTargetTime = targetTime - timeOff; // 去除偏差后的目标时间

if(rightTargetTime <= localTime) {
    console.log('按钮可点击')
} else {
    console.log('按钮不可点击')
}


function getNowDate(timeZone) {
    var timezone = timeZone || 8; //目标时区时间，东八区
    // 本地时间和格林威治的时间差，单位为分钟
    var offset_GMT = new Date().getTimezoneOffset(); 
    // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var nowDate = new Date().getTime(); 
    var targetDate = nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000;
    return targetDate;
}
```

核心思想：借助服务器接口返回正确的本地时间，然后和用户本地时间作比较，求出偏差值，根据偏差值计算出正确的目标时间。

**注意：** `serverTime`返回的是服务器时间，服务器部署在哪个时区，返回的就是哪个时区的时间，所以要确保返回的也是东八区才行。

**2. Head请求获取服务器时间戳**

**Head 请求**

> HEAD方法跟GET方法相同，只不过服务器响应时不会返回消息体。一个HEAD请求的响应中，HTTP头中包含的元信息应该和一个GET请求的响应消息相同。这种方法可以用来获取请求中隐含的元信息，而不用传输实体本身。也经常用来测试超链接的有效性、可用性和最近的修改。

一个HEAD请求的响应可被缓存，也就是说，响应中的信息可能用来更新之前缓存的实体。如果当前实体跟缓存实体的阈值不同（可通过Content-Length、Content-MD5、ETag或Last-Modified的变化来表明），那么这个缓存就被视为过期了。

HEAD请求常常被忽略，但是能提供很多有用的信息，特别是在有限的速度和带宽下。主要有以下特点：

1. 只请求资源的首部；
2. 检查超链接的有效性；
3. 检查网页是否被修改；
4. 多用于自动搜索机器人获取网页的标志信息，获取rss种子信息，或者传递安全认证信息等。

**如何使用Head请求获取服务器时间戳？**

每个get请求，`response header`响应头信息中都会返回**当前服务器对应的零时区时间**。

每个页面都会有html文档，这个也属于get请求，如下图所示：


![](https://mmbiz.qpic.cn/mmbiz_png/2K5IuDFDWm8jgOdox6VzXuALCaEa2k8hib2uklibbj1xQpchDuJoLj6lousGSVm31XdR5HiaDBLMFAwcnuwtFcJxQ/0?wx_fmt=png)

我们可以利用Head请求，拿到这个date头信息：

```
var xhr = new window.XMLHttpRequest;
xhr.responseType = "document";
// 通过get的方式请求当前文件
xhr.open("head", location.href);
xhr.send(null);
// 监听请求状态变化
xhr.onreadystatechange = function () {
    var time = null,
        curDate = null;
    if (xhr.readyState === 2) {
        // 获取响应头里的时间戳
        time = xhr.getResponseHeader("Date");
    }
};
```

得到的`time`是服务器对应的零时区的时间，通过下面代码可以转换为用户当前所在时区的时间：

```
new Date(time);
```

![](https://mmbiz.qpic.cn/mmbiz_png/2K5IuDFDWm8jgOdox6VzXuALCaEa2k8hf9JNzZbQ2vp0ibXXRRhdKGUWicrPbAoJsib1ibLticOkC3bXLjpiaUj4CT9A/0?wx_fmt=png)

所以倒计时代码就可以改写为：

```
var xhr = new window.XMLHttpRequest;
xhr.responseType = "document";
// 通过get的方式请求当前文件
xhr.open("head", location.href);
xhr.send(null);
// 监听请求状态变化
xhr.onreadystatechange = function () {
    var time = null,
        curDate = null;
    if (xhr.readyState === 2) {
        // 获取响应头里的时间戳
        time = xhr.getResponseHeader("Date");
        countDown(new Date(time).getTime());
    }
};

function countDown(time) {
    let targetTime =  Date.parse('2025/12/12 00:00:00');
    let serverTime = getNowDate(time, 8); // Head请求，返回服务器当前时间戳
    let localTime = getNowDate(Date.now(), 8); // 用户本地时间戳
    
    let timeOff = serverTime - localTime;
    let rightTargetTime = targetTime - timeOff; // 去除偏差后的目标时间
    
    if(rightTargetTime <= localTime) {
        console.log('按钮可点击')
    } else {
        console.log('按钮不可点击')
    }
}

function getNowDate(localTime, timeZone) {
    var timezone = timeZone || 8; //目标时区时间，东八区
    // 本地时间和格林威治的时间差，单位为分钟
    var offset_GMT = new Date().getTimezoneOffset(); 
    // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var nowDate = localTime; 
    var targetDate = nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000;
    return targetDate;
}

```
**这种方法相比第一种有如下优点：**

1. Head请求不需要后端接口支持；
2. 由于Head请求不返回消息体、浏览器缓存等原因，该方法性能更高；
3. 不需要关注服务器返回的时间戳的时区问题。

### 总结

上面的第二种方法就是我们最终想要的，前端可以不依赖后端，实现一个支持跨时区、兼容本地时间不准的倒计时了。

### 关注我
**扫一扫 关注我的公众号【前端名狮】，更多精彩内容陪伴你！**

![](https://user-gold-cdn.xitu.io/2019/9/8/16d105793144e24a?w=1080&h=309&f=webp&s=17610)


