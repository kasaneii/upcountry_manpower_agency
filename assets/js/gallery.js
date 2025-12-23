  document.addEventListener('DOMContentLoaded', function() {
    const imgs = [
      { url: 'assets/imgs/photos/photo4.jpg' },
      { url: 'assets/imgs/photos/photo5.jpg' },
      { url: 'assets/imgs/photos/photo6.jpg' },
      { url: 'assets/imgs/photos/photo7.jpg' },
      { url: 'assets/imgs/photos/photo8.jpg' },
      { url: 'assets/imgs/photos/photo10.jpg' },
      { url: 'assets/imgs/photos/photo11.jpg' },
      { url: 'assets/imgs/photos/photo13.jpg' },
      { url: 'assets/imgs/photos/photo14.jpg' },
      { url: 'assets/imgs/photos/photo15.jpg' },
      { url: 'assets/imgs/photos/photo16.jpg' },
      { url: 'assets/imgs/photos/photo17.jpg' },
      { url: 'assets/imgs/photos/photo18.jpg' },
      { url: 'assets/imgs/photos/photo19.jpg' },
      { url: 'assets/imgs/photos/photo20.jpg' },
      { url: 'assets/imgs/photos/photo21.jpg' },
      { url: 'assets/imgs/photos/photo22.jpg' },
      { url: 'assets/imgs/photos/photo23.jpg' }
    ];

    const galleryImgsContainer = document.querySelector('.gallery .galleryImgs');
    const IMAGES_PER_PAGE = 6;

    function appendImages() {
      imgs.forEach((img, index) => {
        const div = document.createElement('div');
        div.classList.add('imagen');
        div.style.backgroundImage = `url("${img.url}")`;
        if (index >= IMAGES_PER_PAGE) {
          div.classList.add('hidden');
        }
        galleryImgsContainer.appendChild(div);
      });
    }

    // Initial display
    appendImages();

    // Append overlay button
    const overlayButton = document.createElement('button');
    overlayButton.classList.add('overlay');
    updateOverlayButtonText();
    galleryImgsContainer.appendChild(overlayButton);

    // Event listener for overlay button
    overlayButton.addEventListener('click', function() {
      const hiddenImages = document.querySelectorAll('.galleryImgs .imagen.hidden');
      if (hiddenImages.length === 0) {
        // All images are visible, toggle to "View Less"
        document.querySelectorAll('.galleryImgs .imagen').forEach((image, index) => {
          if (index >= IMAGES_PER_PAGE) {
            image.classList.add('hidden');
          }
        });
        updateOverlayButtonText();
      } else {
        // Show next batch of images
        hiddenImages.forEach((image, index) => {
          if (index < IMAGES_PER_PAGE) {
            image.classList.remove('hidden');
          }
        });
        updateOverlayButtonText();
      }
    });

    function updateOverlayButtonText() {
      const hiddenImages = document.querySelectorAll('.galleryImgs .imagen.hidden');
      overlayButton.innerHTML = `
        <div class="overlayBg">
          <h3 class="overlayText">${hiddenImages.length === 0 ? 'View Less' : 'View More'}</h3>
        </div>`;
    }

    setTimeout(function() {
      var gallery = document.querySelector('.gallery');
      gallery.classList.add('vis');
    }, 1000);

    var gallery = document.querySelector('.gallery');
    gallery.addEventListener('click', function(event) {
      if (event.target.classList.contains('imagen')) {
        var index = Array.from(this.querySelectorAll('.galleryImgs .imagen')).indexOf(event.target);
        var imagen = imgs[index].url;
        gallery.classList.add('scale');
        event.target.classList.add('activa');
        var fullPreview = document.createElement('div');
        fullPreview.classList.add('fullPreview');
        fullPreview.innerHTML = `
          <div class="cerrarModal"></div>
          <div class="wrapper">
            <div class="blur" style="background-image:url(${imagen})"></div>
            <img src="${imagen}">
          </div>
          <div class="controles">
            <div class="control av"></div>
            <div class="control ret"></div>
          </div>`;
        document.body.appendChild(fullPreview);
        fullPreview.style.display = 'flex';
        fullPreview.addEventListener('click', function(event) {
          if (event.target.classList.contains('cerrarModal')) {
            event.target.closest('.fullPreview').remove();
            gallery.classList.remove('scale');
            document.querySelector('.galleryImgs .imagen.activa').classList.remove('activa');
          } else if (event.target.classList.contains('control')) {
            var activa = document.querySelector('.galleryImgs .imagen.activa');
            var index;
            if (event.target.classList.contains('av')) {
              index = Array.from(activa.parentElement.children).indexOf(activa.nextElementSibling);
              if (index < 0) index = 0;
            } else {
              index = Array.from(activa.parentElement.children).indexOf(activa.previousElementSibling);
              if (index < 0) index = imgs.length - 1;
            }
            var fullPreview = document.querySelector('.fullPreview');
            fullPreview.classList.add('anim');
            setTimeout(function() {
              document.querySelector('.galleryImgs .imagen.activa').classList.remove('activa');
              if (index === imgs.length - 1 && event.target.classList.contains('av')) {
                index = 0; // Cycle back to the start
              } else if (index === 0 && event.target.classList.contains('ret')) {
                index = imgs.length - 1; // Cycle back to the end
              }
              document.querySelectorAll('.galleryImgs .imagen')[index].classList.add('activa');
              fullPreview.querySelector('.blur').style.backgroundImage = 'url(' + imgs[index].url + ')';
              fullPreview.querySelector('img').src = imgs[index].url;
              fullPreview.classList.remove('anim');
            }, 500);
          }
        });        
      }
    });
  });
