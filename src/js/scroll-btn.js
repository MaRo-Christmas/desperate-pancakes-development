function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  
  const scrollToTopButton = document.querySelector('.scroll-to-top');
  
  if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollToTopButton.classList.add('show');
      } else {
        scrollToTopButton.classList.remove('show');
      }
    });
  
    scrollToTopButton.addEventListener('click', scrollToTop);
  } else {
    console.error('Scroll-to-top button not found.');
  }
  
  