
// Configuramos SweetAlert para que actúe como un Toast
const ToastMaster = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

// Función global para mostrar alertas SweetAlert
function mostrarAlerta(titulo, mensaje, icono, claseBoton = "btn btn-primary") {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: "Ok",
        buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
        customClass: {
            confirmButton: claseBoton
        }
    });
}
//mostrarAlerta("¡Mensaje!", response.d.Mensaje, "success", "btn btn-success");

function mostrarAlertaHtml() {
    Swal.fire({
        title: "<i>HTML</i> <u>example</u>",
        icon: "info",
        html: 'Tu puedes usar <b>texto negrita</b>, <a href="#">Enlace</a> and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        customClass: {
            confirmButton: "btn btn-success me-2",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
        confirmButtonText: '<i class="ti ti-thumb-up-filled me-1"></i> Great!',
        cancelButtonText: '<i class="ti ti-thumb-down-filled"></i>'
    });
}

// Función para mostrar un mensaje de éxito