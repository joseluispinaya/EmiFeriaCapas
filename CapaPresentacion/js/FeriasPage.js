
let tablaData;
let idEditar = 0;

function ObtenerFecha() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

$(document).ready(function () {

    $.datepicker.setDefaults($.datepicker.regional["es"])
    $("#txtFechaFeria").datepicker({ dateFormat: "dd/mm/yy" });

    $("#txtFechaFeria").val(ObtenerFecha());

    listaFerias();
});

function listaFerias() {
    if ($.fn.DataTable.isDataTable("#tbFerias")) {
        $("#tbFerias").DataTable().destroy();
        $('#tbFerias tbody').empty();
    }

    tablaData = $("#tbFerias").DataTable({
        responsive: true,
        "ajax": {
            "url": 'FeriasPage.aspx/ListaFerias',
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
            { "data": "IdFeria", "visible": false, "searchable": false },
            { "data": "Nombre" },
            { "data": "FechaFeriaSt" },
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

function pruebaLista() {
    // 1. Creamos unos datos de prueba (en formato JSON)
    var datosPrueba = [
        { "Id": 1, "Descripcion": "Feria de Ciencias 2022", "Fecha": "2022-10-15", "Estado": 1 },
        { "Id": 2, "Descripcion": "Feria Tecnológica 2023", "Fecha": "2023-11-20", "Estado": 0 },
        { "Id": 3, "Descripcion": "Expociencia 2024", "Fecha": "2024-09-10", "Estado": 1 }
    ];

    // 2. Inicializamos DataTables
    $('#tbFerias').DataTable({
        data: datosPrueba,          // Le inyectamos los datos
        responsive: true,
        columns: [
            { data: 'Id' },
            { data: 'Descripcion' },
            { data: 'Fecha' },
            {
                data: 'Estado',
                render: function (data, type, row) {
                    // Si el estado es 1, mostramos un badge verde, si es 0 uno rojo
                    if (data === 1) {
                        return '<span class="badge bg-success">Activo</span>';
                    } else {
                        return '<span class="badge bg-danger">Inactivo</span>';
                    }
                }
            },
            {
                // Columna de acciones "className": "text-center" (vacía en el JSON, la llenamos con botones HTML)
                data: null,
                defaultContent: '<button class="btn btn-primary btn-sm me-2">Editar</button> <button class="btn btn-danger btn-sm">Eliminar</button>',
                orderable: false,   // Evita que se pueda ordenar por esta columna
                searchable: false,   // Evita que el buscador filtre por el texto de estos botones
                className: "text-center"
            }
        ],
        language: {
            // Esto traduce la tabla al español (Buscar, Paginación, etc.)
            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json"
        }
    });

}

$("#btnNuevore").on("click", function () {

    idEditar = 0;
    $("#txtDescripcion").val("");
    $("#txtFechaFeria").val(ObtenerFecha());

    $("#modalLabeldetalle").text("Nuevo Registro");

    $("#modalAdd").modal("show");
})

$('#tbFerias tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdFeria;
    $("#txtDescripcion").val(data.Nombre);
    $("#txtFechaFeria").val(data.FechaFeriaSt);
    $("#modalLabeldetalle").text("Editar Registro");
    $("#modalAdd").modal("show");

});

// Configuramos SweetAlert para que actúe como un Toast
const Toast = Swal.mixin({
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

function habilitarBoton() {
    $('#btnGuardarReg').prop('disabled', false);
}

$("#btnGuardarReg").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarReg').prop('disabled', true);

    if ($("#txtDescripcion").val().trim() === "") {
        //toastr.warning("", "Debe Completar el campo");
        // Reemplazas toastr.warning por esto:
        Toast.fire({
            icon: 'warning',
            title: 'Debe completar el campo de nombre'
        });

        $("#txtDescripcion").focus();
        habilitarBoton();
        return;
    }


    const objeto = {
        IdFeria: idEditar,
        Nombre: $("#txtDescripcion").val().trim(),
        FechaFeriaSt: $("#txtFechaFeria").val()
    }

    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");

    const url = idEditar === 0 ? "FeriasPage.aspx/Guardar" : "FeriasPage.aspx/Editar";

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                //swal("Mensaje", response.d.Mensaje, "success");

                Swal.fire({
                    title: "¡Mensaje!",
                    text: response.d.Mensaje,
                    icon: "success",
                    confirmButtonText: "Ok",
                    buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
                    customClass: {
                        confirmButton: "btn btn-success"
                    }
                });

                $("#modalAdd").modal('hide');
                listaFerias();
                idEditar = 0;
            } else {
                Swal.fire({
                    title: "Mensaje",
                    text: response.d.Mensaje,
                    icon: "warning",
                    confirmButtonText: "Ok",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn btn-danger"
                    }
                });

            }
        },
        error: function () {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            Swal.fire({
                title: "Error",
                text: "Error de comunicación con el servidor.",
                icon: "error",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                customClass: {
                    confirmButton: "btn btn-danger"
                }
            });
        },
        complete: function () {
            habilitarBoton();
        }
    });

})

// fin