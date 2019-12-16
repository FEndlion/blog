# 如何解决弹窗过多，导致的html结构臃肿问题

### 业务背景
弹窗是页面交互中的重要组成部分，前端开发的同学应该经常与它打交道。小编的日常是做面向C端的H5活动页面，弹窗处理是每天都要面对的情况。根据日常工作中的场景，我总结了弹窗有以下特点：

1. 不同的活动页面，弹窗样式基本不同；
2. 不同的CSS开发者，弹窗的html结构不尽相同；
3. 同一个活动页面中的弹窗样式基本相同，但弹窗文案、按钮文案、按钮交互都不尽相同；

第一点和第二点导致我们无法抽离出适用于所有页面的弹窗组件，只能根据每次的活动页进行定制化。

第三点是我们这篇文章重点分析的情况，最常规的做法就是每个弹窗拥有独立的html结构和添加对应的事件处理逻辑。

**这样固然能解决问题，但是当页面逻辑复杂、弹窗特别多的情况下，你会发现html中存在大量的弹窗dom结构，不仅影响代码美观，也增加了html文件大小和渲染解析时间。最不能忍的是，每处理一种情况，都要去增加对应的弹窗，工作相当繁琐。**

比如以下弹窗：

![image](/11.png)

![image](/12.png)

![image](/13.png)

![image](/14.png)

**这些还只是一类逻辑出现的弹窗，如果页面逻辑复杂，可能会出现几十个这种弹窗。上面的弹窗样式基本相同，不同的就是文案、按钮处理逻辑等，怎么抽离他们呢？**

![image](/15.jpg)

### 抽离方案

**1. ES6 + Zepto 原生撸**

```js
let commonPop = {
    init: function (param) {
        let popHtml = `<div class="m-popup-inner dn" id="commonPop">
            <div class="popup-info">
                <div class="title">${param.title}</div>
                <div class="c-des-info">${param.desc}</div>
            </div>
            <div class="popup-btn">
                <a href="javascript:;" class="c-btn-link dn leftBtn">${param.leftBtnTxt}</a>
                <a href="javascript:;" class="c-btn-link dn rightBtn">${param.rightBtnTxt}</a>
            </div>
        </div>`
        
        $('body').append(popHtml);
        if(param.leftBtnTxt) {
            $('#commonPop .leftBtn').removeClass('dn'); // 避免按钮不存在的情况
            $('#commonPop .leftBtn').on('click', function() {
                param.leftCallback && param.leftCallback();
                $('#commonPop').remove(); // 销毁弹窗
            })
        }
        
        if(param.rightBtnTxt) {
            $('#commonPop .rightBtn').removeClass('dn'); // 避免按钮不存在的情况
            $('#commonPop .rightBtn').on('click', function() {
                param.rightCallback && param.rightCallback();
                $('#commonPop').remove(); // 销毁弹窗
            })
        }
        $('#commonPop').removeClass('dn');
    }
}

export default commonPop;
```
**调用时只需要传对应参数就行，比如：**
```js
import commonPop from './commonPop';

// 第一个弹窗
let param = {
    title: '开通成功',
    desc: '已为你开通25天会员',
    leftBtnTxt: '我知道了'
}
commonPop.init(param);

// 第二个弹窗
let param = {
    title: '账号提示',
    desc: '请您确认两方的账号绑定手机号一致后点击领取',
    leftBtnTxt: '换绑手机号',
    leftCallback: function(){
        goChangePhone();
    },
    rightBtnTxt: '关闭'
}
commonPop.init(param);

// 第三个弹窗
let param = {
    title: '注册提示',
    desc: '完成注册即可激活权益',
    leftBtnTxt: '取消',
    rightBtnTxt: '前往注册'
    rightCallback: function(){
        goRegister();
    }    
}
commonPop.init(param);

// 第四个弹窗
let param = {
    title: '实名认证提示',
    desc: '你需要实名认证后才可激活权益',
    leftBtnTxt: '取消',
    rightBtnTxt: '前往认证'
    rightCallback: goRealName.bind(this)   
}
commonPop.init(param);

```

**2. VUE版本**

```js
// commonPop.vue
<template>
    <div v-if="show">
        <div class="cover"></div>
        <div class="m-popup">
            <div class="pop-info">
                <div class="c-tit" v-html="title"></div>               
                <div class="c-text">{{desc}}</div>
            </div>
            </div>
            <div class="pop-btn">
                <a href="javascript:;" class="c-btn-link" v-if="leftBtnTxt" @click="leftCallback">{{leftBtnTxt}}</a>
                <a href="javascript:;" class="c-btn-link highlight" v-if="rightBtnTxt" @click="rightCallback">{{rightBtnTxt}}</a>
            </div>
        </div>
    </div>
</template>

```
```js
// index.js
import vue from 'vue'
import popUpComponent from './commonPop.vue'


// 返回一个 扩展实例构造器
const PopUpConstructor = vue.extend(popUpComponent)

function showPopUp(popData) {
    // 实例化一个 commonPop.vue
    const popUpDom = new PopUpConstructor({
        el: document.createElement('div'),
        data() {
            return {
                title: popData.title,               
                descFirst: popData.descFirst,               
                leftBtnText: popData.leftBtnText,
                rightBtnText: popData.rightBtnText,
                show: true
            }
        },
        methods: {
            leftCallback: function(){
                this.show = false;
                popData.leftCallback && popData.leftCallback()
            },
             rightCallback: function(){
                this.show = false;
                popData.rightCallback && popData.rightCallback()
            }
        }
    })

    // 把 实例化的 popUp.vue 添加到 body 里
    document.body.appendChild(popUpDom.$el)
    return popUpDom;
}

// 注册为全局组件的函数
function registryPopUp() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$popUp()
    vue.prototype.$popUp = showPopUp
}

export default registryPopUp
```

**调用时只需要传对应参数就行，比如：**
```js
// 第一个弹窗
let param = {
    title: '开通成功',
    desc: '已为你开通25天会员',
    leftBtnTxt: '我知道了'
}
this.$popUp(param);

// 第二个弹窗
let param = {
    title: '账号提示',
    desc: '请您确认两方的账号绑定手机号一致后点击领取',
    leftBtnTxt: '换绑手机号',
    leftCallback: function(){
        goChangePhone();
    },
    rightBtnTxt: '关闭'
}
this.$popUp(param);

// 第三个弹窗
let param = {
    title: '注册提示',
    desc: '完成注册即可激活权益',
    leftBtnTxt: '取消',
    rightBtnTxt: '前往注册'
    rightCallback: function(){
        goRegister();
    }    
}
this.$popUp(param);

// 第四个弹窗
let param = {
    title: '实名认证提示',
    desc: '你需要实名认证后才可激活权益',
    leftBtnTxt: '取消',
    rightBtnTxt: '前往认证'
    rightCallback: goRealName.bind(this)   
}
this.$popUp(param);
```
### 总结
两种方案的原理基本一样，都是在触发弹窗展示后，动态的添加dom结构到html中，点击弹窗按钮执行逻辑后，删除对应的dom结构，这样就避免了html页面中出现过多弹窗dom造成的页面臃肿问题。

优化点无大小，只要能够提高页面性能、有利于维护代码、减少重复劳动力、提高工作效率，都可以在日常的工作中进行优化整理。

***
**扫一扫 关注我的公众号【前端名狮】，更多精彩内容陪伴你！**

![](/7.webp)