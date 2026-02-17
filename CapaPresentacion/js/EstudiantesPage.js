
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    $("#cboCarreras").prop("disabled", true);
    cargarGradosAcademi();
})

function cargarGradosAcademi() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboGrados").html('<option value="">Cargando grados...</option>');

    $.ajax({
        url: "GradosPage.aspx/ListaGradosAcademicos",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Grado --</option>';

                // aqui ya no valido Estado lo realizo en mi procedimiento almacenado
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                });

                $("#cboGrados").html(opcionesHTML);

            } else {
                $("#cboGrados").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboGrados").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboGrados").on("change", function () {
    const idGradoAcademico = $(this).val();
    $("#cboCarreras").prop("disabled", true);
    $("#cboCarreras").html('<option value="">-- Seleccione una Carrera --</option>');

    if (idGradoAcademico) {
        cargarCarreras(idGradoAcademico);
        // 2. Cargamos TODOS los estudiantes de ese grado (Mandando 0 como IdCarrera)
        // Usamos parseInt para asegurarnos de que no viaje como string vacío
        listaEstudiantes(parseInt(idGradoAcademico), 0);
    } else {
        // Si seleccionó "-- Seleccione un Grado --" (vacío), limpiamos la tabla
        if ($.fn.DataTable.isDataTable("#tbEstudiantes")) {
            $("#tbEstudiantes").DataTable().clear().draw();
        }
    }
});

function cargarCarreras(idGradoAcademico) {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboCarreras").html('<option value="">Cargando carreras...</option>');

    var request = {
        IdGradoAcademico: parseInt(idGradoAcademico)
    };

    $.ajax({
        url: "CarrerasPage.aspx/ObtenerCarrerasPorGrado",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                const lista = response.d.Data;

                if (lista != null && lista.length > 0) {

                    // Empezamos con la opción por defecto
                    let opcionesHTML = '<option value="">-- Seleccione una Carrera --</option>';

                    // aqui ya no valido Estado lo realizo en mi procedimiento almacenado
                    $.each(lista, function (i, row) {
                        opcionesHTML += `<option value="${row.IdCarrera}">${row.Nombre}</option>`;
                    });

                    $("#cboCarreras").html(opcionesHTML);
                    // Solo habilito si hay datos
                    $("#cboCarreras").prop("disabled", false);
                } else {
                    $("#cboCarreras").html('<option value="">No hay carreras en este grado</option>');
                    // Mantengo disabled true
                }

            } else {
                $("#cboCarreras").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboCarreras").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboCarreras").on("change", function () {
    const idCarrera = $(this).val();
    const idGradoAcademico = $("#cboGrados").val();

    if (idCarrera && idGradoAcademico) {
        // Cargamos a los estudiantes filtrados por Grado y Carrera específica
        listaEstudiantes(parseInt(idGradoAcademico), parseInt(idCarrera));
    } else if (idGradoAcademico) {
        // Si regresó la carrera a "-- Seleccione una Carrera --" pero el Grado sigue seleccionado,
        // volvemos a mostrar a todos los del Grado (Mandamos 0).
        listaEstudiantes(parseInt(idGradoAcademico), 0);
    }
});

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgEstud').attr('src', "Imagenes/sinimagen.png");
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo seleccionado no es una imagen válida.'
        });
        $('#imgEstud').attr('src', "Imagenes/sinimagen.png");
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgEstud').attr('src', e.target.result);
    reader.readAsDataURL(file);
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});

function listaEstudiantes(idGradoAcademico, idCarrera) {

    if ($.fn.DataTable.isDataTable("#tbEstudiantes")) {
        $("#tbEstudiantes").DataTable().destroy();
        $('#tbEstudiantes tbody').empty();
    }

    var request = {
        // Si el parseInt devuelve NaN o null, el operador '|| 0' lo convierte en un 0 seguro
        IdGradoAcademico: parseInt(idGradoAcademico) || 0,
        IdCarrera: parseInt(idCarrera) || 0
    };

    tablaData = $("#tbEstudiantes").DataTable({
        responsive: true,
        "ajax": {
            "url": 'EstudiantesPage.aspx/ListaEstudiantes',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdEstudiante", "visible": false, "searchable": false },
            {
                "data": "ImagenEstUrl",
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                render: function (data) {
                    if (!data) return '<img src="Imagenes/sinimagen.png" alt="imagen" class="img-fluid avatar-md rounded-circle">';

                    return `<img src="${data}" alt="imagen" class="img-fluid avatar-md rounded-circle">`;
                }
            },
            { "data": "FullName" },
            { "data": "NroCi" },
            { "data": "Correo" },
            { "data": "NombreCarrera" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="ti ti-pencil-plus"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="ti ti-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbEstudiantes tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    const idCarrera = $("#cboCarreras").val();

    // Validacion antes de agregar nuevo est
    if (!idCarrera) {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar una carrera'
        });
        return;
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdEstudiante;
    $("#txtNombrees").val(data.Nombres);
    $("#txtCorreo").val(data.Correo);
    $("#txtApellidos").val(data.Apellidos);
    $("#txtCelular").val(data.Celular);
    $("#txtNroci").val(data.NroCi);
    $("#txtCodigo").val(data.Codigo);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);

    $("#imgEstud").attr("src", data.ImagenEstUrl || "Imagenes/sinimagen.png");
    $("#txtFoto").val("");
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbEstudiantes tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    const idCarrera = $("#cboCarreras").val();

    // Validacion antes de agregar nuevo est
    if (!idCarrera) {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar una carrera'
        });
        return;
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles del Est: ${data.Nombres}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");

});

$("#btnNuevore").on("click", function () {

    const idGradoAcademico = $("#cboGrados").val();
    const idCarrera = $("#cboCarreras").val();

    // Validacion antes de agregar nuevo est
    if (!idGradoAcademico || !idCarrera) {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe seleccionar grado y carrera'
        });
        return;
    }

    idEditar = 0;
    $("#txtNombrees").val("");
    $("#txtCorreo").val("");
    $("#txtApellidos").val("");
    $("#txtCelular").val("");
    $("#txtNroci").val("");
    $("#txtCodigo").val("");
    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $('#imgEstud').attr('src', "Imagenes/sinimagen.png");
    $("#txtFoto").val("");
    $("#modalLabeldetalle").text("Nuevo Registro");
    $("#modalAdd").modal("show");
})

function habilitarBoton() {
    $('#btnGuardarReg').prop('disabled', false);
}

$("#btnGuardarReg").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarReg').prop('disabled', true);

    const inputs = $("#modalAdd input.model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        ToastMaster.fire({
            icon: 'warning',
            title: mensaje
        });
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }

    // 1. CAPTURAR LA IMAGEN ACTUAL
    // Leemos qué imagen tiene actualmente la etiqueta <img> en el modal
    let urlImagenActual = $("#imgEstud").attr("src");

    // Si es la imagen por defecto, la mandamos vacía para no guardar esa ruta en BD
    if (urlImagenActual.includes("sinimagen.png")) {
        urlImagenActual = "";
    }

    // 2. ARMAR EL OBJETO
    const objeto = {
        IdEstudiante: idEditar,
        Nombres: $("#txtNombrees").val().trim(),
        Apellidos: $("#txtApellidos").val().trim(),
        NroCi: $("#txtNroci").val().trim(),
        Codigo: $("#txtCodigo").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        Celular: $("#txtCelular").val().trim(),
        IdCarrera: parseInt($("#cboCarreras").val()),
        Estado: ($("#cboEstado").val() === "1" ? true : false),
        ImagenEstUrl: urlImagenActual // <-- Aquí aseguramos que viaje la foto antigua
    };

    // 3. PROCESAR EL INPUT FILE
    const fileInput = document.getElementById('txtFoto');
    const file = fileInput.files[0];

    // Si el usuario seleccionó una foto nueva, la leemos
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Extraemos solo el texto Base64, quitando la cabecera (data:image/jpeg;base64,)
            const base64String = e.target.result.split(',')[1];

            // Disparamos el AJAX enviando la imagen
            enviarAjaxEstudiante(objeto, base64String);
        };
        reader.readAsDataURL(file);
    } else {
        // Si no hay foto nueva, disparamos el AJAX mandando el base64 vacío
        enviarAjaxEstudiante(objeto, "");
    }
});

// 4. FUNCIÓN AUXILIAR AJAX
// La separamos aquí para no repetir código en el if/else de arriba
function enviarAjaxEstudiante(objeto, base64String) {
    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    const url = idEditar === 0 ? "EstudiantesPage.aspx/Guardar" : "EstudiantesPage.aspx/Editar";

    $.ajax({
        url: url,
        type: "POST",
        // IMPORTANTE: Aquí mandamos los dos parámetros exactos que pide tu WebMethod
        data: JSON.stringify({ objeto: objeto, base64Image: base64String }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                mostrarAlerta("¡Mensaje!", response.d.Mensaje, "success", "btn btn-success");
                $("#modalAdd").modal('hide');

                // Recargamos la tabla respetando el Grado y Carrera seleccionados actualmente
                const idGradoAcademico = $("#cboGrados").val();
                const idCarrera = $("#cboCarreras").val();
                listaEstudiantes(idGradoAcademico, idCarrera);

                idEditar = 0;
            } else {
                mostrarAlerta("¡Mensaje!", response.d.Mensaje, "warning", "btn btn-warning");
            }
        },
        error: function () {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlerta("¡Mensaje!", "Error de comunicación con el servidor.", "error", "btn btn-danger");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

// fin del btnNuevo