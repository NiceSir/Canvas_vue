//平移方块
Vue.component("my-component1",{
    template:"<canvas id='canvas1' :width='width' :height='height' style='border:1px solid red'></canvas>",
    data:function(){
        return{
            width:400,
            height:400,
            x:20,
            y:40,
            w:80,
            h:80
        }
    },
    mounted:function () {
        var _this=this;
        var canvas=document.getElementById("canvas1");
        var context=canvas.getContext("2d");
        //第一个对比
        context.fillStyle="blue";
        context.fillRect(_this.x,_this.y,_this.w,_this.h);
        this.timer=setInterval(function () {
            (_this.x>_this.width)?_this.addX():_this.x+=1;                      //循环条件
            _this.remove(context,_this.x,_this.y,_this.w,_this.h)
        },10);
    },
    methods:{
        remove:function(context,x,y,w,h){
            if(x+w<=this.width){//当矩形的宽和x轴之和小于等于画布的宽时
                context.clearRect(0, 0, this.width,this.height);
                context.beginPath();
                context.fillStyle="blue";
                context.rect(x, y, w,h);
                context.stroke();
                context.closePath();
                context.fill();
            }
            else if(this.width<x+w||x+w-this.width<w){//当矩形的宽和x轴之和大于画布的宽且和减去画布的宽小于矩形的宽时
                context.clearRect(0, 0, this.width,this.height);
                context.beginPath();
                context.fillStyle="blue";
                context.rect(0, y, x+w-this.width,h);
                context.stroke();
                context.rect(x, y,w,h);
                context.stroke();
                context.closePath();
                context.fill();
            }else{//当矩形的X轴比画布的宽大时
                context.clearRect(0, 0, this.width,this.height);
                context.beginPath();
                context.fillStyle="blue";
                context.rect(abs(this.width-x), y, w,h);
                context.stroke();
                context.closePath();
                context.fill();
            }
        },
        //净化器
        addX(){
            return this.x=0;
        }
    },
    beforeDestroy:function () {
        if(this.timer){
            clearInterval(this.timer);
        }
    }
});
//旋转方块
Vue.component("my-component2",{
    template:"<canvas id='canvas2' :width='width' :height='height' style='border:1px solid red;margin:0px 0px 0px 20px;'>111</canvas>",
    data:function () {
        return{
            width:400,//画布宽
            height:400,//画布高
            x:120,//绘制方块的X坐标，x坐标与宽应该一致！
            y:120,//方块的y坐标
            w:120,//方块的宽
            h:120//方块的高
        }
    },
    mounted:function () {
        var _this=this;
        var canvas=document.getElementById("canvas2");
        var context=canvas.getContext("2d");
        //第一个对比
        context.fillStyle="blue";
        context.translate(_this.width/2,_this.height/2);//画布起始位置
        // context.save();//保存画布当前状态，而不是当前所画
        this.timer=setInterval(function () {
            context.clearRect(-_this.width/2,-_this.height/2,_this.width*2,_this.height*2);
            context.rotate(Math.PI/180);
            context.fillRect(-_this.x/2,-_this.y/2,_this.w,_this.h);
            // context.restore();//恢复save所保存的画布状态
        },10);
    },
    methods:{

    }
})
var app=new Vue({
    el:"#app",
})