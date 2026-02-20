
$(document).ready(function () {
    const usuarioAdmin = sessionStorage.getItem('usuAdmin');

    if (!usuarioAdmin) {
        window.location.replace('Login.aspx');
        return;
    }

    try {
        const usua = JSON.parse(usuarioAdmin);
        // mostrar la imagen y nombre del usuairo 
        $("#imgAdmins").attr("src", usua.ImagenUser);
        $("#txtApellidosAdm").text(usua.Apellidos);
    } catch (error) {
        console.error("Error leyendo sesión", error);
        sessionStorage.clear();
        window.location.replace('Login.aspx');
    }
});

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

$('#salirsis').on('click', function (e) {
    e.preventDefault();

    // Opcional: Preguntar antes de salir con SweetAlert
    Swal.fire({
        title: '¿Cerrar Sesión?',
        text: "Saldrás del sistema",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            EjecutarCierreSesion();
        }
    })
});

function EjecutarCierreSesion() {
    $.ajax({
        // Asegúrate que la ruta apunte a donde pusiste el WebMethod
        // Si estás en MasterEstudiante/Inicio.aspx, la ruta es "Inicio.aspx/CerrarSesion"
        url: "Inicio.aspx/CerrarSesion",
        type: "POST",
        data: "{}",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (response.d.Estado) {
                // 1. Limpiar rastro en cliente
                sessionStorage.clear();
                localStorage.clear(); // Por si usaste localstorage

                // 2. Redireccionar
                // Usamos 'replace' para que el usuario no pueda volver atrás con el botón del navegador
                // Ajusta la ruta "../Login.aspx" dependiendo de qué tan adentro esté tu archivo
                window.location.replace('Login.aspx');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error al cerrar sesión");
            // Si falla el servidor, igual sacamos al usuario visualmente por seguridad
            window.location.replace('Login.aspx');
        }
    });
}

// Función para mostrar un mensaje de éxito