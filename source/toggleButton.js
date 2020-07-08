;(() => {
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

    window.addEventListener('scroll',debounce(toggleTop))
    toggleTop()

})()