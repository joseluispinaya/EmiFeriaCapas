
$(document).ready(function () {
    cargarProyectosEvaluar();
});

function cargarProyectosEvaluar() {

    $("#contenedorMisProyectos").html('<div class="text-center w-100 mt-5"><div class="spinner-border text-primary" role="status"></div><p>Cargando historial...</p></div>');

    $.ajax({
        url: "ProyectosAsignados.aspx/MisProyectosJurado",
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
                                        <i class="ti ti-check me-1"></i> Ir a Evaluar
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
                            <h5 class="text-muted">Aún no tienes proyectos asignados.</h5>
                        </div>
                    `);
                }
            } else {
                mostrarAlerta("Error", response.d.Mensaje, "warning", "btn btn-warning");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            mostrarAlerta("Error", "No se pudo cargar los proyectos asignados.", "error", "btn btn-danger");
        }
    });
}

// Función para ver el detalle (Usando tu lógica existente) DetalleProyecto.aspx
function verDetalleProyecto(idProyecto) {
    var url = 'EvaluacionPage.aspx?id=' + idProyecto;
    window.location.href = url;

    //mostrarAlerta("¡Mensaje!", "Ver Detalle ID: " + idProyecto, "success", "btn btn-success");
}


// fin