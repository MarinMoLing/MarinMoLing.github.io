---
title: Hexo-Fluid搭建与魔改纪录
date: 2023-2-24 21:53:46
tags: 
     - blog
     - hexo
     - fluid


---

## 前言

去年腾讯云服务器过期了，想着采用Hexo + GitHub Pages搭建一个新的博客，主题使用[Fluid](https://github.com/fluid-dev/hexo-theme-fluid)。

~~今年~~~~感觉以前搭建的未免有点过于花哨~~~~又想折腾了，于是使用[Cactus](https://github.com/probberechts/hexo-theme-cactus)重新搭建了一遍。~~

今年又改回来了\\(￣︶￣*\))

这里记录一下自己去年使用Fluid搭建与魔改（照搬他人）blog的步骤，日后查找起来也方便。

## 搭建blog

### 准备工作

(1)需要有一个GitHub账号，没有可以去[官网](https://github.com/)注册一个

(2)电脑安装`Git`，安装及使用教程参考[Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)

(3)由于`Hexo`是基于`Node.js`编写的，故电脑还需要安装`Node.js`，可以去[官网](https://nodejs.org/en/download/)进行下载

### 创建代码仓库

进入[`GitHub`官网](https://github.com/),创建一个新的代码仓库，仓库名格式必须为`<用户名>.github.io`。

### 安装Hexo

__安装 `Hexo`__

```
npm install -g hexo-cli
```

__创建一个项目 `hexo-blog` 并初始化__

```
hexo init hexo-blog
cd hexo-blog
npm install
```

__本地启动__

```
hexo g
hexo s
```

此时我们打开浏览器访问`http://localhost:4000`即可进入默认风格网站

### 更换主题

我们可以通过[Hexo官网](https://hexo.io/themes/)获取自己喜欢的主题，这里以我使用的`Fluid`为例

__安装主题__

```
cd hexo-blog
git clone https://github.com/fluid-dev/hexo-theme-fluid.git themes/Fluid
```

打开`hexo-blog`目录下的`_config.yml `文件，对主题进行配置

```
theme: fluid
language: zh-CN
```

### 创建「关于页」

首次使用主题的「关于页」需要手动创建：

```
hexo new page about
```

创建成功后，编辑博客目录下 `/source/about/index.md`，添加 `layout` 属性。

修改后的文件格式：

```
---
title: about
date: 
layout: about
---
正文
```

此时我们输入指令

```
hexo clean
hexo g
hexo s
```

此时再去访问`http://localhost:4000`,我们的`Fluid`主题blog就搭建好了

### 创建文章

打开`hexo-blog`目录下的`_config.yml `文件，对文章进行配置

```
post_asset_folder: true
```

执行如下命令创建一篇新文章

```
hexo n test
```

执行完成后打开`source\_posts`目录可以看到生成的`test.md`和`test文件夹`打开`test.md`即可对文章进行编辑

图片的插入可以参考[官方文档](https://hexo.io/zh-cn/docs/asset-folders.html)，也可以使用图床，支持Markdown, HTML

### Fluid配置

参考[Hexo Fluid官方文档](https://hexo.fluid-dev.com/docs/guide/#%E5%85%B3%E4%BA%8E%E6%8C%87%E5%8D%97)

## 上传至GitHub Pages

__安装`hexo-deployer-git`__

```
npm install hexo-deployer-git --save
```

打开`hexo-blog`目录下的`_config.yml `文件，进行配置

```
deploy:
  type: git
  repo: 你的GitHub仓库地址
  branch: main
  token: 你的Personal access tokens

```

输入指令

```
hexo g
hexo d
```

此时blog完成上传GitHub Pages，浏览器访问 https://<用户名>.github.io，部署成功

## 绑定域名

### 购买域名

寻找合适的域名交易平台购买域名

### 域名解析

我是在`Namesilo`购买的域名，所以在这里以`Namesilo`为例

登陆后找到`Active Domains`，点击`Manage`,找到自己购买的域名，在`Options`中点击`Manage DNS for this domain` ，将原有的记录全部删除，添加两个新记录

{% asset_img 2.png  %}

（这里的记录值填自己blog的ip地址，不清楚可以去ping一下）

在博客目录 `/source`下创建一个名为`CNAME`的文件，在文件内写入你的域名（不要加`https://`和`www.`）

输入指令

```
hexo g
hexo d
```

### Github解析

在Github的xxx.github.io项目,进入`Settings`,在`Pages`下的`Custom domain`功能中,将刚刚申请的域名写进去。

{% asset_img 1.png  %}

设置好后，等待一段时间后，就可以通过域名访问blog了

## Fluid魔改

### 字体样式修改

修改字体样式直接引入css文件和字体包即可。

首先寻找自己喜欢的字体，这里推荐几个网站：[第一字体网](http://www.diyiziti.com/)，[字体天下](https://www.fonts.net.cn/)，[字体家](https://www.zitijia.com/)

将需要使用的字体文件放入博客目录`themes\fluid\source\css`下

如有有css文件，就在最下面继续写；如果没有，则新建一个css文件，文件名任取

```css
@font-face{
  font-family: 'ziti' ;  /* 自定义字体名称 */
  src: url('ziti.ttf'); /* 引入字体文件的路径 */
}
/*应用在body体里，放在第一个，font-family会按顺序使用字体族。如果第一个没找到就会找第二个，以此类推。*/
body {
font-family: ziti,-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Lato, Roboto, "PingFang SC", "STZhongsong", "Lantinghei SC", sans-serif
}
```

### 鼠标样式修改

在css文件添加下方代码，然后引入即可。

```css
/*指针样式*/
body {
    cursor: url(https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/default.cur),
        default;
}
/*链接小手样式*/
a,
img {
    cursor: url(https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/pointer.cur),
        default;
}
```

### 网站运行时间

打开`\themes\fluid`下的`_config.yml`，在主题配置中的 `footer: content` 添加：

```html
footer:
  content: '
		 <a href="https://hexo.io" target="_blank" rel="nofollow noopener"><span>Hexo</span></a>
    <i class="iconfont icon-love"></i>
    <a href="https://github.com/fluid-dev/hexo-theme-fluid" target="_blank" rel="nofollow noopener"><span>Fluid</span></a>
    <div style="font-size: 0.85rem">
      <span id="timeDate">载入天数...</span>
      <span id="times">载入时分秒...</span>
      <script src="/js/duration.js"></script>
    </div>  '
```

在`\themes\fluid\source\js`目录下创建 `duration.js`,内容如下:

```javascript
!(function() {
    /** 计时起始时间，自行修改 **/
    var start = new Date("2022/10/15 00:00:00");
  
    function update() {
      var now = new Date();
      now.setTime(now.getTime()+250);
      days = (now - start) / 1000 / 60 / 60 / 24;
      dnum = Math.floor(days);
      hours = (now - start) / 1000 / 60 / 60 - (24 * dnum);
      hnum = Math.floor(hours);
      if(String(hnum).length === 1 ){
        hnum = "0" + hnum;
      }
      minutes = (now - start) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
      mnum = Math.floor(minutes);
      if(String(mnum).length === 1 ){
        mnum = "0" + mnum;
      }
      seconds = (now - start) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
      snum = Math.round(seconds);
      if(String(snum).length === 1 ){
        snum = "0" + snum;
      }
      document.getElementById("timeDate").innerHTML = "本站居然运行了&nbsp"+dnum+"&nbsp天";
      document.getElementById("times").innerHTML = hnum + "&nbsp小时&nbsp" + mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
    }
  
    update();
    setInterval(update, 1000);
  })();
```

### 添加自定义css和js文件

打开`\themes\fluid`下的`_config.yml`，在以下位置进行修改：

```
custom_js: 
          - /js/duration.js
custom_css: 
            - /css/custom.css
```



### 看板娘

__安装Live2D__

在hexo-blog目录下右键打开`Git Bash Here`安装Live2D: `npm uninstall hexo-helper-live2d`

__选择模型__

原生模型：

- Epsilon2.1
- Gantzert_Felixander
- haru
- miku
- ni-j
- nico
- nietzche
- nipsilon
- nito
- shizuku
- tsumiki
- wanko
- z16
- hibiki
- koharu
- haruto
- Unitychan
- tororo
- hijiki

__安装模型：__

在hexo文件夹根下右键打开`Git Bash Here`键入`npm install --save live2d-widget-模型名`即可。

__配置__

打开`hexo-blog`目录下的`_config.yml `文件，在末尾增加：

```
live2d:
  model:
    scale: 1
    hHeadPos: 0.5
    vHeadPos: 0.618
    use: live2d-widget-model-tororo // 下载的动画模型名称
  display:
    superSample: 2
    width: 120
    height: 200
    position: left // 模型在网页显示位置,left为左,right为右
    hOffset: 20
    vOffset: 50
  mobile:
    show: true  // 移动设备是否显示,true则显示,false则不显示
    scale: 0.5
  react:
    opacityDefault: 0.7
    opacityOnHover: 0.2
```

接着输入命令

```
hexo clean
hexo g
hexo s
```

我们就可以看到可爱的看板娘出现在了我们的blog里了

### 一言

打开`\themes\fluid`下的`_config.yml`，在以下位置进行修改：

```
slogan:
    enable: true
    text: ""
    api:
      enable: true
      url: "https://v1.hitokoto.cn/"
      method: "GET"
      headers: {}
      keys: ['hitokoto']

```

### 雪花特效

在`\themes\fluid\source\js`目录下`duration.js`中添加:

```javascript
/* 控制下雪 */
function snowFall(snow) {
  /* 可配置属性 */
  snow = snow || {};
  this.maxFlake = snow.maxFlake || 200;   /* 最多片数 */
  this.flakeSize = snow.flakeSize || 10;  /* 雪花形状 */
  this.fallSpeed = snow.fallSpeed || 1;   /* 坠落速度 */
}
/* 兼容写法 */
requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(callback) { setTimeout(callback, 1000 / 60); };

cancelAnimationFrame = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.oCancelAnimationFrame;
/* 开始下雪 */
snowFall.prototype.start = function(){
  /* 创建画布 */
  snowCanvas.apply(this);
  /* 创建雪花形状 */
  createFlakes.apply(this);
  /* 画雪 */
  drawSnow.apply(this)
}
/* 创建画布 */
function snowCanvas() {
  /* 添加Dom结点 */
  var snowcanvas = document.createElement("canvas");
  snowcanvas.id = "snowfall";
  snowcanvas.width = window.innerWidth;
  snowcanvas.height = document.body.clientHeight;
  snowcanvas.setAttribute("style", "position:absolute; top: 0; left: 0; z-index: 1; pointer-events: none;");
  document.getElementsByTagName("body")[0].appendChild(snowcanvas);
  this.canvas = snowcanvas;
  this.ctx = snowcanvas.getContext("2d");
  /* 窗口大小改变的处理 */
  window.onresize = function() {
      snowcanvas.width = window.innerWidth;
      /* snowcanvas.height = window.innerHeight */
  }
}
/* 雪运动对象 */
function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
  this.x = Math.floor(Math.random() * canvasWidth);   /* x坐标 */
  this.y = Math.floor(Math.random() * canvasHeight);  /* y坐标 */
  this.size = Math.random() * flakeSize + 2;          /* 形状 */
  this.maxSize = flakeSize;                           /* 最大形状 */
  this.speed = Math.random() * 1 + fallSpeed;         /* 坠落速度 */
  this.fallSpeed = fallSpeed;                         /* 坠落速度 */
  this.velY = this.speed;                             /* Y方向速度 */
  this.velX = 0;                                      /* X方向速度 */
  this.stepSize = Math.random() / 30;                 /* 步长 */
  this.step = 0                                       /* 步数 */
}
flakeMove.prototype.update = function() {
  var x = this.x,
      y = this.y;
  /* 左右摆动(余弦) */
  this.velX *= 0.98;
  if (this.velY <= this.speed) {
      this.velY = this.speed
  }
  this.velX += Math.cos(this.step += .05) * this.stepSize;

  this.y += this.velY;
  this.x += this.velX;
  /* 飞出边界的处理 */
  if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
      this.reset(canvas.width, canvas.height)
  }
};
/* 飞出边界-放置最顶端继续坠落 */
flakeMove.prototype.reset = function(width, height) {
  this.x = Math.floor(Math.random() * width);
  this.y = 0;
  this.size = Math.random() * this.maxSize + 2;
  this.speed = Math.random() * 1 + this.fallSpeed;
  this.velY = this.speed;
  this.velX = 0;
};
// 渲染雪花-随机形状（此处可修改雪花颜色！！！）
flakeMove.prototype.render = function(ctx) {
  var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
  snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");  /* 此处是雪花颜色，默认是白色 */
  snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)"); /* 若要改为其他颜色，请自行查 */
  snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");    /* 找16进制的RGB 颜色代码。 */
  ctx.save();
  ctx.fillStyle = snowFlake;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
/* 创建雪花-定义形状 */
function createFlakes() {
  var maxFlake = this.maxFlake,
      flakes = this.flakes = [],
      canvas = this.canvas;
  for (var i = 0; i < maxFlake; i++) {
      flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed))
  }
}
/* 画雪 */
function drawSnow() {
  var maxFlake = this.maxFlake,
      flakes = this.flakes;
  ctx = this.ctx, canvas = this.canvas, that = this;
  /* 清空雪花 */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var e = 0; e < maxFlake; e++) {
      flakes[e].update();
      flakes[e].render(ctx);
  }
  /*  一帧一帧的画 */
  this.loop = requestAnimationFrame(function() {
      drawSnow.apply(that);
  });
}
/* 调用及控制方法 */
var snow = new snowFall({maxFlake:60});
snow.start();
```

### 鼠标点击显示字体效果

在`\themes\fluid\source\js`目录下`duration.js`中添加:

```javascript
var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array
        ("TuT", "(　ﾟ∀ﾟ) ﾉ♡", "ヽ(`Д´)ノ", "(☍﹏⁰)", "( ´•̥×•̥` )", "ΩДΩ", "(・ω・)", "ヾ(´︶`*)ﾉ♬", "(❀╹◡╹)");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
        y = e.pageY;
        $i.css({
            "z-index": 5,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#FF0000"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
            3000,
            function() {
                $i.remove();
            });
    });
    setTimeout('delay()', 2000);
});

function delay() {
    $(".buryit").removeAttr("onclick");
}
```

在 `\themes\hexo-theme-spfk\layout\layout.ejs` 末尾添加以下代码：

```html
<!--单击显示文字-->
<script type="text/javascript" src="/js/click_show_text.js"></script>
```

### 网页标题恶搞

在`\themes\fluid\source\js`目录下`duration.js`中添加:

```javascript
<!--浏览器搞笑标题-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/fluid.png");
         document.title = '看不到我~';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/img/1.png");
         document.title = '欢迎回来~' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });
```

在`\Hexo\themes\hexo-theme-spfk\layout\layout.ejs`中添加如下代码：

```html
<!--浏览器搞笑标题-->
<script type="text/javascript" src="\js\FunnyTitle.js"></script>
```

### 背景添加动态线条效果

在`\Hexo\themes\hexo-theme-spfk\layout\layout.ejs`中添加如下代码：

```html
<!--动态线条背景-->
<script type="text/javascript"
color="220,220,220" opacity='0.7' zIndex="-2" count="200" src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js">
</script>
```


大概就这些，emmm，总感觉自己的blog并不是用来写博客的，而是用来折腾的。


{% asset_img 4.png  %}
