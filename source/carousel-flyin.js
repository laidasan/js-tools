; (function () {

    // // Carousel 輪播
    // const $bannerContents = Array.from(document.querySelectorAll('.banner-content'))
    // const $bannerPrev = document.querySelector('.banner-prev')
    // const $bannerNext = document.querySelector('.banner-next')
    // const $bannerPoints = document.querySelector('.banner-points')



    // const bannerConfig = {
    //     total: $bannerContents.length,
    //     nowIndex: 0,
    //     nextIndex: 0,
    //     moving: false,
    //     timeout: null,
    //     flySpeed: 300,

    //     init: function () {
    //         this.nowIndex = 0
    //         this.nextIndex = 0
    //         this.moving = false
    //         clearTimeout(this.timeout)
    //         this.timeout = null
    //     }
    // }

    // function initBanner() {
    //     bannerConfig.init()

    //     // set banner content index
    //     $bannerContents.forEach((content, index) => { content.contentIndex = index })

    //     // append banner points
    //     for (let i = 0; i < bannerConfig.total; i++) {
    //         let li = document.createElement('li')
    //         li.className = 'banner-point'
    //         li.myindex = i
    //         $bannerPoints.appendChild(li)
    //     }
    // }

    // function changeBannerContent(nextIndex) {
    //     if (nextIndex < 0 || nextIndex > bannerConfig.total - 1) return

    //     let thisIndex = bannerConfig.nowIndex
    //     bannerConfig.nowIndex = nextIndex

    //     bannerConfig.moving = true

    //     nextIndex > thisIndex ? $bannerContents[thisIndex].style.setProperty('transform', `translateX(-100%)`) :
    //         $bannerContents[thisIndex].style.setProperty('transform', `translateX(100%)`)
    //     $bannerContents[thisIndex].classList.remove('show')


    //     clearTimeout(bannerConfig.timeout)
    //     bannerConfig.timeout = setTimeout(function () {
    //         $bannerContents[nextIndex].style.removeProperty('transform')
    //         $bannerContents[nextIndex].classList.add('show')
    //         bannerConfig.moving = false
    //     }, bannerConfig.flySpeed)
    // }

    // // 這裡分開來寫較好 , 分別判斷比較方便 0703
    // function prevHandler() {
    //     if (bannerConfig.nextIndex <= 0) return
    //     bannerConfig.nextIndex -= 1
    //     changeBannerContent(bannerConfig.nextIndex)
    // }

    // function nextHandler() {
    //     if (bannerConfig.nextIndex >= bannerConfig.total - 1) return
    //     bannerConfig.nextIndex += 1
    //     changeBannerContent(bannerConfig.nextIndex)
    // }


    // // function pointsHandler(e) { e.target.matches('.banner-point') ? changeBannerContent(e.target.myindex) : ''}
    // function pointsHandler(e) {
    //     let target = e.target
    //     target.matches('.banner-point') && target.myindex !== bannerConfig.nowIndex ? changeBannerContent(target.myindex) : ''
    // }

    // initBanner()
    // $bannerPrev.addEventListener('click', prevHandler)
    // $bannerNext.addEventListener('click', nextHandler)
    // $bannerPoints.addEventListener('click', pointsHandler)

     function CarouselFlyIn($banner) {
        this.$bannerContents = Array.from($banner.querySelectorAll('.banner-content')) || null
        this.$bannerPrev = $banner.querySelector('.banner-prev') || null
        this.$bannerNext = $banner.querySelector('.banner-next') || null
        this.$bannerPoints = $banner.querySelector('.banner-points') || null


        Object.defineProperty(this, 'bannerConfig', {
            value: {
                total: this.$bannerContents.length,
                nowIndex: 0,
                nextIndex: 0,
                moving: false,
                timeout: null,
                flySpeed: 300,

                init: function () {
                    this.nowIndex = 0
                    this.nextIndex = 0
                    this.moving = false
                    clearTimeout(this.timeout)
                    this.timeout = null
                }
            },
            writable: false,
            enumerable: true,
            configurable: false
        })
    }

    CarouselFlyIn.prototype.initBanner = function(banner) {
        this.bannerConfig.init()

        // set banner content index
        this.$bannerContents.forEach((content, index) => { content.contentIndex = index })

        // append banner points
        for (let i = 0; i < this.bannerConfig.total; i++) {
            let li = document.createElement('li')
            li.className = 'banner-point'
            li.myindex = i
            this.$bannerPoints.appendChild(li)
        }

        console.log(banner)
        this.$bannerPrev.addEventListener('click', (e) => {this.prevHandler(e,this)})
        this.$bannerNext.addEventListener('click', (e) => {this.nextHandler(e,this)})
        this.$bannerPoints.addEventListener('click', (e) => {this.pointsHandler(e,this)})
        return this
    }

    CarouselFlyIn.prototype.changeBannerContent = function (nextIndex) {
        if (nextIndex < 0 || nextIndex > this.bannerConfig.total - 1) return

        let thisIndex = this.bannerConfig.nowIndex
        this.bannerConfig.nowIndex = nextIndex

        this.bannerConfig.moving = true

        nextIndex > thisIndex ? this.$bannerContents[thisIndex].style.setProperty('transform', `translateX(-100%)`) :
            this.$bannerContents[thisIndex].style.setProperty('transform', `translateX(100%)`)
        this.$bannerContents[thisIndex].classList.remove('show')


        clearTimeout(this.bannerConfig.timeout)
        this.bannerConfig.timeout = setTimeout(() => {
            this.$bannerContents[nextIndex].style.removeProperty('transform')
            this.$bannerContents[nextIndex].classList.add('show')
            this.bannerConfig.moving = false
        }, this.bannerConfig.flySpeed)
    }

    CarouselFlyIn.prototype.prevHandler = function(e,banner) {
        if (banner.bannerConfig.nextIndex <= 0) return
        banner.bannerConfig.nextIndex -= 1
        banner.changeBannerContent(banner.bannerConfig.nextIndex)
    }

    CarouselFlyIn.prototype.nextHandler = function(e,banner) {
        if (banner.bannerConfig.nextIndex >= banner.bannerConfig.total - 1) return
        banner.bannerConfig.nextIndex += 1
        banner.changeBannerContent(banner.bannerConfig.nextIndex)
    }

    CarouselFlyIn.prototype.pointsHandler = function(e,banner) {
        let target = e.target
        target.matches('.banner-point') && target.myindex !== banner.bannerConfig.nowIndex ? banner.changeBannerContent(target.myindex) : ''
    }

    window.CarouselFlyIn = CarouselFlyIn

    
})()