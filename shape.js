function Shape(canvas,cobj,copy) {
    this.cobj = cobj;
    this.canvas = canvas;
    this.copy=copy;
    this.width = canvas.width;
    this.height = canvas.height;
    this.lineWidth =1;
    this.fillStyle = "#000";
    this.strokeStyle = "#000";
    this.type="huabi";
    this.style="stroke";
    this.history=[];
    this.biannum=5;
    this.jiaonum=5;
    this.xp_size=10;
}
Shape.prototype = {
    // 初始化
    init: function () {
        this.cobj.lineWidth = this.lineWidth;
        this.cobj.fillStyle = this.fillStyle;
        this.cobj.strokeStyle = this.strokeStyle;
    },
    draw:function () {
        var that=this;
        var copy=this.copy;
        copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            if(that.type=="huabi"){
                that.cobj.beginPath();
                that.cobj.moveTo(startx,starty);
            }
            copy.onmousemove=function(e){
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height)
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.init();
                that[that.type](startx,starty,endx,endy);
            }
            document.onmouseup=function(e){
                copy.onmousemove=null;
                document.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    move:function(e,that,xpobj){
        var that=this;
        var movex= e.offsetX;
        var movey= e.offsetY;
        var left=movex-that.xp_size/2;
        var top=movey-(that.xp_size/2)+40;
        if(movex<0){
            left=0;
        }
        if(movex>850){
            left=850-that.xp_size;
        }
       if(movey>600){
           top=600-that.xp_size;
       }
        if(movey<40){
            top=40;
        }
        xpobj.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xp_size+"px;height:"+that.xp_size+"px";
},
    xp:function(xpobj){
        var that=this;
        var copy=this.copy;
            copy.onmousemove=function(e){
               that.move(e,that,xpobj);
            }
            copy.onmousedown=function(e){
                copy.onmousemove=function(e){
                        var endx= e.offsetX;
                        var endy= e.offsetY;
                        that.move(e,that,xpobj);
                        that.cobj.clearRect(endx-that.xp_size/2,endy-that.xp_size/2,that.xp_size,that.xp_size);
                    }
                document.onmouseup=function(e){
                    copy.onmousemove=null;
                    document.onmouseup=null;
                    that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.xp(xpobj);
                    }
                }
            //chorme浏览器解析原理  v8  渲染

        },
    huabi:function (x,y,x1,y1) {
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
        this.cobj[this.style]();
    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
        this.cobj.closePath();
    },
    arc:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,Math.PI*2);
        this.cobj[this.style]();
        this.cobj.closePath();
    },
    bian:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var a=360/this.biannum;
        this.cobj.beginPath();
        for(var i=0;i<this.biannum;i++){
            this.cobj.lineTo(x+Math.cos((a*i+45)*Math.PI/180)*r,y+Math.sin((a*i+45)*Math.PI/180)*r);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        var a=360/(this.jiaonum*2);
        this.cobj.beginPath();
        for(var i=0;i<this.jiaonum*2;i++){
            if(i%2==0) {
                this.cobj.lineTo(x + Math.cos((a * i + 45) * Math.PI / 180) * r, y + Math.sin((a * i + 45) * Math.PI / 180) * r);
            }else{
                this.cobj.lineTo(x + Math.cos((a * i + 45) * Math.PI / 180) * r1, y + Math.sin((a * i + 45) * Math.PI / 180) * r1);

            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    }
}
