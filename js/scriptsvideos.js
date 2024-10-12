
    // Función para abrir el modal
    function openModalcontact() {
        document.getElementById("contactModal").style.display = "block";
    }

    // Función para cerrar el modal
    function closeModalcontact() {
        document.getElementById("contactModal").style.display = "none";
    }

    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.onclick = function(event) {
        var modal = document.getElementById("contactModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }






function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";

    // Detener el video
    var video = modal.querySelector('video'); // Selecciona el video dentro del modal
    if (video) {
        video.pause(); // Pausa el video
        video.currentTime = 0; // Reinicia el video al inicio
    }
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    var modals = document.getElementsByClassName("modal2");
    for (var i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            closeModal(modals[i].id); // Cierra el modal al hacer clic fuera
        }
    }
}
