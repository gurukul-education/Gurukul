
// SCROLL ANIMATION
const elements = document.querySelectorAll('.slide-up, .slide-left, .slide-right');

window.addEventListener('scroll', () => {
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(position < screenHeight - 100) {
            el.classList.add('active');
        }
    });
});
