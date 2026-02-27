
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const nombreJurado = urlParams.get('jurado');
    //const idProyecto = urlParams.get('idPro');
    const idEvaluacion = urlParams.get('idEva');
    const tituloPro = urlParams.get('titulo');

    // Corrección lógica: Si NO hay ID o está vacío, mostramos error
    if (idEvaluacion === null || idEvaluacion.trim() === "") {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No hay un parámetro válido recibido. El formulario se cerrará.",
            showConfirmButton: false,
            timer: 2000
        });

        setTimeout(function () {
            window.close();
        }, 2200);

    } else {
        cargarDetalleReporte(idEvaluacion);
        $("#lblNombreJuradoImpresion").text(nombreJurado);
        $("#lblNombreProyectoImpresion").text(tituloPro);
    }
});

function cargarDetalleReporte(idEvaluacion) {
    $.ajax({
        url: "ResultadosEvaPage.aspx/VerDetalleEvaluacion", // Tu método existente
        type: "POST",
        data: JSON.stringify({ IdEvaluacion: parseInt(idEvaluacion) }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                renderizarTablasReporte(response.d.Data);
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.d.Mensaje,
                    showConfirmButton: false,
                    timer: 2000
                });

                setTimeout(function () {
                    window.close();
                }, 2200);
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

            setTimeout(function () {
                window.close();
            }, 2200);
        }
    });
}

function renderizarTablasReporte(datos) {
    let html = '';
    let notaFinal = 0;

    // Agrupamos los datos primero por ASPECTO y luego por CRITERIO para poder calcular los ROWSPANS
    let aspectosMap = {};

    datos.forEach(item => {
        if (!aspectosMap[item.IdAspecto]) {
            aspectosMap[item.IdAspecto] = { nombre: item.NombreAspecto, criterios: {}, subtotal: 0, rowSpanAspecto: 0 };
        }

        if (!aspectosMap[item.IdAspecto].criterios[item.IdCriterio]) {
            aspectosMap[item.IdAspecto].criterios[item.IdCriterio] = { nombre: item.NombreCriterio, indicadores: [] };
        }

        aspectosMap[item.IdAspecto].criterios[item.IdCriterio].indicadores.push(item);
        aspectosMap[item.IdAspecto].subtotal += item.PuntajeObtenido;
        aspectosMap[item.IdAspecto].rowSpanAspecto++; // Contamos cuántos indicadores en total tiene el aspecto
        notaFinal += item.PuntajeObtenido;
    });

    // Construcción del HTML
    for (const idAsp in aspectosMap) {
        const aspecto = aspectosMap[idAsp];

        html += `
        <table>
            <thead>
                <tr>
                    <th style="width: 15%;">ASPECTO</th>
                    <th style="width: 25%;">CRITERIO</th>
                    <th style="width: 40%;">INDICADORES</th>
                    <th style="width: 10%;">PUNTAJE MÁXIMO</th>
                    <th style="width: 10%;">PUNTAJE OBTENIDO</th>
                </tr>
            </thead>
            <tbody>`;

        let isFirstAspectRow = true;

        for (const idCrit in aspecto.criterios) {
            const criterio = aspecto.criterios[idCrit];
            let isFirstCritRow = true;

            criterio.indicadores.forEach(ind => {
                html += `<tr>`;

                // Imprimir celda de ASPECTO solo en la primera fila del aspecto
                if (isFirstAspectRow) {
                    html += `<td rowspan="${aspecto.rowSpanAspecto}" class="text-center">${aspecto.nombre}</td>`;
                    isFirstAspectRow = false;
                }

                // Imprimir celda de CRITERIO solo en la primera fila del criterio
                if (isFirstCritRow) {
                    html += `<td rowspan="${criterio.indicadores.length}">${criterio.nombre}</td>`;
                    isFirstCritRow = false;
                }

                // Imprimir Indicador, Máximo y Obtenido (Estas se imprimen siempre)
                html += `
                    <td>${ind.IndicadorDesc}</td>
                    <td class="text-center">${ind.PuntajeMaximo}</td>
                    <td class="text-center fw-bold">${ind.PuntajeObtenido.toFixed(2)}</td>
                </tr>`;
            });
        }

        // Fila de Total Parcial del Aspecto
        html += `
                <tr>
                    <td colspan="3" class="text-right fw-bold">TOTAL PARCIAL DE PUNTOS</td>
                    <td class="text-center fw-bold"></td> 
                    <td class="text-center fw-bold bg-yellow">${aspecto.subtotal.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        <div class="nota-tabla">NOTA: El puntaje admite hasta dos decimales.</div>
        <br><br>`;
    }

    // Inyectamos todo
    $("#contenedorTablasReporte").html(html);
    $("#lblNotaFinalTotal").text(notaFinal.toFixed(2));
}
// fin reporte calificacion