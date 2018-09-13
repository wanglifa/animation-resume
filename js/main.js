

var result = `
/*
* 面试官你好，我是王立发
* 我将以动画的形式来介绍我自己
* 只用文字介绍太单调了
* 我就用代码来介绍吧
* 首先准备一些样式
*/
*{
    transition: all .3s linear;
}   
html{
    background: rgb(222,222,222);
    font-size: 16px;
}
#code{
    border: 1px solid red;
    padding: 16px;
}
/*我需要一点代码高亮*/
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}

/*加点3D效果*/
#code{
    transform:rotate(360deg)
}
/*不玩了，我来介绍一下我自己*/
/*我需要一张白纸*/

`
var n=0;
var id = setInterval(()=>{
    n+=1;
    code.innerHTML=result.substring(0,n)
    //将你页面的html代码高亮，然后赋值给html
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css');
    styleTag.innerHTML = result.substring(0,n)
    if(n>=result.length){
        window.clearInterval(id);
        //在css动画结束后，执行f1创建一个新的标签
        f1()
        
        //将之前的innerHTML传给f2这个函数
        f2(code.innerHTML)
    }
},10)

//添加一个新的标签
function f1(){
    var page = document.createElement('div');
    document.body.appendChild(page);
    page.id= 'page';
}

//给新创建的标签设置css和innerHTML
function f2(prevInnerhtml){
    var result = `
#page{
    width: 100px;
    height: 100px;
    background: red;
}
    `
    var n = 0;
    var id = setInterval(()=>{
        n+=1;
        //这里因为是在原先的innerHTML的基础上添加，所以每次都只能加一个，而不能像之前那样覆盖，所以是(n-1,n)
        code.innerHTML+=result.substring(n-1,n)
        //code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css');
        //如果写成上面这个会出问题，因为之前的code里的innerHTML已经高亮了，已经加了span标签，
        //如果再加一遍会出问题，所以要排除之前高亮的代码，也就是说只需要对这个函数里的result进行高亮就可以
        
        //又因为是直接赋值给code.innerHTML在页面展示，所以之前的innerHTML也得加上，
        //故给f2这个函数传入一个参数，在调用的时候将上一次的code.innerHTML传进去
        code.innerHTML = prevInnerhtml+ Prism.highlight(result, Prism.languages.css, 'css');
        styleTag.innerHTML += result.substring(n-1,n)
        if(n>=result.length){
            window.clearInterval(id)
        }
    },10)

}