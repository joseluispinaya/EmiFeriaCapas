
let tablaData;
let tablaDetalles;
let idEditar = 0;

$(document).ready(function () {

    listaAspectos();
    //inicializarTablaDetalles();
});

function inicializarTablaDetalles() {
    tablaDetalles = $("#tbDetallesCa").DataTable({
        responsive: true,
        searching: false,
        lengthChange: false,
        paging: true,
        info: false,
        autoWidth: false, // Importante para modales
        ordering: false, // Opcional: quitar ordenamiento si no lo necesitas
        "columns": [
            { "data": "IdCriterio", "visible": false },
            { "data": "Nombre" }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
            "emptyTable": "No hay criterios registrados para este aspecto"
        }
    });
}

function listaAspectos() {
    if ($.fn.DataTable.isDataTable("#tbDatas")) {
        $("#tbDatas").DataTable().destroy();
        $('#tbDatas tbody').empty();
    }

    tablaData = $("#tbDatas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'AspectosPage.aspx/ListaAspectos',
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
            { "data": "IdAspecto", "visible": false, "searchable": false },
            { "data": "Nombre" },
            { "data": "CantCriterios" },
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

$('#tbDatas tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdAspecto;
    $("#txtNombre").val(data.Nombre);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbDatas tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Criterios de: ${data.Nombre}.`;
    //mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");
    detalleCriteriosOriginal(data.IdAspecto);
    $("#modalLabeldetalleCar").text(textoSms);
    $("#modalDetalles").modal("show");

});

function detalleCriteriosOriginal(idAspecto) {

    if ($.fn.DataTable.isDataTable("#tbDetallesCa")) {
        $("#tbDetallesCa").DataTable().destroy();
        $('#tbDetallesCa tbody').empty();
    }

    var request = {
        IdAspecto: parseInt(idAspecto)
    };

    $("#tbDetallesCa").DataTable({
        responsive: true,
        searching: false,
        lengthChange: false,
        paging: true,
        info: false,
        "ajax": {
            "url": 'CriteriosPage.aspx/ListarCriteriosPorAspecto',
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
            { "data": "IdCriterio", "visible": false, "searchable": false },
            { "data": "Nombre" }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function detalleCriterios(idAspecto) {
    var request = { IdAspecto: parseInt(idAspecto) };

    // URL del WebMethod
    var url = 'CriteriosPage.aspx/ListarCriteriosPorAspecto';

    // Usamos la magia de recarga sin destruir la tabla
    // MAGIA DE DATATABLES: ajax.url().load()
    tablaDetalles.ajax.url(url).load({
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "dataType": "json",
        "data": function () {
            return JSON.stringify(request);
        },
        "dataSrc": function (json) {
            return json.d.Estado ? json.d.Data : [];
        }
    });
}

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtNombre").val("");
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

    const objeto = {
        IdAspecto: idEditar,
        Nombre: $("#txtNombre").val().trim(),
        Estado: ($("#cboEstado").val() == "1" ? true : false)
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");
    const sms = idEditar === 0 ? "Registrado " : "Actualizado ";

    $.ajax({
        url: "AspectosPage.aspx/GuardarOrEditar",
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
                listaAspectos();
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