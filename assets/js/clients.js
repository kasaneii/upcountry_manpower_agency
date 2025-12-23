document.addEventListener('DOMContentLoaded', function() {
  const viewMoreBtn = document.querySelector('.viewMoreBtn');
  const expandClients = document.querySelector('.expandClients');

  viewMoreBtn.addEventListener('click', function() {
    expandClients.classList.toggle('hidden');
    if (expandClients.classList.contains('hidden')) {
      viewMoreBtn.textContent = 'View More';
    } else {
      viewMoreBtn.textContent = 'View Less';
    }
  });
});
