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
      document.getElementById("timeDate").innerHTML = "This site has actually been running for&nbsp"+dnum+"&nbspdays";
      document.getElementById("times").innerHTML = hnum + "&nbsphours&nbsp" + mnum + "&nbspminutes&nbsp" + snum + "&nbspsecond";
    }
  
    update();
    setInterval(update, 1000);
  })();

  var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array
        ("リーチ", "	四暗刻", "緑一色", "九蓮宝燈", "国士無双", "大三元", "字一色", "断幺九", "一発");
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
            "color": "#959dc3"
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


<!--浏览器搞笑标题-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/fluid.png");
         document.title = 'Can\'t see me ~';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/img/1.png");
         document.title = 'Welcome back ~' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });


 /*样式二*/
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