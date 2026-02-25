
$(document).ready(function () {
    cargarInfoProyecto(1);
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

// fin