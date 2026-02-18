
let tablaData;
let idEditar = 0;

$(document).ready(function () {

    listaCategorias();
});

function listaCategorias() {
    if ($.fn.DataTable.isDataTable("#tbCategorias")) {
        $("#tbCategorias").DataTable().destroy();
        $('#tbCategorias tbody').empty();
    }

    tablaData = $("#tbCategorias").DataTable({
        responsive: true,
        "ajax": {
            "url": 'CategoriasPage.aspx/ListaCategorias',
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
            { "data": "IdCategoria", "visible": false, "searchable": false },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            {
                "data": "Estado", render: function (data) {
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

$('#tbCategorias tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdCategoria;
    $("#txtNombre").val(data.Nombre);
    $("#txtDescripcion").val(data.Descripcion);
    $("#cboEstado").val(data.Estado ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

$('#tbCategorias tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalles del Categoria: ${data.Nombre}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");

});

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
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

    if ($("#txtDescripcion").val().trim() === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Debe completar el campo descripcion'
        });

        $("#txtDescripcion").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdCategoria: idEditar,
        Nombre: $("#txtNombre").val().trim(),
        Descripcion: $("#txtDescripcion").val().trim(),
        Estado: ($("#cboEstado").val() == "1" ? true : false)
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    const url = idEditar === 0 ? "CategoriasPage.aspx/Guardar" : "CategoriasPage.aspx/Editar";

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
                listaCategorias();
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

// fin page