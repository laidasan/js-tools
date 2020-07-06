; (function () {

    //     // Carousel 輪播
    // const $banner = document.querySelector('.banner2')
    // const $bannerLeft = $banner.querySelector('.banner2-left')
    // const $bannerRight = $banner.querySelector('.banner2-right')
    // const $bannerContainer = document.querySelector('.banner2-container')
    // const $bannerContents = Array.from(document.querySelectorAll('.banner2-content'))


    // const PI = Math.PI
    // $bannerLeft.direct = 'left'
    // $bannerRight.direct = 'right'

    // const bannerConfig = {
    //     total: $bannerContents.length,
    //     imgWidth: document.querySelector('.banner2-content > img').getBoundingClientRect().width,
    //     rotate: 360 / this.total,
    //     rotateCount: 0,
    //     gutter: 0,

    //     // 角度換弧度 => 弧度 = ( Math.PI / 180 ) * degree
    //     transz: (this.imgWidth / 2) / Math.tan((PI / 180) * (this.rotate / 2)),

    //     init: function () {
    //         this.total = document.querySelectorAll('.banner2-content').length
    //         this.imgWidth = document.querySelector('.banner2-content > img').getBoundingClientRect().width
    //         this.rotate = 360 / this.total
    //         this.rotateCount = 0
    //         this.transz = (this.imgWidth / 2) / Math.tan((PI / 180) * (this.rotate / 2))
    //         $bannerContainer.style.setProperty('transform', `rotateY(0)`)
    //     }
    // }

    // function initBanner() {
    //     bannerConfig.init()
    //     $bannerContents.forEach((content, index) => {
    //         content.style.setProperty('transform', ` rotateY(${index * bannerConfig.rotate}deg) translateZ(${bannerConfig.transz + bannerConfig.gutter}px`)
    //     })
    // }

    // function rotateContainer(e) {
    //     let target = e.target
    //     switch (target.direct) {
    //         case 'left':
    //             bannerConfig.rotateCount += 1;
    //             $bannerContainer.style.setProperty('transform', `rotateY(${bannerConfig.rotateCount * bannerConfig.rotate}deg)`)
    //             break;
    //         case 'right':
    //             bannerConfig.rotateCount -= 1;
    //             $bannerContainer.style.setProperty('transform', `rotateY(${bannerConfig.rotateCount * bannerConfig.rotate}deg)`)
    //             break;
    //     }
    // }


    // initBanner()
    // $banner.addEventListener('click', rotateContainer)







    function Carousel3D($banner) {
        this.$banner = $banner
        this.$bannerLeft = $banner.querySelector('.banner2-left')
        this.$bannerRight = $banner.querySelector('.banner2-right')
        this.$bannerContainer = $banner.querySelector('.banner2-container')
        this.$bannerContents = Array.from($banner.querySelectorAll('.banner2-content'))
        this.$bannerLeft.direct = 'left'
        this.$bannerRight.direct = 'right'
        

        Object.defineProperty(this, 'bannerConfig', {
            value: {
                total: this.$bannerContents.length,
                imgWidth: document.querySelector('.banner2-content > img').getBoundingClientRect().width,
                rotate: 360 / this.total,
                rotateCount: 0,
                gutter: 0,

                // 角度換弧度 => 弧度 = ( Math.PI / 180 ) * degree
                transz: (this.imgWidth / 2) / Math.tan((this.PI / 180) * (this.rotate / 2)),

                init: function () {
                    this.total = document.querySelectorAll('.banner2-content').length
                    this.imgWidth = document.querySelector('.banner2-content > img').getBoundingClientRect().width
                    this.rotate = 360 / this.total
                    this.rotateCount = 0
                    this.transz = (this.imgWidth / 2) / Math.tan((Math.PI / 180) * (this.rotate / 2))
                }
            },
            writable : false,
            enumerable : true ,
            configurable : false
        })


    }

    Object.prototype.rotateContainer = function(e,banner) {
        let target = e.target
        switch (target.direct) {
            case 'left':
                banner.bannerConfig.rotateCount += 1;
                banner.$bannerContainer.style.setProperty('transform', `rotateY(${banner.bannerConfig.rotateCount * banner.bannerConfig.rotate}deg)`)
                break;
            case 'right':
                banner.bannerConfig.rotateCount -= 1;
                banner.$bannerContainer.style.setProperty('transform', `rotateY(${banner.bannerConfig.rotateCount * banner.bannerConfig.rotate}deg)`)
                break;
        }
    }

    Object.prototype.initBanner = function () {
        this.$bannerContainer.style.setProperty('transform', `rotateY(0)`)
        this.bannerConfig.init()
        console.log(this.bannerConfig)
        this.$bannerContents.forEach((content, index) => {
            content.style.setProperty('transform', `rotateY(${index * this.bannerConfig.rotate}deg) translateZ(${this.bannerConfig.transz + this.bannerConfig.gutter}px`)
        })
        this.$banner.addEventListener('click',(e) => this.rotateContainer(e,this))
    }

    
    window.Carousel3D = Carousel3D

})()