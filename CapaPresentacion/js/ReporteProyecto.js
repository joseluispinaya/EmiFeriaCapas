
$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idProyecto = urlParams.get('id');

    // Corrección lógica: Si NO hay ID o está vacío, mostramos error
    if (idProyecto === null || idProyecto.trim() === "") {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No hay un parámetro válido recibido. El formulario se cerrará.",
            showConfirmButton: false,
            timer: 2000
        });

        setTimeout(function () {
            window.close();
        }, 2500);

    } else {
        CargarDatos(idProyecto);
    }
});

function CargarDatos(idProyecto) {
    var request = { IdProyecto: parseInt(idProyecto) };

    $.ajax({
        type: "POST",
        url: "ReportesPage.aspx/ObtenerDetalleReporteProyecto", // Asegúrate que la ruta sea correcta
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const data = response.d.Data; // Este es tu ProyectoReportDTO

                // 1. Llenar cabecera del Proyecto
                $("#lblNombreProyecto").text(data.NombreProyecto);
                $("#lblFeria").text(data.NombreFeria);

                // Formatear Fecha (Asumiendo que viene en formato Date de JSON)
                //let fecha = new Date(parseInt(data.FechaRegistro.substr(6)));
                //$("#lblFecha").text(fecha.toLocaleDateString());

                $("#lblFecha").text(data.FechaRegistroSt);

                $("#lblEstado").text(data.Estado ? "Activo" : "Inactivo");

                // 2. Llenar Área y Categoría FechaRegistroSt
                $("#lblArea").text(data.AreaInvestigacion);
                $("#lblLinea").text(data.LineaInvestigacion);
                $("#lblCategoria").text(data.Categoria);

                // 3. Llenar Datos del Tutor
                $("#lblTutorNombre").text(data.TutorNombreCompleto);
                $("#lblTutorCi").text(data.TutorCi);
                $("#lblTutorCorreo").text(data.TutorCorreo !== "" ? data.TutorCorreo : "Sin correo");

                // 4. Llenar Tabla de Estudiantes
                $("#tbDetalles tbody").html(""); // Limpiamos el "Cargando..."

                if (data.Estudiantes.length > 0) {
                    $.each(data.Estudiantes, function (index, est) {
                        let imgUrl = est.ImagenEstUrl !== "" ? est.ImagenEstUrl : "Imagenes/sinimagen.png";

                        let fila = `<tr>
                                        <td>${index + 1}</td>
                                        <td><img src="${imgUrl}" style="height:40px; width:40px; border-radius:50%; object-fit:cover;"/></td>
                                        <td><strong>${est.EstudianteNombreCompleto}</strong></td>
                                        <td>${est.NroCi}</td>
                                        <td>${est.Codigo}</td>
                                    </tr>`;
                        $("#tbDetalles tbody").append(fila);
                    });
                } else {
                    $("#tbDetalles tbody").html('<tr><td colspan="5" style="text-align:center;">No hay estudiantes registrados.</td></tr>');
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
                    window.close();
                }, 2500);

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
            }, 2500);
        }
    });
}

// fin