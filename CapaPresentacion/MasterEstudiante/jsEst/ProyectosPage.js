
let tablaData;

$(document).ready(function () {
    cargarMisProyectosDo();
    //cargarMisProyectos();
});

function cargarMisProyectosDo() {

    $("#contenedorMisProyectos").html('<div class="text-center w-100 mt-5"><div class="spinner-border text-primary" role="status"></div><p>Cargando historial...</p></div>');

    $.ajax({
        url: "ProyectosPage.aspx/MisProyectos",
        type: "POST",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#contenedorMisProyectos").html(""); // Limpiar

            if (response.d.Estado) {
                const lista = response.d.Data;

                if (lista.length > 0) {

                    lista.forEach(proy => {

                        // Estado visual
                        let badgeEstado = proy.Estado
                            ? '<span class="badge bg-success bg-opacity-10 text-success">Activo</span>'
                            : '<span class="badge bg-danger bg-opacity-10 text-danger">Inactivo</span>';

                        let card = `
                        <div class="col">
                            <div class="card">
                                <div class="card-header bg-light border-bottom-0">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <small class="text-uppercase text-muted fw-bold" style="font-size: 0.75rem;">
                                            <i class="ti ti-building-bank me-1"></i>${proy.NombreFeria}
                                        </small>
                                        ${badgeEstado}
                                    </div>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title fw-bold text-dark mb-2">${proy.NombreProyecto}</h5>
                                    <div class="d-flex align-items-center text-muted small mb-3">
                                        <i class="ti ti-calendar me-1"></i> Registrado: ${proy.FechaRegistroSt}
                                    </div>
                                    
                                    <button class="btn btn-primary w-100" onclick="verDetalleProyecto(${proy.IdProyecto})">
                                        <i class="ti ti-eye me-1"></i> Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>`;

                        $("#contenedorMisProyectos").append(card);
                    });

                } else {
                    $("#contenedorMisProyectos").html(`
                        <div class="col-12 text-center mt-5">
                            <img src="../Imagenes/sinimagen.png" width="100" class="mb-3 opacity-50">
                            <h5 class="text-muted">Aún no tienes proyectos registrados.</h5>
                            <a href="InicioEst.aspx" class="btn btn-primary mt-3">¡Inscribe tu primer proyecto!</a>
                        </div>
                    `);
                }
            } else {
                mostrarAlerta("Error", response.d.Mensaje, "warning", "btn btn-warning");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            mostrarAlerta("Error", "No se pudo cargar el historial.", "error", "btn btn-danger");
        }
    });
}

// Función para ver el detalle (Usando tu lógica existente) DetalleProyecto.aspx
function verDetalleProyecto(idProyecto) {
    var url = 'DetalleProyecto.aspx?id=' + idProyecto;
    window.location.href = url;

    //mostrarAlerta("¡Mensaje!", "Ver Detalle ID: " + idProyecto, "success", "btn btn-success");
}

function cargarMisProyectos() {
    if ($.fn.DataTable.isDataTable("#tbProyect")) {
        $("#tbProyect").DataTable().destroy();
        $('#tbProyect tbody').empty();
    }

    tablaData = $("#tbProyect").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ProyectosPage.aspx/MisProyectos',
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
            { "data": "IdProyecto", "visible": false, "searchable": false },
            { "data": "NombreFeria" },
            { "data": "NombreProyecto" },
            { "data": "FechaRegistroSt" },
            {
                "defaultContent": '<button class="btn btn-success btn-editar btn-sm me-2"><i class="ti ti-pencil-plus"></i></button>' +
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

$('#tbProyect tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Modificar el Id: ${data.IdProyecto}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");
    //$("#modalAdd").modal("show");

});

$('#tbProyect tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalle de: ${data.IdProyecto}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");
    //$("#modalAdd").modal("show");

});

// fin