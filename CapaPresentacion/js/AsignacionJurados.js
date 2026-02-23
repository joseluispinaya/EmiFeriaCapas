
let DocentesSeleccionados = [];

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const idProyecto = urlParams.get('id');
    const esEdicionParam = urlParams.get('esEdicion'); // Esto devuelve "true", "false" o null

    // Validar que el ID exista (el modo edición es opcional, pero idealmente debería estar)
    if (idProyecto !== null && idProyecto.trim() !== "") {
        $("#txtIdProyecto").val(idProyecto);

        // Convertimos el string "true"/"false" a booleano real de JS
        // Si es 'true', será true. Cualquier otra cosa (incluyendo null) será false.
        const esEdicion = (esEdicionParam === 'true');

        // 4. Lógica según el modo
        if (esEdicion) {
            //console.log("Modo: EDICIÓN");
            $("#tituloPagina").text("Editar Jurados Asignados");
            $("#btnGuardar").text("Actualizar Cambios");

            // Aquí llamarías a una función para cargar los jurados que ya tiene el proyecto
            //cargarJuradosAsignados(idProyecto); 

        } else {
            //console.log("Modo: NUEVA ASIGNACIÓN");
            $("#tituloPagina").text("Asignación de Jurados");
            $("#btnGuardar").text("Guardar Asignación");

            // Quizás aquí limpias la tabla o preparas la UI vacía
        }
        cargarInfoProyecto(idProyecto);
        cargarBuscadorDocentes();
    } else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No se identificó el proyecto",
            showConfirmButton: false,
            timer: 2000
        });

        setTimeout(function () {
            window.location.href = 'ProyectosFePage.aspx';
        }, 2200);
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

                $("#txtNroCiDo").val(data.TutorCi);
                $("#lblTutorNombre").text(data.TutorNombreCompleto);
                $("#lblTutorCorreo").text(data.TutorCorreo);
                $("#imgDocente").attr("src", data.TutorImagen || "Imagenes/sinimagen.png");

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

function cargarBuscadorDocentes() {
    $("#cboBuscarDocente").select2({
        ajax: {
            url: "DocentesPage.aspx/FiltroDocentes",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdDocente,
                        text: item.Nombres + ' ' + item.Apellidos,
                        nroCi: item.NroCi,
                        celular: item.Celular,
                        imagen: item.ImagenUrl,
                        dataCompleta: item
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar por Nombre o CI...',
        minimumInputLength: 3,
        templateResult: formatoResultadosDocente
    });
}

function formatoResultadosDocente(data) {
    if (data.loading) return data.text;

    var imagenMostrar = data.imagen ? data.imagen : 'Imagenes/sinimagen.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">CI: ${data.nroCi} | Cel: ${data.celular}</div>
            </div>
         </div>`
    );

    return contenedor;
}

$("#cboBuscarDocente").on("select2:select", function (e) {
    const data = e.params.data;

    const tutorCi = $("#txtNroCiDo").val().trim();

    // --- NUEVA VALIDACIÓN: EL TUTOR NO PUEDE SER JURADO ---
    // Comparamos el CI del input con el CI del docente seleccionado
    if (tutorCi === data.nroCi) {
        ToastMaster.fire({
            icon: 'error', // Usamos error para que sea más enfático
            title: 'El Tutor del proyecto no puede ser asignado como Jurado.'
        });
        $("#cboBuscarDocente").val(null).trigger("change"); // Limpiar selección
        return false; // Detener ejecución
    }

    // A) Verificar si ya existe en el array
    let existe = DocentesSeleccionados.find(p => p.IdDocente == data.id);

    if (existe) {
        ToastMaster.fire({
            icon: 'warning',
            title: 'El docente ya fue agregado al grupo.'
        });
        $("#cboBuscarDocente").val(null).trigger("change"); // Limpiar selección
        return false;
    }

    // B) Crear el objeto
    let rutaImagen = (data.imagen && data.imagen.trim() !== "") ? data.imagen : 'Imagenes/sinimagen.png';
    let nuevoJurado = {
        IdDocente: data.id,
        NombreCompleto: data.text,
        NroCi: data.nroCi,
        Imagen: rutaImagen
    };

    // C) Agregar al array global
    DocentesSeleccionados.push(nuevoJurado);

    // D) Actualizar la tabla visual y limpiar el select
    mostrarTablaDocentes();
    $("#cboBuscarDocente").val(null).trigger("change");
});

function mostrarTablaDocentes() {
    $("#tbGrupoJurado tbody").html(""); // Limpiar tabla

    DocentesSeleccionados.forEach((item, index) => {
        $("#tbGrupoJurado tbody").append(
            $("<tr>").append(
                // Botón Eliminar
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-sm")
                        .attr("onclick", `eliminarJurado(${index})`) // Llamada directa
                        .append($("<i>").addClass("ti ti-trash"))
                ),
                // Datos
                $("<td>").text(item.NroCi),
                $("<td>").text(item.NombreCompleto),
                // Imagen pequeña en la tabla
                $("<td>").append(
                    $("<img>")
                        .attr("src", item.Imagen)
                        .addClass("rounded-circle me-2")
                        .css({ "height": "30px", "width": "30px", "object-fit": "cover" })
                )
            )
        );
    });
}

window.eliminarJurado = function (index) {
    DocentesSeleccionados.splice(index, 1); // Quitar del array
    mostrarTablaDocentes(); // Repintar tabla
}

function habilitarBoton() {
    $('#btnGuardar').prop('disabled', false);
}

$("#btnGuardar").on("click", function () {

    let listaFinal = [];

    $('#btnGuardar').prop('disabled', true);

    let idProyecto = $("#txtIdProyecto").val().trim();

    if (idProyecto === "0" || idProyecto === "") {
        ToastMaster.fire({
            icon: 'warning',
            title: 'Ocurrio un error retorne al inicio'
        });
        habilitarBoton();
        return;
    }

    if (DocentesSeleccionados.length < 1) {
        mostrarAlerta("¡Alerta!", "Debe seleccionar los jurados del proyecto", "warning", "btn btn-warning");
        habilitarBoton();
        return;
    }

    DocentesSeleccionados.forEach((item) => {
        listaFinal.push({
            IdDocente: item.IdDocente
        });
    });

    var request = {
        IdProyecto: parseInt($("#txtIdProyecto").val()),
        ListaGrupoJurados: listaFinal
    };

    $("#loadd").LoadingOverlay("show");

    $.ajax({
        url: "AsignacionJurados.aspx/RegistrarJurados",
        type: "POST",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#loadd").LoadingOverlay("hide");

            if (response.d.Estado) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: response.d.Mensaje,
                    showConfirmButton: false,
                    timer: 2000
                });

                setTimeout(function () {
                    window.location.href = 'ProyectosFePage.aspx';
                }, 2200);


            } else {
                mostrarAlerta("¡Mensaje!", response.d.Mensaje, "warning", "btn btn-warning");
            }
        },
        error: function () {
            $("#loadd").LoadingOverlay("hide");
            mostrarAlerta("¡Mensaje!", "Error de comunicación con el servidor.", "error", "btn btn-danger");
        },
        complete: function () {
            habilitarBoton();
        }
    });

})

// fin