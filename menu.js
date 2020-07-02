// ;(function() {

NodeList.prototype.findIndex = Array.prototype.findIndex

// menu
const $menuBtn = document.querySelector('.menu__button')

function toggleMenu(e) {
    document.body.classList.toggle('active')
}

$menuBtn.addEventListener('click', toggleMenu)




// go top button
const $topBtn = document.querySelector('.btn--top')

function goTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

$topBtn.addEventListener('click', goTop)


function toggleTop() {
    console.log(window.scrollY)

    if (window.scrollY > 400) {
        $topBtn.classList.remove('hidden');
    } else {
        $topBtn.classList.add('hidden')
    }
}



function debounce(func, delay) {
    let timeout = null
    let delaytime = delay || 100

    return function () {
        let context = this
        let args = arguments

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, delaytime)
    }
}

window.addEventListener('scroll',debounce(toggleTop))
toggleTop()  // scoll會抓狀態 , 即使瀏覽器重新整理後 , scroll 狀態（位置）還是會在 , 但某些瀏覽器沒有或是避免沒有的情況下 , 會先做一次 , 抓狀態



// Carousel 輪播
const $bannerContainer = document.querySelector('.banner-container')
const $bannerPrev = document.querySelector('.banner-prev')
const $bannerNext = document.querySelector('.banner-next')
const $bannerContent = document.querySelectorAll('.banner-content')
// const $bannerControl = document.querySelector('.banner-control')
const $bannerPoints = document.querySelector('.banner-points')

let total = $bannerContent.length
let nowIndex = 1;
let moving = false

function changeBanner(index) {
    if (index < 1 || index > total) return
    nowIndex = index
    $bannerContainer.style.left = -1 * 400 * (index - 1) + 'px'
}


function prevHandler() {
    if (moving || nowIndex <= 1 ) return
    nowIndex -= 1
    changeBanner(nowIndex)
}

function nextHandler() {
    if (moving || nowIndex >= total ) return
    nowIndex += 1
    changeBanner(nowIndex)
}


$bannerPrev.addEventListener('click',prevHandler)
$bannerNext.addEventListener('click',nextHandler)

// function btnHandler() {

// }
function pointsHandler() {
    console.log(this.myindex)
    
    // Array.from 有效能問題 , 記憶體會膨脹
    // let index = Array.from($bannerPoints.querySelectorAll('button')).findIndex((ele) => {
    //     return ele === this
    // })
    // changeBanner(index + 1)

    changeBanner(this.myindex + 1)
}

for(let i = 0; i < total; i++) {
    let btn = document.createElement('button')

    btn.myindex = i // 這之前沒看過 0702

    btn.textContent = `button ${i + 1}`
    $bannerPoints.appendChild(btn)
    btn.addEventListener('click',pointsHandler)
}

// 不要相信網頁畫面
// window.addEventListener('scroll', throttle(showGoTop))
    // window.addEventListener('scroll',showGoTop)
    // 選取器效能
    // #xxx
    // .xxx
    // xxx


    // xxx + 000
    // xxx > 000
    // xxx ~ 000
    // xxx:000

    // xxx 000

    // xxx[000]

// })()