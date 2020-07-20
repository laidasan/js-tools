;(function() {
    
    const bannerConfig = {
        $container: 'banner-container',
        $content: 'banner__content',
        $points: 'banner-points',
        $pointsClass: '',
        flySpeed: 0,
        ani: 'trans'
    }
    // fly-in
    const $banner = document.querySelector('.banner')
    const Carousel = new CarouselFlyIn($banner,bannerConfig)

    // 3d
    // const $banner = document.querySelector('.banner2')
    // const Carousel = new Carousel3D($banner)
    // Carousel.initBanner()
})()