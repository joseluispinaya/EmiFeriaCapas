
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idProyecto = urlParams.get('id');

    if (idProyecto === null || idProyecto.trim() === "") {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No hay un parámetro válido recibido.",
            showConfirmButton: false,
            timer: 2000
        });

        setTimeout(function () {
            window.location.href = 'ProyectosFePage.aspx';
        }, 2200);

    } else {
        $("#txtIdProyecto").val(idProyecto);
        cargarInfoProyecto(idProyecto);
    }
});

function cargarInfoProyecto(idProyecto) {
    var request = { IdProyecto: parseInt(idProyecto) };

    $.ajax({
        type: "POST",
        url: "ReportesPage.aspx/ObtenerDetalleReporteProyecto",
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
                $("#imgDocente").attr("src", data.TutorImagen || "Imagenes/sinimagen.png");

                cargarNotasJurados(idProyecto);
                notaFinalProyecto(idProyecto);
                // 4. Llenar Tabla
                // 4. Llenar Tabla
                $("#tbIntegrantes tbody").html("");

                if (data.Estudiantes && data.Estudiantes.length > 0) {
                    $.each(data.Estudiantes, function (index, est) {

                        // Validación de imagen (Operador OR)
                        let imgUrl = est.ImagenEstUrl || "Imagenes/sinimagen.png";

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

                setTimeout(function () {
                    window.location.href = 'ProyectosFePage.aspx';
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
                window.location.href = 'ProyectosFePage.aspx';
            }, 2200);
        }
    });
}

function notaFinalProyecto(idProyecto) {
    var request = { IdProyecto: parseInt(idProyecto) };

    $.ajax({
        type: "POST",
        url: "ResultadosEvaPage.aspx/ObtenerNotaFinalProyecto",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            // 1. Limpiamos el contenedor por si se ejecuta varias veces
            $("#rater2").html("");
            $("#lblNotaNumerica").text("");
            $("#lblEstadoCalificacion").text("");

            if (response.d.Estado) {
                const data = response.d.Data; // Aquí viene tu objeto

                // data.NotaFinalPromedio viene ej: 85.50
                // data.CantidadJuradosQueCalificaron ej: 3

                if (data.NotaTotal > 0) {

                    // A) CONVERSIÓN DE ESCALA (100 -> 5)
                    let ratingEstrellas = data.NotaTotal / 20;

                    // B) INICIALIZAR RATER-JS
                    var myRater = raterJs({
                        element: document.querySelector("#rater2"),
                        starSize: 20, // Tamaño de la estrella en px
                        rating: ratingEstrellas, // El valor calculado (ej: 4.2)
                        max: 5,
                        readOnly: true, // IMPORTANTE: Solo lectura, no se puede votar
                        step: 0.1 // Permite medias estrellas o decimales
                    });

                    // C) MOSTRAR LA NOTA NUMÉRICA AL LADO
                    $("#lblNotaNumerica").text(data.NotaTotal.toFixed(2) + " / 100");
                    $("#lblEstadoCalificacion").text(`Basado en ${data.IdEvaluacion} jurado(s).`);

                } else {
                    mostrarSinCalificacion();
                }

            } else {
                mostrarSinCalificacion();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            mostrarSinCalificacion();
        }
    });
}

// Función auxiliar para no repetir código
function mostrarSinCalificacion() {
    // Inicializamos el rater en 0 estrellas
    var myRater = raterJs({
        element: document.querySelector("#rater2"),
        starSize: 20,
        rating: 0,
        max: 5,
        readOnly: true
    });

    $("#lblNotaNumerica").text("0.00 / 100");
    $("#lblEstadoCalificacion").text("Sin calificación registrada.");
}

function cargarNotasJurados(idProyecto) {
    var request = { IdProyecto: parseInt(idProyecto) };

    // Limpiamos la tabla antes de cargar para evitar duplicados o "parpadeos"
    $("#tbNotasJurados tbody").empty();

    $.ajax({
        type: "POST",
        url: "ResultadosEvaPage.aspx/ListarNotasPorJurado",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const data = response.d.Data;
                let htmlContent = ""; // Es más eficiente concatenar texto y luego insertar una sola vez

                if (data && data.length > 0) {
                    $.each(data, function (index, est) {

                        // Validación de imagen
                        let imgUrl = est.ImagenUrl || "Imagenes/sinimagen.png";

                        // Construcción de la fila
                        htmlContent += `
                        <tr>
                            <td class="ps-3">
                                <div class="d-flex align-items-center gap-3">
                                    <div>
                                        <img src="${imgUrl}" class="rounded-circle avatar-md border border-light" alt="jurado" style="object-fit: cover; width: 40px; height: 40px;">
                                    </div>
                                    
                                    <div>
                                        <h6 class="mb-1 text-dark fw-bold fs-14">${est.NombreCompleto}</h6>
                                        <div class="d-flex align-items-center">
                                            <i class="ti ti-star-filled text-warning me-1 fs-14"></i>
                                            <span class="fs-13 text-muted">
                                                Nota: <span class="fw-bold text-dark">${est.NotaTotal.toFixed(2)}</span> / 100
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle">
                                <button type="button" class="btn btn-soft-info btn-sm btn-ver-detalle" 
                                    data-id-evaluacion="${est.IdEvaluacion}">
                                    <i class="ti ti-eye me-1"></i> Ver Detalle
                                </button>
                            </td>
                        </tr>`;
                    });

                    // Insertamos todo el HTML de golpe (Mejor rendimiento)
                    $("#tbNotasJurados tbody").html(htmlContent);

                } else {
                    // --- CORRECCIÓN DEL COLSPAN ---
                    // Como tienes 2 columnas (th), usamos colspan="2"
                    // Agregué text-center y py-3 para que se vea centrado y con espacio
                    $("#tbNotasJurados tbody").html(`
                        <tr>
                            <td colspan="2" class="text-center text-muted py-4">
                                <i class="ti ti-file-info fs-20 d-block mb-1"></i>
                                Sin calificaciones registradas aún.
                            </td>
                        </tr>
                    `);
                }

            } else {
                ToastMaster.fire({ icon: 'warning', title: response.d.Mensaje });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            ToastMaster.fire({ icon: 'error', title: "Error al cargar los jurados." });
        }
    });
}

// 2. Evento Click en "Ver Detalle"
$(document).on('click', '.btn-ver-detalle', function () {
    let idEvaluacion = $(this).data("id-evaluacion");
    //verDetalleEvaluacion(idEvaluacion);

    const textoSms = `Detalles del Id Evaluacion: ${idEvaluacion}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");

});

// fin page