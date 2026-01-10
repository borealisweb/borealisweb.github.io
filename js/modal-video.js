function openModal(modalId) {
  var modal = document.getElementById(modalId);
  var video = modal.querySelector('video');

  modal.classList.add('show');

  if(video){
    video.currentTime = 0;
    video.loop = false;
    video.muted = false;

    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {

        })
        .catch((error) => {

          video.muted = true;
          video.play();
        });
    }
  }
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  var video = modal.querySelector('video');

  if(video){
    video.pause();
    video.currentTime = 0;
  }

  modal.classList.remove('show');
}

window.onclick = function(event){
  var modals = document.getElementsByClassName('modal');
  for(var i=0; i<modals.length; i++){
    if(event.target == modals[i]){
      closeModal(modals[i].id);
    }
  }
}

// Gallery hover dark overlay effect
document.addEventListener('DOMContentLoaded', function() {
  var galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      document.body.classList.add('gallery-hover');
    });
    
    item.addEventListener('mouseleave', function() {
      document.body.classList.remove('gallery-hover');
    });
  });
});
