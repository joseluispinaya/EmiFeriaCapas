
let tablaData;
let idEditar = 0;

$(document).ready(function () {

    listaCriterios();
    cargarAspectos();
});

function listaCriterios() {
    if ($.fn.DataTable.isDataTable("#tbCriterios")) {
        $("#tbCriterios").DataTable().destroy();
        $('#tbCriterios tbody').empty();
    }

    tablaData = $("#tbCriterios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'CriteriosPage.aspx/ListarCriterios',
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
            { "data": "IdCriterio", "visible": false, "searchable": false },
            { "data": "Nombre" },
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

function cargarAspectos() {

    $("#cboAspecto").html('<option value="">Cargando Aspectos...</option>');

    $.ajax({
        url: "AspectosPage.aspx/ListaAspectos",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Aspecto --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdAspecto}">${row.Nombre}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboAspecto").html(opcionesHTML);

            } else {
                $("#cboAspecto").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboAspecto").html('<option value="">Error de conexión</option>');

            // Reutilizamos tu alerta global para informar al usuario
            mostrarAlerta("Error", "No se pudieron cargar los Aspectos de evaluacion.", "error", "btn btn-danger");
        }
    });
}

$('#tbCriterios tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdCriterio;
    $("#txtNombre").val(data.Nombre);
    $("#cboAspecto").val(data.IdAspecto);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbCriterios tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles de ${data.Nombre}.`;
    detalleIndicadores(data.IdCriterio);
    $("#modalLabeldetalleCar").text(textoSms);
    $("#modalDetalles").modal("show");
});

function detalleIndicadores(idCriterio) {

    if ($.fn.DataTable.isDataTable("#tbDetallesCa")) {
        $("#tbDetallesCa").DataTable().destroy();
        $('#tbDetallesCa tbody').empty();
    }

    var request = {
        IdCriterio: parseInt(idCriterio)
    };

    $("#tbDetallesCa").DataTable({
        responsive: true,
        searching: false,
        lengthChange: false,
        paging: true,
        info: false,
        "ajax": {
            "url": 'IndicadoresPage.aspx/ListarIndicadoresPorCriterio',
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
            { "data": "IdIndicador", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            {
                "data": "PuntajeMaximo",
                "className": "text-end", // Alineado a la derecha (estándar para números)
                "render": function (data, type, row) {
                    // 'display' es lo que se ve, 'sort' es lo que usa para ordenar
                    if (type === 'display' || type === 'filter') {
                        // Convierte a número y fuerza 2 decimales
                        return parseFloat(data).toFixed(2);
                    }
                    // Para ordenar y otros usos, devuelve el número original
                    return data;
                }
            },
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtNombre").val("");
    $("#cboAspecto").val(""); // <-- Forma directa de resetear al valor "-- Seleccione --"
    //$("#cboGrados").val($("#cboGrados option:first").val());

    // Configuramos el estado por defecto
    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $("#modalLabeldetalle").text("Nuevo Registro");

    $("#modalAdd").modal("show");
})

function habilitarBoton() {
    $('#btnGuardarReg').prop('disabled', false);
}

$("#btnGuardarReg").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarReg').prop('disabled', true);

    if ($("#txtNombre").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el campo de nombre'
        });

        $("#txtNombre").focus();
        habilitarBoton();
        return;
    }

    if ($("#cboAspecto").val() === "") {
        ToastMaster.fire({ // O ToastMaster.fire según la opción que dejaste
            icon: 'warning',
            title: 'Debe seleccionar un Aspecto'
        });
        $("#cboAspecto").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdCriterio: idEditar,
        IdAspecto: parseInt($("#cboAspecto").val()),
        Nombre: $("#txtNombre").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");
    const sms = idEditar === 0 ? "Registrado " : "Actualizado ";

    $.ajax({
        url: "CriteriosPage.aspx/RegistrarOrEditar",
        type: "POST",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                ToastMaster.fire({
                    icon: 'success',
                    title: `${sms} ${response.d.Mensaje}.`
                });

                $("#modalAdd").modal('hide');
                listaCriterios();
                idEditar = 0;
            } else {
                mostrarAlerta("¡Mensaje!", "Ocurrio un error intente mas tarde", "warning", "btn btn-warning");
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

})

// fin del código de carreras