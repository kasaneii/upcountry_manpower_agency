document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.querySelector('.menuBtn');
  var menu = document.querySelector('.menu');
  var menuBg = document.querySelector('.menuBg');
  var sideMenu = document.querySelector('.sideMenu');
  var closeBtn = document.querySelector('.closeBtn');

  menuBtn.addEventListener('click', function () {
    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Enable scrolling
    }
  });

  closeBtn.addEventListener('click', function () {
    menu.classList.remove('open');
    document.body.style.overflow = ''; // Enable scrolling
  });
});
