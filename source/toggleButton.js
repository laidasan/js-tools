;(() => {
    const $topBtn = document.querySelector('.btn--top')

    function goTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    // $topBtn.addEventListener('click', goTop)
})()