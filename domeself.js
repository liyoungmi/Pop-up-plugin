(function (global) {

    "use strict";

    let selfWindow = function () { };

    selfWindow.prototype = {

        options : {   //默认参数
            // types : "confirm",
            selfTitle : "默认标题",
            selfInfo : "默认信息",
            selfOk : "默认确定键",
            selfNo : "默认取消键",
            slefClose : "默认关闭"
       },
        /**
         * @method 初始化
         * @param { object } 由@method config() 提供的配置参数
         */
        init: function(opts){  //传入自定义参数
            let option = config(opts,this.options); //config方法用户传入参数配置
            this.initPreviewArea(option);
        },
        //弹窗方法
        initPreviewArea: function(option){
            let html="<div id='selfWinsow'><div id='slefClose'>"+option.slefClose+"<\/div><h2 id='slefTitle'>"+option.selfTitle+"<\/h2><p id='selInfo'>"+option.selfInfo+"<\/p><div id='selfOk' class='selfBt selfBtDouble'>"+option.selfOk+"<\/div><div id='selfNo' class='selfBt selfBtDouble'>"+option.selfNo+"<\/div><\/div>";
            this.createMask(html);
            this.selfEvents();
        },
        //事件处理
        selfEvents:function(){
            console.log(this)
            this.selfOk();
            let selfNo = document.getElementById('selfNo');
            selfNo && this.slefNo();
            },
        // //确定按钮事件
        selfOk:function(){
            let _this = this;
            function selfOkFun(e){
                var e = e || window.event;
                let el = e.scrElement || e.target;
                if (el.id == "selfOk" || el.tagName=="IMG") {
                    _this.selfRemoveBack();
                }
            }

            document.removeEventListener('click',selfOkFun,false);
            document.addEventListener('click',selfOkFun,false);
        },
        //创建背景遮罩
        createMask:function(html){
            let selfBack = document.getElementById("selfBack");
            if(selfBack){
                return false;
            }else{
                let selfBack=document.createElement('div');
                selfBack.id = "selfBack";
                selfBack.style.position = "fixed",
                    selfBack.style.top = "0",
                    selfBack.style.left = "0",
                    selfBack.style.right = "0",
                    selfBack.style.bottom = "0",
                    document.body.appendChild(selfBack);
                selfBack.innerHTML = html;
                this.slefClose();

            }
        },
        //移除窗口功能
        selfRemoveBack:function(){
            try{
                let selfBack = document.getElementById('selfBack')
                document.body.removeChild(selfBack);
            }catch(e){}
        },
        //关闭按钮事件
        slefClose:function(){
            let _this = this;
            document.addEventListener('click',function(e){
                var e = e || window.event;
                let el = e.scrElement || e.target;
                if(el.id == "slefClose"){
                    _this.selfRemoveBack();
                }
            });
        },
        //拒绝或者否认按钮事件
        slefNo:function(){
            let _this = this;
            document.addEventListener('click',function(e){
                var e = e || window.event;
                let el = e.scrElement || e.target;
                if(el.id == "selfNo" ||el.tagName == "IMG"){
                    _this.selfRemoveBack();
                }
            })
        },
    };

/**
 * @method 配置
 * @param opts { object } 用户提供的参数，在没有提供参数的情况下使用默认参数
 * @param options { object } 默认参数
 * @return options { object } 返回一个配置对象
 */
function config(opts, options) {
    //默认参数
    if (!opts) return options;
    for (let key in opts) {
        if (!!options[key]) {
            options[key] = opts[key];
        }
    }
    return options;
}

global.selfWindow = selfWindow;//注册到全局中

}(this));