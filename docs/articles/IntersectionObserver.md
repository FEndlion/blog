# 交叉观察器
![](/20.webp)

### IntersectionObserver 介绍

**概念**

> `IntersectionObserver`接口(从属于`Intersection Observer` API)为开发者提供了一种可以异步监听目标元素与其祖先或视窗(`viewport`)交叉状态的手段。祖先元素与视窗(`viewport`)被称为根(`root`)。

**功能**

网页开发时，常常需要判断某个元素是否进入了"视口"（viewport），即用户能不能看到它，然后执行相应的逻辑。

![](/21.gif)

常见的方法是监听`scroll`事件，调用元素的`getBoundingClientRect`方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于`scroll`事件密集发生，计算量很大，容易造成性能问题。

`IntersectionObserver`是一个新的API，可以自动观察元素是否进入视口。由于可见的本质是，目标元素与视口产生一个交叉区，所以这个API叫做“交叉观察器”。

**用法：**

```js
let io = new IntersectionObserver(callback, option);

// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```

**callback**

`callback`方法是被监听元素可见性发生时，执行的回调函数。一般会触发两次，一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。



```js
var io = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);
```

`entries`是一个数组，数组中的每一个元素都是`IntersectionObserverEntry`对象。特别注意，如果监听的是10个元素，但是只有2个元素可见性发生变化，数组`entries`的长度就是2，存放的只是可见性发生变化的元素。

**IntersectionObserverEntry对象**

`IntersectionObserverEntry`提供被观察元素的信息，有以下七个属性。

- `boundingClientRect` 目标元素的矩形信息

- `intersectionRatio` 相交区域和目标元素的比例值 

- `intersectionRect/boundingClientRect` 不可见时小于等于0

- `intersectionRect` 目标元素和视窗（根）相交的矩形信息 可以称为相交区域

- `isIntersecting` 目标元素当前是否可见 `Boolean`值 可见为`true`

- `rootBounds` 根元素的矩形信息，没有指定根元素就是当前视窗的矩形信息

- `target` 观察的目标元素

- `time` 返回一个记录从`IntersectionObserver`的时间到交叉被触发的时间的时间戳

**上面提到的回调执行两次的问题可以通过`IntersectionObserverEntry`对象的`isIntersecting`属性解决，通过这个属性判断是否是开始可见。**

***

**`option` 配置对象**

主要用于配置`IntersectionObserver`的一些观察行为属性，主要有以下属性：

**1. threshold**

threshold属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数。

```js
new IntersectionObserver(
  entries => {/* ... */}, 
  {
    threshold: [0.3, 0.5]
  }
);
```
如代码中所示，当目标元素**30%** 或者 **50%** 可见时，会触发callback回调。

**2. root 属性，rootMargin 属性**

`IntersectionObserver`不仅支持视口内滚动，还支持容器内滚动。`root`属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

`rootMargin`属性用来扩展或缩小`rootBounds`这个矩形的大小，从而影响`intersectionRect`交叉区域的大小。它使用`CSS`的定义方法，比如`10px 20px 30px 40px`，表示 `top、right、bottom` 和 `left` 四个方向的值。

```js
var opts = { 
  root: document.querySelector('.container'),
  rootMargin: "500px 0px" 
};

var observer = new IntersectionObserver(
  callback,
  opts
);
```

### 应用实践

基于这个API高性能的特性，小编在日常的业务中做了如下的实践，使用效果很不错，同时也简化了业务实现逻辑。

1. 滚动页面，滑动到指定区域，切换TAB栏选中按钮；
2. 长页面滑动时，页面模块的曝光量的数据统计；


### 1. 滚动切换TAB

效果如下图：

![](/22.gif)

具体实现代码如下：

```js
// index.html

<div class="default-labelSwitch" id="hotList">
    <!-- 选中状态给li 加selected -->
    <ul>
        <li class="selected" data-hash="cashiermodule" ></li>
        <li data-hash="seckillcont"></li>
        <li data-hash="powervalue"></li>
    </ul>
</div>


<div id="cashiermodule" type="lists">
...

</div>

<div id="seckillcont" type="lists">
...

</div>

<div id="powervalue" type="lists">
...

</div>

```

```js
// 监听页面模块cashiermodule、seckillcont、powervalue是否进入可视区域

require('intersection-observer');

let io = new IntersectionObserver(entries => {
    entries.forEach(item => {
        if(item.isIntersecting && item.intersectionRatio >= 0.7) {
            let target = $(item.target);
            let id = target.attr('id');
            oLis.removeClass('selected');
            $(`[data-hash*="${id}"]`).addClass('selected');
        }
    })
}, {
    threshold: [0.7]
})

let blocks = $('[type*="lists"]');
blocks.forEach(item => {
    io.observe(item);
})
```
可以看到，实现了模块进入视口区域70%时，就会触发回调，切换tab栏的按钮选中状态。

### 2. 统计页面模块曝光量

![](/23.gif)

具体代码如下：

```js
// index.html

<div block="moduleA">
...

</div>

<div block="moduleB">
...

</div>

<div block="moduleC">
...

</div>
```

```js
// 统计模块的曝光量

require('intersection-observer');
let block = {
    init: function () {
        let io = new IntersectionObserver(entries => {
            entries.forEach(item => {
                if(item.isIntersecting) {
                    let target = $(item.target);
                    let block = target.attr('block');
                    window.sendPingback(block);
                }
            })
        })
        
        let blocks = $('[block*="module"]');
        blocks.forEach(item => {
            io.observe(item);
        })
        
    }
}

export default block;

```
从动画效果中我们看到，滑动到某一模块，就会发送对应的统计请求。

从代码中可知，想要统计哪一块的曝光量，只需要在对应的div上加上`block`属性即可，方便快捷高效。**后面打算在这个基础上进行扩展，统计用户在某一模块的停留时间，进而获取用户的感兴趣区域。**

### 注意

1. 由于`IntersectionObserver`存在兼容性问题，所以需要引入补丁文件

```js
npm install intersection-observer --save
```

2. `IntersectionObserver`是异步的，不随着目标元素的滚动同步触发。即只有线程空闲下来，才会执行观察器。

### 引申

`IntersectionObserver`还可以实现图片的懒加载，由于还没有在实际项目中实践过，这里就不展开说明了，原理和上面两个案例基本相同，只是需要处理图片相关的逻辑。

### 关注我
**扫一扫 关注我的公众号【前端名狮】，更多精彩内容陪伴你！**

![](/7.webp)