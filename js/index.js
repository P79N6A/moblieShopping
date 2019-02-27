var total = document.getElementsByClassName('totalprice') //总价钱

$(function () {
    $('.tab2,.tab3').hide();
})
//切换页面
$('.shop-tab-kinds').click(function (e) {
    $('.shop-tab-kinds').removeClass('titleactive');
    $('.shop-tab-kinds').attr('lang');
    $('.tab1,.tab2,.tab3').hide();
    $('.' + $(this).attr('lang')).show()
    $(this).addClass('titleactive')
})

$(".reduce").click(function (e) {
    //商品单价
    var unitPrice = Number($(this).parent().find('.Num')[0].innerText);
    if (unitPrice > 0) {
        unitPrice--;
        computeSingle($(this), unitPrice)
        //控制当选商品为0时，隐藏数据和减
        if(unitPrice == 0){
            $(this).hide();
            $(this).parent().find('.Num').hide()
        }
    }
    $(this).parent().find('.Num')[0].innerText = unitPrice;
})

//新添加商品
$('.addFood').click(function (e) {
    //商品单价
    var unitPrice = Number($(this).parent().find('.Num')[0].innerText);
    if(unitPrice == 0){
        $(this).parent().find('.Num').show();
        $(this).parent().find('.reduce').show();
    }
    console.log(unitPrice)
    unitPrice += 1
    $(this).parent().find('.Num')[0].innerText = unitPrice;
    computeSingle($(this), unitPrice)
})

//计算添加商品的价格
function computeSingle(self, unitPrice) {
    // 每个商品的价格是多少
    var singlePrice = self.parent().parent().find('.priceSingle')[0].innerText
    singlePrice = singlePrice.substring(1, singlePrice.length)

    // 所选当前商品的总价
    var singletotal = singlePrice * unitPrice;

    // 当前商品总价保存
    self.parent().parent().find('.singleTotal')[0].innerText = singletotal;
    computePrice()
    return singletotal
}


// 显示价格
function computePrice() {
    var totalArr = [];
    for (var i = 0; i < $('.singleTotal').length; i++) {
        if ($('.singleTotal')[i].innerText != '') {
            totalArr.push($('.singleTotal')[i].innerText)
        }
    }
    //总价赋值
    document.getElementsByClassName('totalprice')[0].innerText = '￥' + totalArr.reduce((pre,cur)=>{
        return pre + Number(cur)
    }, 0)
    document.getElementsByClassName('totalprice')[0].classList.add('getMoney');

    //购买商品多少个
    let counts = [];
    for(var i=0;i<$('.Num').length;i++){
        counts.push($('.Num')[i].innerText)
    }
    document.getElementsByClassName('count')[0].innerText = counts.reduce((pre,cur)=>{
        return pre + Number(cur)
    },0)

    //设置结算按钮样式
    document.getElementsByClassName('pay')[0].innerText = '去结算';
    $('.pay').addClass('goPay') ;
}

// 商品菜单列表展示
$(".menuFont").click(function (e) {
    $('.menuFont').removeClass('meun-active');
    $(this).addClass('meun-active');
    $(".foot-list").animate({
        scrollTop: $("[name=" + $(this).attr('aria-label') + "]")[0].offsetTop - $('.foot-list')[0].offsetTop
    }, 200)
})

let timer;
$('.foot-list').scroll(function(){
    if(timer){
        clearTimeout(timer)
    }
    timer = setTimeout(function(){
        addScroll();
        timer = undefined;
    },200)
})

function debounce(fn, wait) {
    var timeout = null;
    return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}

//获取内容的偏移量(相对于浏览器顶部)
var nameOffsets = []
for (var i = 0; i < $('dl').length; i++) {
    if (nameOffsets.length != 0) {
        nameOffsets.push(Number($('dl')[i].offsetTop) - Number($('dl')[0].offsetTop))
    } else {
        nameOffsets.push(0)
    }
}

console.log('nameOffsets', nameOffsets)

function addScroll() {
    console.log('v',1212)
    //获取当前页面相对于浏览器顶部的偏移量
    var pageOffset = $('.foot-list')[0].scrollTop;
    var abs = Math.abs; //获取绝对值函数
    //查找离当前浏览器顶部的偏移量最近的菜单锚点.
    var nearHash = nameOffsets.reduce(function (a, b) {
        return abs(a - pageOffset) > abs(b - pageOffset) ? b : a;
    }, 0)
    //获取菜单锚点
    var index = nameOffsets.indexOf(nearHash);
    //给菜单锚点添加 .active ,移除其他菜单元素的.active
    $('.meun-active').removeClass('meun-active')
    // $('.meun-active').forEach(function (v) {
    //     v.className = ''
    // })
    $('.menuFont')[index].classList.add('meun-active')
}

$('.addFood').click(function(){
    $('.mask').addClass('mask--visible')
    console.log($(this))
    $(".modialog")[0].classList.add("formlefts")
    // $('.modialog')[0].style.animation = 'formleft';
    // $('.modialog')[0].style.animationDuration = '2s'
})
$(".mask").click(function(){
    $('.mask').removeClass('mask--visible');
    $(".modialog").removeClass("formlefts")
})