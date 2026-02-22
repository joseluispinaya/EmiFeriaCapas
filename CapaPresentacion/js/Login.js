
// Configuramos SweetAlert para que actúe como un Toast
const ToastLogin = Swal.mixin({
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

function habilitarBoton() {
    $('#btnIniciar').prop('disabled', false);
}


$('#btnIniciar').on('click', function () {

    $('#btnIniciar').prop('disabled', true);

    if ($("#txtCorreo").val().trim() === "" || $("#txtClave").val().trim() === "") {
        ToastLogin.fire({
            icon: 'warning',
            title: 'Complete los datos para iniciar sesion'
        });

        habilitarBoton();
        return;
    }

    if ($("#cboRol").val() === "") {
        ToastLogin.fire({
            icon: 'warning',
            title: 'Debe seleccionar un rol'
        });

        habilitarBoton();
        return;
    }

    const rol = parseInt($("#cboRol").val());

    // Configuración según el rol seleccionado
    let config = {};

    switch (rol) {
        case 1: // Admin
            config = {
                url: "Login.aspx/LoginUsuario",
                storageKey: "usuAdmin",
                redirect: "Inicio.aspx",
                tipoUser: "Usuario"
            };
            break;
        case 2: // Docente
            config = {
                url: "Login.aspx/LoginDocente",
                storageKey: "usuDocent",
                redirect: "MasterDocente/InicioDocente.aspx",
                tipoUser: "Docente"
            };
            break;
        case 3: // Estudiante
            config = {
                url: "Login.aspx/LoginEst",
                storageKey: "usuEstu",
                redirect: "MasterEstudiante/InicioEst.aspx",
                tipoUser: "Estudiante"
            };
            break;
        default:
            return;
    }

    var request = {
        Correo: $("#txtCorreo").val().trim(),
        Clave: $("#txtClave").val().trim()
    };

    // Llamamos a una UNICA función centralizada
    ejecutarLogin(config, request);
})

// Función Reutilizable
function ejecutarLogin(config, request) {
    $.ajax({
        url: config.url,
        type: "POST",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
            //$('#btnIniciar').prop('disabled', true);
        },
        success: function (response) {
            $.LoadingOverlay("hide");

            if (response.d.Estado) {
                const user = response.d.Data;

                // 1. Guardar en Storage (Solo para uso visual en JS)
                sessionStorage.clear();
                sessionStorage.setItem(config.storageKey, JSON.stringify(user));

                Swal.fire({
                    icon: "success",
                    title: "Bienvenido..",
                    text: `Hola ${user.Nombres || config.tipoUser} 👋`,
                    showConfirmButton: false,
                    timer: 2000
                });

                habilitarBoton();

                $("#txtCorreo, #txtClave").val("");

                // 2. Redireccionar
                setTimeout(() => window.location.href = config.redirect, 2200);

            } else {
                mostrarAlerta("¡Atención!", response.d.Mensaje, "warning", "btn btn-warning");
                habilitarBoton();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            mostrarAlerta("Error", "Error de comunicación con el servidor.", "error", "btn btn-danger");
            console.log(xhr.responseText);
            habilitarBoton();
        }
    });
}

function loginSistema(request) {

    $.ajax({
        url: "Login.aspx/LoginUsuario",
        type: "POST",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {
                const user = response.d.Data;
                // Limpio cualquier rastro anterior por seguridad
                sessionStorage.clear();
                sessionStorage.setItem('usuAdmin', JSON.stringify(user));

                Swal.fire({
                    icon: "success",
                    title: "Bienvenido..",
                    text: `Hola ${user.Nombres || "Usuario"} 👋`,
                    showConfirmButton: false,
                    timer: 2000
                });

                habilitarBoton();
                $("#txtCorreo, #txtClave").val("");

                // setTimeout(() => window.location.replace('Inicio.aspx'), 2200);
                setTimeout(() => window.location.href = 'Inicio.aspx', 2200);

            } else {
                mostrarAlerta("¡Mensaje!", response.d.Mensaje, "warning", "btn btn-warning");
                habilitarBoton();
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            mostrarAlerta("¡Mensaje!", "Error de comunicación con el servidor.", "error", "btn btn-danger");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            habilitarBoton();
        }
    });
}

function loginDocente(request) {

    $.ajax({
        url: "Login.aspx/LoginDocente",
        type: "POST",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {
                const user = response.d.Data;
                // Limpio cualquier rastro anterior por seguridad
                sessionStorage.clear();
                sessionStorage.setItem('usuDocent', JSON.stringify(user));

                Swal.fire({
                    icon: "success",
                    title: "Bienvenido..",
                    text: `Hola ${user.Nombres || "Docente"} 👋`,
                    showConfirmButton: false,
                    timer: 2000
                });

                habilitarBoton();
                $("#txtCorreo, #txtClave").val("");

                // setTimeout(() => window.location.replace('MasterDocente/Inicio.aspx'), 2200);
                setTimeout(() => window.location.href = 'MasterDocente/Inicio.aspx', 2200);

            } else {
                mostrarAlerta("¡Mensaje!", response.d.Mensaje, "warning", "btn btn-warning");
                habilitarBoton();
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            mostrarAlerta("¡Mensaje!", "Error de comunicación con el servidor.", "error", "btn btn-danger");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            habilitarBoton();
        }
    });
}

function loginEstudiante(request) {

    $.ajax({
        url: "Login.aspx/LoginEst",
        type: "POST",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {
                const user = response.d.Data;
                // Limpio cualquier rastro anterior por seguridad
                sessionStorage.clear();
                sessionStorage.setItem('usuEstu', JSON.stringify(user));

                Swal.fire({
                    icon: "success",
                    title: "Bienvenido..",
                    text: `Hola ${user.Nombres || "Estudiante"} 👋`,
                    showConfirmButton: false,
                    timer: 2000
                });

                habilitarBoton();
                $("#txtCorreo, #txtClave").val("");

                // setTimeout(() => window.location.replace('MasterEstudiante/Inicio.aspx'), 2200);
                setTimeout(() => window.location.href = 'MasterEstudiante/Inicio.aspx', 2200);

            } else {
                mostrarAlerta("¡Mensaje!", response.d.Mensaje, "warning", "btn btn-warning");
                habilitarBoton();
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            mostrarAlerta("¡Mensaje!", "Error de comunicación con el servidor.", "error", "btn btn-danger");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            habilitarBoton();
        }
    });
}
// login