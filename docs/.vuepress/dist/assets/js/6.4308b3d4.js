(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{215:function(s,e,n){"use strict";n.r(e);var t=n(0),a=Object(t.a)({},(function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"交叉观察器"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#交叉观察器","aria-hidden":"true"}},[s._v("#")]),s._v(" 交叉观察器")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_jpg/2K5IuDFDWm8Rz6miapjTpqibtxh96XOyS44b3CiagO3njGeXY6je6rS8SDnL2icHbrAuXPqN69I5URAGJ0Jq4w6WBQ/0?wx_fmt=jpeg",alt:""}})]),s._v(" "),n("h3",{attrs:{id:"intersectionobserver-介绍"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#intersectionobserver-介绍","aria-hidden":"true"}},[s._v("#")]),s._v(" IntersectionObserver 介绍")]),s._v(" "),n("p",[n("strong",[s._v("概念")])]),s._v(" "),n("blockquote",[n("p",[n("code",[s._v("IntersectionObserver")]),s._v("接口(从属于"),n("code",[s._v("Intersection Observer")]),s._v(" API)为开发者提供了一种可以异步监听目标元素与其祖先或视窗("),n("code",[s._v("viewport")]),s._v(")交叉状态的手段。祖先元素与视窗("),n("code",[s._v("viewport")]),s._v(")被称为根("),n("code",[s._v("root")]),s._v(")。")])]),s._v(" "),n("p",[n("strong",[s._v("功能")])]),s._v(" "),n("p",[s._v('网页开发时，常常需要判断某个元素是否进入了"视口"（viewport），即用户能不能看到它，然后执行相应的逻辑。')]),s._v(" "),n("p",[n("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWm8Rz6miapjTpqibtxh96XOyS4QYicLzDBGIA8Y5CNlZjkuIxL6rIomv0PxGddQWQOFwJIIAJzH83TwpA/0?wx_fmt=gif",alt:""}})]),s._v(" "),n("p",[s._v("常见的方法是监听"),n("code",[s._v("scroll")]),s._v("事件，调用元素的"),n("code",[s._v("getBoundingClientRect")]),s._v("方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于"),n("code",[s._v("scroll")]),s._v("事件密集发生，计算量很大，容易造成性能问题。")]),s._v(" "),n("p",[n("code",[s._v("IntersectionObserver")]),s._v("是一个新的API，可以自动观察元素是否进入视口。由于可见的本质是，目标元素与视口产生一个交叉区，所以这个API叫做“交叉观察器”。")]),s._v(" "),n("p",[n("strong",[s._v("用法：")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("let io = new IntersectionObserver(callback, option);\n\n// 开始观察\nio.observe(document.getElementById('example'));\n\n// 停止观察\nio.unobserve(element);\n\n// 关闭观察器\nio.disconnect();\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("p",[n("strong",[s._v("callback")])]),s._v(" "),n("p",[n("code",[s._v("callback")]),s._v("方法是被监听元素可见性发生时，执行的回调函数。一般会触发两次，一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("var io = new IntersectionObserver(\n  entries => {\n    console.log(entries);\n  }\n);\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[n("code",[s._v("entries")]),s._v("是一个数组，数组中的每一个元素都是"),n("code",[s._v("IntersectionObserverEntry")]),s._v("对象。特别注意，如果监听的是10个元素，但是只有2个元素可见性发生变化，数组"),n("code",[s._v("entries")]),s._v("的长度就是2，存放的只是可见性发生变化的元素。")]),s._v(" "),n("p",[n("strong",[s._v("IntersectionObserverEntry对象")])]),s._v(" "),n("p",[n("code",[s._v("IntersectionObserverEntry")]),s._v("提供被观察元素的信息，有以下七个属性。")]),s._v(" "),n("ul",[n("li",[n("p",[n("code",[s._v("boundingClientRect")]),s._v(" 目标元素的矩形信息")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("intersectionRatio")]),s._v(" 相交区域和目标元素的比例值")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("intersectionRect/boundingClientRect")]),s._v(" 不可见时小于等于0")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("intersectionRect")]),s._v(" 目标元素和视窗（根）相交的矩形信息 可以称为相交区域")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("isIntersecting")]),s._v(" 目标元素当前是否可见 "),n("code",[s._v("Boolean")]),s._v("值 可见为"),n("code",[s._v("true")])])]),s._v(" "),n("li",[n("p",[n("code",[s._v("rootBounds")]),s._v(" 根元素的矩形信息，没有指定根元素就是当前视窗的矩形信息")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("target")]),s._v(" 观察的目标元素")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("time")]),s._v(" 返回一个记录从"),n("code",[s._v("IntersectionObserver")]),s._v("的时间到交叉被触发的时间的时间戳")])])]),s._v(" "),n("p",[n("strong",[s._v("上面提到的回调执行两次的问题可以通过"),n("code",[s._v("IntersectionObserverEntry")]),s._v("对象的"),n("code",[s._v("isIntersecting")]),s._v("属性解决，通过这个属性判断是否是开始可见。")])]),s._v(" "),n("hr"),s._v(" "),n("p",[n("strong",[n("code",[s._v("option")]),s._v(" 配置对象")])]),s._v(" "),n("p",[s._v("主要用于配置"),n("code",[s._v("IntersectionObserver")]),s._v("的一些观察行为属性，主要有以下属性：")]),s._v(" "),n("p",[n("strong",[s._v("1. threshold")])]),s._v(" "),n("p",[s._v("threshold属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("new IntersectionObserver(\n  entries => {/* ... */}, \n  {\n    threshold: [0.3, 0.5]\n  }\n);\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[s._v("如代码中所示，当目标元素"),n("strong",[s._v("30%")]),s._v(" 或者 "),n("strong",[s._v("50%")]),s._v(" 可见时，会触发callback回调。")]),s._v(" "),n("p",[n("strong",[s._v("2. root 属性，rootMargin 属性")])]),s._v(" "),n("p",[n("code",[s._v("IntersectionObserver")]),s._v("不仅支持视口内滚动，还支持容器内滚动。"),n("code",[s._v("root")]),s._v("属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。")]),s._v(" "),n("p",[n("code",[s._v("rootMargin")]),s._v("属性用来扩展或缩小"),n("code",[s._v("rootBounds")]),s._v("这个矩形的大小，从而影响"),n("code",[s._v("intersectionRect")]),s._v("交叉区域的大小。它使用"),n("code",[s._v("CSS")]),s._v("的定义方法，比如"),n("code",[s._v("10px 20px 30px 40px")]),s._v("，表示 "),n("code",[s._v("top、right、bottom")]),s._v(" 和 "),n("code",[s._v("left")]),s._v(" 四个方向的值。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("var opts = { \n  root: document.querySelector('.container'),\n  rootMargin: \"500px 0px\" \n};\n\nvar observer = new IntersectionObserver(\n  callback,\n  opts\n);\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("h3",{attrs:{id:"应用实践"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#应用实践","aria-hidden":"true"}},[s._v("#")]),s._v(" 应用实践")]),s._v(" "),n("p",[s._v("基于这个API高性能的特性，小编在日常的业务中做了如下的实践，使用效果很不错，同时也简化了业务实现逻辑。")]),s._v(" "),n("ol",[n("li",[s._v("滚动页面，滑动到指定区域，切换TAB栏选中按钮；")]),s._v(" "),n("li",[s._v("长页面滑动时，页面模块的曝光量的数据统计；")])]),s._v(" "),n("h3",{attrs:{id:"_1-滚动切换tab"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-滚动切换tab","aria-hidden":"true"}},[s._v("#")]),s._v(" 1. 滚动切换TAB")]),s._v(" "),n("p",[s._v("效果如下图：")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWm8Rz6miapjTpqibtxh96XOyS49HeiboqEiblfDlSVbswib0WkCvHEiahmZbXwj15ggy3GxmiacWibibWf8G5zA/0?wx_fmt=gif",alt:""}})]),s._v(" "),n("p",[s._v("具体实现代码如下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('// index.html\n\n<div class="default-labelSwitch" id="hotList">\n    \x3c!-- 选中状态给li 加selected --\x3e\n    <ul>\n        <li class="selected" data-hash="cashiermodule" ></li>\n        <li data-hash="seckillcont"></li>\n        <li data-hash="powervalue"></li>\n    </ul>\n</div>\n\n\n<div id="cashiermodule" type="lists">\n...\n\n</div>\n\n<div id="seckillcont" type="lists">\n...\n\n</div>\n\n<div id="powervalue" type="lists">\n...\n\n</div>\n\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 监听页面模块cashiermodule、seckillcont、powervalue是否进入可视区域\n\nrequire('intersection-observer');\n\nlet io = new IntersectionObserver(entries => {\n    entries.forEach(item => {\n        if(item.isIntersecting && item.intersectionRatio >= 0.7) {\n            let target = $(item.target);\n            let id = target.attr('id');\n            oLis.removeClass('selected');\n            $(`[data-hash*=\"${id}\"]`).addClass('selected');\n        }\n    })\n}, {\n    threshold: [0.7]\n})\n\nlet blocks = $('[type*=\"lists\"]');\nblocks.forEach(item => {\n    io.observe(item);\n})\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br")])]),n("p",[s._v("可以看到，实现了模块进入视口区域70%时，就会触发回调，切换tab栏的按钮选中状态。")]),s._v(" "),n("h3",{attrs:{id:"_2-统计页面模块曝光量"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-统计页面模块曝光量","aria-hidden":"true"}},[s._v("#")]),s._v(" 2. 统计页面模块曝光量")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://mmbiz.qpic.cn/mmbiz_gif/2K5IuDFDWm8Rz6miapjTpqibtxh96XOyS4JbHKlibR9bvsNMiaqEw6RdVibp5z0a5tOAl76QCsYiaeoaIwrNfkdJX21A/0?wx_fmt=gif",alt:""}})]),s._v(" "),n("p",[s._v("具体代码如下：")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('// index.html\n\n<div block="moduleA">\n...\n\n</div>\n\n<div block="moduleB">\n...\n\n</div>\n\n<div block="moduleC">\n...\n\n</div>\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br")])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("// 统计模块的曝光量\n\nrequire('intersection-observer');\nlet block = {\n    init: function () {\n        let io = new IntersectionObserver(entries => {\n            entries.forEach(item => {\n                if(item.isIntersecting) {\n                    let target = $(item.target);\n                    let block = target.attr('block');\n                    window.sendPingback(block);\n                }\n            })\n        })\n        \n        let blocks = $('[block*=\"module\"]');\n        blocks.forEach(item => {\n            io.observe(item);\n        })\n        \n    }\n}\n\nexport default block;\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br")])]),n("p",[s._v("从动画效果中我们看到，滑动到某一模块，就会发送对应的统计请求。")]),s._v(" "),n("p",[s._v("从代码中可知，想要统计哪一块的曝光量，只需要在对应的div上加上"),n("code",[s._v("block")]),s._v("属性即可，方便快捷高效。"),n("strong",[s._v("后面打算在这个基础上进行扩展，统计用户在某一模块的停留时间，进而获取用户的感兴趣区域。")])]),s._v(" "),n("h3",{attrs:{id:"注意"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#注意","aria-hidden":"true"}},[s._v("#")]),s._v(" 注意")]),s._v(" "),n("ol",[n("li",[s._v("由于"),n("code",[s._v("IntersectionObserver")]),s._v("存在兼容性问题，所以需要引入补丁文件")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("npm install intersection-observer --save\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("ol",{attrs:{start:"2"}},[n("li",[n("code",[s._v("IntersectionObserver")]),s._v("是异步的，不随着目标元素的滚动同步触发。即只有线程空闲下来，才会执行观察器。")])]),s._v(" "),n("h3",{attrs:{id:"引申"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#引申","aria-hidden":"true"}},[s._v("#")]),s._v(" 引申")]),s._v(" "),n("p",[n("code",[s._v("IntersectionObserver")]),s._v("还可以实现图片的懒加载，由于还没有在实际项目中实践过，这里就不展开说明了，原理和上面两个案例基本相同，只是需要处理图片相关的逻辑。")]),s._v(" "),n("h3",{attrs:{id:"关注我"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#关注我","aria-hidden":"true"}},[s._v("#")]),s._v(" 关注我")]),s._v(" "),n("p",[n("strong",[s._v("扫一扫 关注我的公众号【前端名狮】，更多精彩内容陪伴你！")])]),s._v(" "),n("p",[n("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/9/8/16d105793144e24a?w=1080&h=309&f=webp&s=17610",alt:""}})])])}),[],!1,null,null,null);e.default=a.exports}}]);