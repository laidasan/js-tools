;(function() {

    // Carousel 輪播
    const $bannerContents = Array.from(document.querySelectorAll('.banner-content'))
    const $bannerPrev = document.querySelector('.banner-prev')
    const $bannerNext = document.querySelector('.banner-next')
    const $bannerPoints = document.querySelector('.banner-points')


    
    const bannerConfig = {
        total : $bannerContents.length,
        nowIndex : 0,
        nextIndex : 0,
        moving : false,
        timeout : null,
        flySpeed: 300,

        init : function() {
            this.nowIndex = 0
            this.nextIndex = 0
            this.moving = false
            clearTimeout(this.timeout)
            this.timeout = null
        }
    }
    
    function initBanner() {
        bannerConfig.init()

        // set banner content index
        $bannerContents.forEach((content , index) => { content.contentIndex = index })

        // append banner points
        for(let i = 0; i < bannerConfig.total; i++) {
            let li = document.createElement('li')
            li.className = 'banner-point'
            li.myindex = i
            $bannerPoints.appendChild(li)
        }
    }
    
    function changeBannerContent(nextIndex) {
        if (nextIndex < 0 || nextIndex > bannerConfig.total - 1) return
    
        let thisIndex = bannerConfig.nowIndex
        bannerConfig.nowIndex = nextIndex
    
        bannerConfig.moving = true

        nextIndex > thisIndex ? $bannerContents[thisIndex].style.setProperty('transform',`translateX(-100%)`) :
                                $bannerContents[thisIndex].style.setProperty('transform',`translateX(100%)`)
        $bannerContents[thisIndex].classList.remove('show')
    
    
        clearTimeout(bannerConfig.timeout)
        bannerConfig.timeout = setTimeout(function() {
            $bannerContents[nextIndex].style.removeProperty('transform')
            $bannerContents[nextIndex].classList.add('show')
            bannerConfig.moving = false
        },bannerConfig.flySpeed)
    
    }

    // 這裡分開來寫較好 , 分別判斷比較方便 0703
    function prevHandler() {
        if ( bannerConfig.nextIndex <= 0 ) return
        bannerConfig.nextIndex -= 1
        changeBannerContent(bannerConfig.nextIndex)
    }
    
    function nextHandler() {
        if ( bannerConfig.nextIndex >= bannerConfig.total -1 ) return
        bannerConfig.nextIndex += 1
        changeBannerContent(bannerConfig.nextIndex)
    }
   
    
    // function pointsHandler(e) { e.target.matches('.banner-point') ? changeBannerContent(e.target.myindex) : ''}
    function pointsHandler(e) { 
        let target = e.target
        target.matches('.banner-point') && target.myindex !== bannerConfig.nowIndex ? changeBannerContent(target.myindex) : ''
    }

    initBanner()
    $bannerPrev.addEventListener('click',prevHandler)
    $bannerNext.addEventListener('click',nextHandler)
    $bannerPoints.addEventListener('click',pointsHandler)
})()