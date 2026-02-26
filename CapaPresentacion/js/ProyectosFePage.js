
let tablaData;

$(document).ready(function () {
    cargarListaFerias();
})

function cargarListaFerias() {

    $("#cboFerias").html('<option value="">Cargando ferias...</option>');

    $.ajax({
        url: "FeriasPage.aspx/ListaFerias",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione una feria --</option>';

                // aqui ya no valido Estado lo realizo en mi procedimiento almacenado
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdFeria}">${row.Nombre}</option>`;
                });

                $("#cboFerias").html(opcionesHTML);

            } else {
                $("#cboFerias").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboFerias").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboFerias").on("change", function () {
    const idFeria = $(this).val();

    if (idFeria) {
        listaProyectos(parseInt(idFeria));
    } else {
        // Si seleccionó "-- Seleccione una Feria --" (vacío), limpiamos la tabla
        if ($.fn.DataTable.isDataTable("#tbProyect")) {
            $("#tbProyect").DataTable().clear().draw();
        }
    }
});


function listaProyectos(idFeria) {

    // 1. Limpieza si ya existe la tabla
    if ($.fn.DataTable.isDataTable("#tbProyect")) {
        $("#tbProyect").DataTable().destroy();
        $('#tbProyect tbody').empty();
    }

    var request = {
        IdFeria: parseInt(idFeria)
    };

    tablaData = $("#tbProyect").DataTable({
        responsive: true,
        "ajax": {
            "url": 'ProyectosFePage.aspx/ListarProyectosPorFeria',
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
            { "data": "IdProyecto", "visible": false, "searchable": false },
            { "data": "NombreProyecto" },
            {
                "data": "IdProyecto",
                "className": "text-center", // Centramos el contenido de la celda
                "render": function (data, type, row) {

                    // --- BOTÓN 1: GESTIÓN (Asignar o Editar) ---
                    let btnGestion = "";

                    if (row.Estado) {
                        // CASO: Ya tiene jurados -> MODO EDICIÓN
                        // Usamos btn-warning (Amarillo) y ti-pencil (Lápiz)
                        // Llama a mostrarAlertaJurados (que ya tienes hecha)
                        btnGestion = `<button type="button" class="btn btn-warning btn-sm" onclick="mostrarAlertaJurados(${data})" title="Editar Asignación">
                                        <i class="ti ti-pencil"></i>
                                      </button>`;
                    } else {
                        // CASO: Nuevo -> MODO ASIGNACIÓN
                        // Usamos btn-primary (Azul) y ti-gavel (Mazo)
                        // Llama a asignarJurado (que ya tienes hecha)
                        btnGestion = `<button type="button" class="btn btn-primary btn-sm" onclick="asignarJurado(${data})" title="Asignar Jurados">
                                        <i class="ti ti-gavel"></i>
                                      </button>`;
                    }

                    // --- BOTÓN 2: VER DETALLES (Siempre visible) ---
                    // Usamos btn-info (Celeste) y ti-eye (Ojo)
                    // Llama a verDetalleProyecto (Nueva función)
                    // Agregamos 'ms-1' para separarlo un poquito del primer botón
                    let btnDetalle = `<button type="button" class="btn btn-info btn-sm" onclick="verDetalleProyecto(${data})" title="Ver Detalles del Proyecto">
                                        <i class="ti ti-eye"></i>
                                      </button>`;

                    // Devolvemos ambos botones juntos
                    return `<div class="d-flex justify-content-center gap-2">${btnGestion}${btnDetalle}</div>`;
                }
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function asignarJurado(idProyecto) {
    // Caso 1: Asignar nuevo (Pasamos false)
    window.location.href = 'AsignacionJurados.aspx?id=' + idProyecto + '&esEdicion=false';
    
}

function mostrarAlertaJurados(idProyecto) {
    Swal.fire({
        icon: 'info',
        title: '¡Aviso!',
        text: 'Este proyecto ya cuenta con jurados asignados. ¿Desea editar la asignación?',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Caso 2: Editar existente (Pasamos true)
            window.location.href = 'AsignacionJurados.aspx?id=' + idProyecto + '&esEdicion=true';
        }
    });
}

// --- Agrega esta función al final de tu archivo JS ---
function verDetalleProyecto(idProyecto) {
    // Redirecciona a la página de resultados/detalles pasando el ID
    // Asegúrate de cambiar 'ResultadosEvaPage.aspx' por el nombre real de tu página destino
    window.location.href = 'ResultadosEvaPage.aspx?id=' + idProyecto;
    //const textoSms = `Resultados para el id: ${idProyecto}.`;
    //mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");
}

// fin