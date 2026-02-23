
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
            window.location.href = 'ProyectosPage.aspx';
        }, 2200);

    } else {
        $("#txtIdProyecto").val(idProyecto);
        CargarDetalleProyecto(idProyecto);
    }
});

function CargarDetalleProyecto(idProyecto) {
    var request = { IdProyecto: parseInt(idProyecto) };

    $.ajax({
        type: "POST",
        url: "InscripcionPage.aspx/ObtenerDetalleReporteProyecto",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const data = response.d.Data; // Este es tu ProyectoReportDTO

                // 2. Llenar Área y Categoría FechaRegistroSt
                $("#lblFecha").text(data.FechaRegistroSt);
                $("#lblEstado").text(data.Estado ? "Activo" : "Inactivo");

                $("#lblFeria").text(data.NombreFeria);
                $("#lblArea").text(data.AreaInvestigacion);
                $("#lblLinea").text(data.LineaInvestigacion);
                $("#lblCategoria").text(data.Categoria);

                $("#lblNombreProyecto").text(data.NombreProyecto);

                $("#lblTutorNombre").text(data.TutorNombreCompleto);
                $("#lblTutorCi").text(data.TutorCi);
                $("#lblTutorCorreo").text(data.TutorCorreo);
                $("#imgDocente").attr("src", data.TutorImagen || "../Imagenes/sinimagen.png");

                // 4. Llenar Tabla de Estudiantes
                $("#tbGrupoEstudiantes tbody").html("");

                $.each(data.Estudiantes, function (index, est) {
                    // Usamos operador OR para imagen por defecto
                    let imgUrl = est.ImagenEstUrl || "../Imagenes/sinimagen.png";

                    $("#tbGrupoEstudiantes tbody").append(
                        $("<tr>").append(
                            $("<td>").text(est.EstudianteNombreCompleto),
                            // Ajusta las columnas según tu tabla HTML real
                            $("<td>").append(
                                $("<img>")
                                    .attr("src", imgUrl)
                                    .addClass("rounded-circle me-2") // Clases bootstrap para estilo
                                    .css({ "height": "30px", "width": "30px", "object-fit": "cover" })
                            )
                        )
                    );
                });


            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.d.Mensaje,
                    showConfirmButton: false,
                    timer: 2000
                });

                setTimeout(function () {
                    window.location.href = 'ProyectosPage.aspx';
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
                window.location.href = 'ProyectosPage.aspx';
            }, 2200);
        }
    });
}

// fin