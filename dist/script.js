document.addEventListener('scroll', function () {
  const events = document.querySelectorAll('.timeline-event');
  const triggerBottom = window.innerHeight * 0.8;

  events.forEach(event => {
      const eventTop = event.getBoundingClientRect().top;
      if (eventTop < triggerBottom) {
          event.classList.add('show');
      }
  });
});