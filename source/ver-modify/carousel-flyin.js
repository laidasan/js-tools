; (function () {

    // config example
    // let conifg = {
    //     $container: 'card-container',
    //     $content: 'card-wrap',
    //     $points: 'card-points',
    //     $pointsClass: '',
        // flySpeed: 0,
        // ani: 'trans'
    // }

    function CarouselFlyIn($banner, config) {

        

        const defaultConfig = {
            $container: '',
            $content: '',
            $points: '',
            $pointsClass: '',
            flySpeed: 300,
            ani: 'trans'
        }

        const carouselEl = {}

        Object.keys(defaultConfig).forEach((key) => {
            carouselEl[key] = config[key] || defaultConfig[key]
        })

        // this.animation = carouselEl.trans
        this.$bannerContents = Array.from($banner.querySelectorAll(`.${carouselEl.$content}`)) || null
        this.$bannerPoints = $banner.querySelector(`.${carouselEl.$points}`) || null

        Object.defineProperty(this, 'bannerConfig', {
            value: {
                total: this.$bannerContents.length,
                nowIndex: 0,
                nextIndex: 0,
                moving: false,
                timeout: null,
                flySpeed: 300,
                ani: carouselEl.ani,

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

        // append banner points
        for (let i = 0; i < this.bannerConfig.total; i++) {
            let li = document.createElement('li')
            li.className = `${carouselEl.$pointsClass} point`.trim()
            li.myindex = i
            this.$bannerPoints.appendChild(li)
        }

        this.initBanner().setFlySpeed(carouselEl.flySpeed)
    }

    CarouselFlyIn.prototype.setFlySpeed = function (speed) {
        let flyspeed = typeof speed === 'number' && speed >= 0 ? speed : 0
        this.bannerConfig.flySpeed = flyspeed
        return this
    }

    CarouselFlyIn.prototype.initBanner = function () {
        this.bannerConfig.init()

        // set banner content index
        this.$bannerContents.forEach((content, index) => { 
            content.contentIndex = index 
        })

        if(this.bannerConfig.ani === 'opacity') {
            this.$bannerContents.forEach(content => {
                content.style.position = 'absolute'
                content.style.left = '0'
                content.style.opacity = '0'
                // this.bannerConfig.ani === 'opacity' ? content.style.setProperty('opacity','0') : ''
            })
            this.$bannerContents[this.bannerConfig.nowIndex].style.setProperty('opacity','1')
        }



        this.$bannerPrev ? this.$bannerPrev.addEventListener('click', (e) => { this.prevHandler(e, this) }) : ''
        this.$bannerNext ? this.$bannerNext.addEventListener('click', (e) => { this.nextHandler(e, this) }) : ''
        this.$bannerPoints ? this.$bannerPoints.addEventListener('click', (e) => { this.pointsHandler(e, this) }) : console.log('fail')

        return this
    }



    CarouselFlyIn.prototype.changeBannerContent = function (nextIndex) {
        if (nextIndex < 0 || nextIndex > this.bannerConfig.total - 1) return

        this.bannerConfig.ani === 'trans' ? this.transAnimation(nextIndex) : this.opacityAnimation(nextIndex)

        this.bannerConfig.nowIndex = nextIndex
    }

    CarouselFlyIn.prototype.initContents = function(ani) {
        this.$bannerContents.forEach((content, index) => { 
            content.contentIndex = index 
        })

        if(ani === 'opacity') {
            this.$bannerContents.forEach(content => {
                content.style.position = 'absolute'
                content.style.left = '0'
                content.style.top = '0'
                content.style.opacity = '0'
            })
            this.$bannerContents[this.bannerConfig.nowIndex].style.setProperty('opacity','1')
        }

        return this
    }
    CarouselFlyIn.prototype.transAnimation = function(nextIndex) {
        this.$bannerContents.forEach((content) => {
            content.style.setProperty('transform',`translateX(-${nextIndex * 100}%)`)
        })
    }

    CarouselFlyIn.prototype.opacityAnimation = function(nextIndex) {
        this.$bannerContents[this.bannerConfig.nowIndex].style.setProperty('opacity','0')
        this.$bannerContents[nextIndex].style.setProperty('opacity','1')
    }

    CarouselFlyIn.prototype.prevHandler = function (e, banner) {
        if (banner.bannerConfig.nextIndex <= 0) return
        banner.bannerConfig.nextIndex -= 1
        banner.changeBannerContent(banner.bannerConfig.nextIndex)
    }

    CarouselFlyIn.prototype.nextHandler = function (e, banner) {
        if (banner.bannerConfig.nextIndex >= banner.bannerConfig.total - 1) return
        banner.bannerConfig.nextIndex += 1
        banner.changeBannerContent(banner.bannerConfig.nextIndex)
    }

    CarouselFlyIn.prototype.pointsHandler = function (e, banner) {
        console.log('click')
        let target = e.target
        console.log(target.matches('.point'))
        target.matches('.point') && target.myindex !== banner.bannerConfig.nowIndex ? banner.changeBannerContent(target.myindex) : ''
    }

    window.CarouselFlyIn = CarouselFlyIn


})()