;(function() {
    const $menuBtn = document.querySelector('.menu__button')

    function toggleMenu(e) {
        document.body.classList.toggle('active')
    }

    $menuBtn.addEventListener('click',toggleMenu)
})()