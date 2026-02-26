
$(document).ready(function () {
    $("#txtIdProyecto").val(1);
    cargarInfoProyecto(1);
    cargarRubricaEvaluacion();
});

function cargarInfoProyecto(idProyecto) {
    var request = { IdProyecto: parseInt(idProyecto) };

    $.ajax({
        type: "POST",
        url: "/ReportesPage.aspx/ObtenerDetalleReporteProyecto",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const data = response.d.Data;

                $("#lblFeria").text(data.NombreFeria);
                $("#lblArea").text(data.AreaInvestigacion);
                $("#lblLinea").text(data.LineaInvestigacion);
                $("#lblCategoria").text(data.Categoria);

                $("#lblNombreProyecto").text(data.NombreProyecto);

                $("#lblTutorNombre").text(data.TutorNombreCompleto);
                $("#lblTutorCorreo").text(data.TutorCorreo);
                $("#imgDocente").attr("src", data.TutorImagen || "../Imagenes/sinimagen.png");

                // 4. Llenar Tabla
                // 4. Llenar Tabla
                $("#tbIntegrantes tbody").html("");

                if (data.Estudiantes && data.Estudiantes.length > 0) {
                    $.each(data.Estudiantes, function (index, est) {

                        // Validación de imagen (Operador OR)
                        let imgUrl = est.ImagenEstUrl || "../Imagenes/sinimagen.png";

                        // Construimos la fila completa respetando tu estructura HTML exacta
                        let filaHTML = `
                            <tr>
                                <td class="ps-3">
                                    <div class="d-flex align-items-center gap-2">
                                        <div>
                                            <img src="${imgUrl}" class="rounded-circle avatar-md" alt="estudiante" style="object-fit: cover;">
                                        </div>
                                        <div>
                                            <p class="mb-0 text-dark fw-medium">${est.EstudianteNombreCompleto}</p>
                                            <span class="fs-12 text-muted">${est.Codigo} - CI: ${est.NroCi}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;

                        // Agregamos la fila al cuerpo de la tabla
                        $("#tbIntegrantes tbody").append(filaHTML);
                    });
                } else {
                    // Opcional: Mostrar mensaje si no hay integrantes
                    $("#tbIntegrantes tbody").append('<tr><td class="ps-3 text-muted">No hay estudiantes asignados.</td></tr>');
                }


            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.d.Mensaje,
                    showConfirmButton: false,
                    timer: 2000
                });

                //setTimeout(function () {
                //    window.location.href = 'ProyectosFePage.aspx';
                //}, 2200);

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error de comunicación con el servidor.",
                showConfirmButton: false,
                timer: 2000
            });

            //setTimeout(function () {
            //    window.location.href = 'ProyectosFePage.aspx';
            //}, 2200);
        }
    });
}

function cargarRubricaEvaluacion() {
    $.ajax({
        url: "ProyectosAsignados.aspx/ObtenerRubricaCompleta", // Tu WebMethod
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                renderizarAcordeones(response.d.Data);
            }
        }
    });
}

function renderizarAcordeones(listaRubrica) {
    // 1. Agrupar por Aspecto
    let aspectosMap = {};

    listaRubrica.forEach(item => {
        if (!aspectosMap[item.IdAspecto]) {
            aspectosMap[item.IdAspecto] = {
                nombre: item.NombreAspecto,
                indicadores: []
            };
        }
        aspectosMap[item.IdAspecto].indicadores.push(item);
    });

    let htmlAcordeon = "";

    // 2. Iterar cada Aspecto y crear su Acordeón
    for (const key in aspectosMap) {
        let aspecto = aspectosMap[key];

        // Generamos IDs únicos para que Bootstrap sepa qué abrir/cerrar
        let idCollapse = `collapseAspecto${key}`;
        let idHeading = `headingAspecto${key}`;

        htmlAcordeon += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="${idHeading}">
                <button class="accordion-button collapsed fw-bold text-primary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#${idCollapse}" aria-expanded="false" aria-controls="${idCollapse}">
                    ${aspecto.nombre}
                </button>
            </h2>
            
            <div id="${idCollapse}" class="accordion-collapse collapse" aria-labelledby="${idHeading}"
                data-bs-parent="#accordionExample">
                
                <div class="accordion-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th style="width: 25%">Criterio</th>
                                    <th style="width: 50%">Indicador</th>
                                    <th style="width: 10%" class="text-center">Max</th>
                                    <th style="width: 15%">Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generarFilasIndicadores(aspecto.indicadores)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    }

    $("#contenedorAspectos").html(htmlAcordeon);
}

function generarFilasIndicadores(listaIndicadores) {
    let html = "";
    let ultimoCriterio = "";

    listaIndicadores.forEach(ind => {
        // Truco visual: Solo mostramos el nombre del criterio si es diferente al anterior
        let nombreCriterio = (ind.NombreCriterio !== ultimoCriterio) ? `<strong>${ind.NombreCriterio}</strong>` : "";
        ultimoCriterio = ind.NombreCriterio;

        html += `
        <tr>
            <td class="bg-light">${nombreCriterio}</td>
            <td>${ind.IndicadorDesc}</td>
            <td class="text-center"><span class="badge bg-info">${ind.PuntajeMaximo} pts</span></td>
            <td>
                <input type="number" 
                       class="form-control form-control-sm input-nota text-center fw-bold" 
                       data-id-indicador="${ind.IdIndicador}" 
                       data-max="${ind.PuntajeMaximo}"
                       min="0" max="${ind.PuntajeMaximo}" 
                       step="0.5"
                       placeholder="0">
            </td>
        </tr>`;
    });
    return html;
}

$("#btnFinalizarEvaluacion").on("click", function () {

    // 1. Bloquear botón para evitar doble clic
    let $btn = $(this);
    $btn.prop("disabled", true);

    let listaDetalles = [];
    let hayError = false;
    let camposVacios = false;

    // 2. Recorremos todos los inputs de nota
    $(".input-nota").each(function () {
        let valor = $(this).val();
        let nota = parseFloat(valor);
        let max = parseFloat($(this).data("max"));
        let idInd = $(this).data("id-indicador");

        // Validación: Vacío, No es número, Menor a 0 o Mayor al Máximo
        if (valor === "" || isNaN(nota) || nota < 0 || nota > max) {
            $(this).addClass("is-invalid"); // Pintar rojo
            hayError = true;
        } else {
            $(this).removeClass("is-invalid");

            listaDetalles.push({
                IdIndicador: idInd,
                PuntajeObtenido: nota
            });
        }
    });

    // 3. Validaciones Generales
    if (hayError) {
        ToastMaster.fire({ icon: 'error', title: 'Verifique las notas marcadas en rojo.' });
        $btn.prop("disabled", false);
        return;
    }

    if (listaDetalles.length === 0) {
        ToastMaster.fire({ icon: 'warning', title: 'No se encontraron indicadores para evaluar.' });
        $btn.prop("disabled", false);
        return;
    }

    // 4. Construir el Objeto Principal (Match con EEvaluacionRequest)
    const evaluacionRequest = {
        IdProyecto: parseInt($("#txtIdProyecto").val()), // Asegúrate de tener este input hidden
        Observaciones: $("#txtObservaciones").val().trim(),
        Finalizado: true, // true porque es el botón "Finalizar"
        Detalles: listaDetalles
    };

    // 5. Confirmación antes de enviar
    Swal.fire({
        title: '¿Finalizar Evaluación?',
        text: "Se registrarán las calificaciones y el proyecto quedará como evaluado por usted.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            enviarEvaluacion(evaluacionRequest, $btn);
        } else {
            $btn.prop("disabled", false); // Reactivar si cancela
        }
    });
});

// Función separada para el AJAX (más ordenado)
function enviarEvaluacion(objetoEvaluacion, $btn) {

    // Mostrar Loading
    $.LoadingOverlay("show");

    $.ajax({
        url: "ProyectosAsignados.aspx/RegistrarEvaluacion", // Ajusta el nombre de tu página
        type: "POST",
        data: JSON.stringify({ Evaluacion: objetoEvaluacion }), // 'Evaluacion' debe coincidir con el parámetro del WebMethod
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $.LoadingOverlay("hide");

            if (response.d.Estado) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Evaluación Exitosa!',
                    text: response.d.Mensaje,
                    confirmButtonText: 'Volver a la lista'
                }).then((result) => {
                    // Redireccionar a la lista de proyectos asignados
                    window.location.href = "InicioDocente.aspx";
                });
            } else {
                Swal.fire('Error', response.d.Mensaje, 'error');
                $btn.prop("disabled", false);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.responseText);
            Swal.fire('Error', 'Ocurrió un error al comunicarse con el servidor.', 'error');
            $btn.prop("disabled", false);
        }
    });
}

// fin