function tabify(element) {
    //获取头部按钮
    const header = element.querySelector('.tabs-header');
    //获取内容区
    const content = element.querySelector('.tabs');
    //Tab1,tab2,tab3,tab1子，tab2子
    const tab_headers = [...header.children];
    //以上头部按钮的对应内容区
    const tab_contents = [...content.children];
    console.log(tab_contents);
    //默认设置为不显示
    tab_contents.forEach(x => x.style.display = 'none');
    //当前按钮的索引设置为-1；
    let current_tab_index = -1;
    
    //渲染按钮和内容显示
    function renderTab(index) {
        if (current_tab_index > -1) {
            //当前的隐藏
            tab_headers[current_tab_index].style.fontWeight = 400;
            tab_contents[current_tab_index].style.display = 'none';
        }
        //点击后的显示
        tab_headers[index].style.fontWeight = 800;
        tab_contents[index].style.display = 'flex';
        //获取当前按钮索引
        current_tab_index = index;
    }
    
    //返回 ' <li class="default-tab">tab2子</li>'s索引--1
    default_tab_index = tab_headers.findIndex(x => {
        return (~[...x.classList].indexOf('default-tab'))!==0;
    });

    default_tab_index = default_tab_index === -1 ? 0 : default_tab_index;
   
    renderTab(default_tab_index);
    //给按钮绑定点击事件，并传入索引
    tab_headers.forEach((x, i) => x.onclick = event => renderTab(i));

}

//初始化
[...document.querySelectorAll('.tabs-container')]
.forEach(x => tabify(x));