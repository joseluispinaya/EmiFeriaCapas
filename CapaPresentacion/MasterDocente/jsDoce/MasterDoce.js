

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

$(document).ready(function () {
    const usuarioDocen = sessionStorage.getItem('usuDocent');

    if (!usuarioDocen) {
        window.location.replace('../Login.aspx');
        return;
    }

    try {
        const usua = JSON.parse(usuarioDocen);
        // mostrar la imagen y nombre del usuairo 
        $("#imgMaDoce").attr("src", usua.ImagenUrl || "/Imagenes/sinimagen.png");
        $("#txtApellidosDoce").text(usua.Apellidos);
    } catch (error) {
        console.error("Error leyendo sesión", error);
        sessionStorage.clear();
        window.location.replace('../Login.aspx');
    }
});

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
        url: "InicioDocente.aspx/CerrarSesion",
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
                window.location.replace('../Login.aspx');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error al cerrar sesión");
            // Si falla el servidor, igual sacamos al usuario visualmente por seguridad
            window.location.replace('../Login.aspx');
        }
    });
}
// fin page docente