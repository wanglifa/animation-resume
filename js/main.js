

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
    background: #eee;
}
#code{
    border: 1px solid #aaa;
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

/*加一个呼吸效果*/

#code{
    animation: breath 0.5s infinite alternate-reverse;
}
`
var result2 = `
/*现在正式开始*/

/*我需要一张白纸*/

#code-wrapper {
    width: 50%;
    left: 0;
    position: fixed;
    height: 100%;
}

/* 于是我就可以在白纸上写字了，请看右边 */
    `

var result3 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
var result4 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
var md = `
# 自我介绍

我叫王立发
1995年7月出生
山东轻工职业学院毕业
自学前端一年半
希望应聘前端开发岗位

# 技能介绍

熟悉Javascript CSS Sass Bootstarp jQuery Vue

# 项目介绍

1. 轮播
2. 简历
3. 画板

# 联系方式

QQ：1002325418
微信：m18182518
手机：15806553882
`    
//prevcode参数是上一次的代码，为了不覆盖之前的代码，也就是为了和上一次的结果累加    
function writeCode(prevcode,code,fn){
    let demoCode = document.querySelector('#code');
    //一开始页面的innerHTML是你传入的上一次的或者是空
    demoCode.innerHTML = prevcode || '';
    let n=0;
    let id = setInterval(()=>{
        n+=1;
        //将你页面的html代码高亮，然后赋值给html
        demoCode.innerHTML = Prism.highlight(prevcode + code.substring(0,n), Prism.languages.css, 'css');
        styleTag.innerHTML = prevcode + code.substring(0,n)
        demoCode.scrollTop = demoCode.scrollHeight;
        if(n>=code.length){
            window.clearInterval(id);
            //如果fn这个参数存在就调用
            if(fn){
                fn.call()
            }
        }
    },50)
}
//上面代码执行顺序先调用了writeCode()这个函数，执行它里面的
//let demoCode = document.querySelector('#code');let n=0;console.log('设置闹钟')；然后设置了一个闹钟
//也就是定义了一个setInterval函数，但并没有直接执行这个函数，因为他需要10ms后才开始调用，所就直接返回了
//然后执行f1(),f1函数调用完后，开始执行setInterval函数里面的代码 
//概括说来就是：1.定闹钟 2.writeCode返回 3.执行f1() 4.闹钟时间到 5.写第一行代码

function writeMarkdone(code,fn){
    let demoCode = document.querySelector('#content');
    let n = 0;
    let id = setInterval(()=>{
        n+=1;
        demoCode.innerHTML = code.substring(0,n);
        demoCode.scrollTop = demoCode.scrollHeight;
        if(n>=code.length){
            window.clearInterval(id)
            fn.call()
        }
    },50)
}
function creatMarkedoneHtml(fn){
    let demoCode = document.querySelector('#page');
    demoCode.removeChild(content)
    let div = document.createElement('div');
    demoCode.appendChild(div);
    div.className= 'html markdown-body';
    div.innerHTML = marked(md);
    fn.call()
}
//添加一个新的标签
function createPage(fn){
    console.log('zzz')
    var page = document.createElement('div');
    var content = document.createElement('pre');
    document.body.appendChild(page);
    page.appendChild(content)
    page.id= 'page';
    content.id = 'content';
    fn.call()
}


writeCode('',result,()=>{ //writeCode call the function在writeCode函数里调用writeCode()里面的function
    createPage(()=>{
        writeCode(result,result2,()=>{
            writeMarkdone(md,()=>{
                writeCode(result+result2,result3,()=>{
                    creatMarkedoneHtml(()=>{
                        writeCode(result+result2+result3,result4)
                    })
                })
            })
        })
    })
});



