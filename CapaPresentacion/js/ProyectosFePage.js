
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
        // Definición de columnas del DataTable
        "columns": [
            { "data": "IdProyecto", "visible": false, "searchable": false },
            { "data": "NombreProyecto" },
            {
                "data": "IdProyecto",
                "render": function (data, type, row) {

                    // Aquí usamos la nueva columna row.TieneJurados

                    let claseBoton = "btn-primary";
                    let icono = "ti ti-gavel"; // Icono de mazo/juez
                    let accion = `asignarJurado(${data})`; // Acción normal

                    // Si ya tiene jurados, cambiamos el comportamiento visual o la acción
                    if (row.Estado) {
                        claseBoton = "btn-warning"; // Color de advertencia
                        icono = "ti ti-eye"; // Icono de "Ver" en vez de asignar

                        // Opción A: Bloquear la acción y mostrar alerta al hacer click
                        accion = `mostrarAlertaJurados(${data})`;
                    }

                    return `<button type="button" class="btn ${claseBoton} btn-sm" onclick="${accion}">
                        <i class="${icono}"></i>
                    </button>`;
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
    //const textoSms = `Jurados para el id: ${idProyecto}.`;
    //mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");
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


// fin