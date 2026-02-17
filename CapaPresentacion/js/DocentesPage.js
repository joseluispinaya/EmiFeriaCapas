
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaDocentes();
});

function listaDocentes() {
    if ($.fn.DataTable.isDataTable("#tbDocentes")) {
        $("#tbDocentes").DataTable().destroy();
        $('#tbDocentes tbody').empty();
    }

    tablaData = $("#tbDocentes").DataTable({
        responsive: true,
        "ajax": {
            "url": 'DocentesPage.aspx/ListaDocentes',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
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
            { "data": "IdDocente", "visible": false, "searchable": false },
            {
                "data": "ImagenUrl",
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
            { "data": "Celular" },
            {
                "data": "Estado", "className": "text-center", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-success">Activo</span>';
                    else
                        return '<span class="badge bg-danger">Inactivo</span>';
                }
            },
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

$('#tbDocentes tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdDocente;
    $("#txtNombrees").val(data.Nombres);
    $("#txtCorreo").val(data.Correo);
    $("#txtApellidos").val(data.Apellidos);
    $("#txtCelular").val(data.Celular);
    $("#txtNroci").val(data.NroCi);
    $("#txtProfesion").val(data.Profesion);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);

    $("#imgDocente").attr("src", data.ImagenUrl || "Imagenes/sinimagen.png");
    $("#txtFoto").val("");
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbDocentes tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles del Doce: ${data.Nombres}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");

});

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgDocente').attr('src', "Imagenes/sinimagen.png");
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        ToastMaster.fire({
            icon: 'error',
            title: 'El archivo seleccionado no es una imagen válida.'
        });
        $('#imgDocente').attr('src', "Imagenes/sinimagen.png");
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgDocente').attr('src', e.target.result);
    reader.readAsDataURL(file);
}

$('#txtFoto').change(function () {
    mostrarImagenSeleccionada(this);
});


$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtNombrees").val("");
    $("#txtCorreo").val("");
    $("#txtApellidos").val("");
    $("#txtCelular").val("");
    $("#txtNroci").val("");
    $("#txtProfesion").val("");
    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $('#imgDocente').attr('src', "Imagenes/sinimagen.png");
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
    let urlImagenActual = $("#imgDocente").attr("src");

    // Si es la imagen por defecto, la mandamos vacía para no guardar esa ruta en BD
    if (urlImagenActual.includes("sinimagen.png")) {
        urlImagenActual = "";
    }

    // 2. ARMAR EL OBJETO
    const objeto = {
        IdDocente: idEditar,
        Nombres: $("#txtNombrees").val().trim(),
        Apellidos: $("#txtApellidos").val().trim(),
        NroCi: $("#txtNroci").val().trim(),
        Profesion: $("#txtProfesion").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        Celular: $("#txtCelular").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false),
        ImagenUrl: urlImagenActual // <-- Aquí aseguramos que viaje la foto antigua
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
            enviarAjaxDocente(objeto, base64String);
        };
        reader.readAsDataURL(file);
    } else {
        // Si no hay foto nueva, disparamos el AJAX mandando el base64 vacío
        enviarAjaxDocente(objeto, "");
    }
});

// 4. FUNCIÓN AUXILIAR AJAX
// La separamos aquí para no repetir código en el if/else de arriba
function enviarAjaxDocente(objeto, base64String) {
    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    const url = idEditar === 0 ? "DocentesPage.aspx/Guardar" : "DocentesPage.aspx/Editar";

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
                listaDocentes();

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

// fin