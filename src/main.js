const $siteList = $('.siteList')
const $lastList = $siteList.find('li.last')
const x = localStorage.getItem('x')
//将字符串变成对象
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
];
const simplifyUrl = (url) => { 
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/,'');//删除多余内容
}
const render = () => { 
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="loge">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg  class="icon-close"fill="none" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastList)
        $li.on('click', () => {
           window.open(node.url)//代替了a标签的作用
        });
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1) //实现删除功能
            render()
        });
    });
}
//增加之前需要渲染hashMap
render();

$('.addButton').on('click', () => {
    let url = window.prompt("请输入网址：")
    console.log(url);
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url);
    
    hashMap.push({
        logo: simplifyUrl(url)[0],
        url: url
    });
//添加之后重新渲染
    render();
    
});
//当用户离开页面，数据会保存，不会丢失
window.onbeforeunload = () => { 
    //console.log('页面要关闭了');
    //把对象变成字符串
    const string = JSON.stringify(hashMap);
    //在本地存储里，设置一个x，他的值是string
    localStorage.setItem('x', string);
}
$(document).on('keypress', (e) => { 
   // const key = e.key;
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) { 
        if (hashMap[i].logo.toLowerCase()===key) { 
            window.open(hashMap[i].url)
        }  
    } 
})

