// Show the button when the page is loaded and the user hasn't scrolled yet
window.addEventListener('load', function() {
    if (window.scrollY === 0) {
      document.getElementById('skip-to-content').style.display = 'block';
    }
  });
  
  // Hide the button when the user scrolls down
  window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
      document.getElementById('skip-to-content').style.display = 'none';
    }
  });
  