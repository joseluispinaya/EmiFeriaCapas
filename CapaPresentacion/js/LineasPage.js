
let tablaData;
let idEditar = 0;

$(document).ready(function () {

    listaLineasInv();
    cargarAreasInv();
});

function listaLineasInv() {
    if ($.fn.DataTable.isDataTable("#tbLineas")) {
        $("#tbLineas").DataTable().destroy();
        $('#tbLineas tbody').empty();
    }

    tablaData = $("#tbLineas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'LineasPage.aspx/ListaLineasInvestigacion',
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
            { "data": "IdLinea", "visible": false, "searchable": false },
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

function cargarAreasInv() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboArea").html('<option value="">Cargando areas...</option>');

    $.ajax({
        url: "AreasPage.aspx/ListaAreasInvestigacion",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Area --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdArea}">${row.Nombre}</option>`;
                });

                //$.each(response.d.Data, function (i, row) {
                //    if (row.Estado === true) {
                //        opcionesHTML += `<option value="${row.IdGradoAcademico}">${row.Nombre}</option>`;
                //    }
                //});

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboArea").html(opcionesHTML);

            } else {
                $("#cboArea").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboArea").html('<option value="">Error de conexión</option>');

            // Reutilizamos tu alerta global para informar al usuario
            mostrarAlerta("Error", "No se pudieron cargar las Areas.", "error", "btn btn-danger");
        }
    });
}

$('#tbLineas tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdLinea;
    $("#txtNombre").val(data.Nombre);
    $("#cboArea").val(data.IdArea);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbLineas tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles de ${data.Nombre}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");

});

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtNombre").val("");
    $("#cboArea").val(""); // <-- Forma directa de resetear al valor "-- Seleccione --"
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
            title: 'Debe completar la Linea de Invest'
        });

        $("#txtNombre").focus();
        habilitarBoton();
        return;
    }

    if ($("#cboArea").val() === "") {
        ToastMaster.fire({ // O ToastMaster.fire según la opción que dejaste
            icon: 'warning',
            title: 'Debe seleccionar Area de Investigacion'
        });
        $("#cboArea").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdLinea: idEditar,
        IdArea: parseInt($("#cboArea").val()),
        Nombre: $("#txtNombre").val().trim(),
        Estado: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    const url = idEditar === 0 ? "LineasPage.aspx/Guardar" : "LineasPage.aspx/Editar";

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                //mostrarAlerta("¡Mensaje!", response.d.Mensaje, "success", "btn btn-success");
                ToastMaster.fire({
                    icon: 'success',
                    title: response.d.Mensaje
                });

                $("#modalAdd").modal('hide');
                listaLineasInv();
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

})

// fin del código de carreras