
// 1. Array Global para almacenar los estudiantes seleccionados
let EstudiantesSeleccionados = [];

$(document).ready(function () {
    $("#CboLinea").prop("disabled", true);
    cargarCategorias();
    cargarAreas();
    cargarBuscadorEstudiantes();
});

function cargarCategorias() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboCategoria").html('<option value="">Cargando Categorias...</option>');

    $.ajax({
        url: "CategoriasPage.aspx/ListaCategorias",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione una Categoria --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdCategoria}">${row.Nombre}</option>`;
                });

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#cboCategoria").html(opcionesHTML);

            } else {
                $("#cboCategoria").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboCategoria").html('<option value="">Error de conexión</option>');

            // Reutilizamos tu alerta global para informar al usuario
            mostrarAlerta("Error", "No se pudieron cargar las categorias.", "error", "btn btn-danger");
        }
    });
}

function cargarAreas() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#CboArea").html('<option value="">Cargando Areas...</option>');

    $.ajax({
        url: "AreasPage.aspx/ListaAreasInvestigacion",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione Area --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdArea}">${row.Nombre}</option>`;
                });

                // 3. Inyectamos todo al DOM en un solo movimiento
                $("#CboArea").html(opcionesHTML);

            } else {
                $("#CboArea").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#CboArea").html('<option value="">Error de conexión</option>');

            // Reutilizamos tu alerta global para informar al usuario
            mostrarAlerta("Error", "No se pudieron cargar las areas.", "error", "btn btn-danger");
        }
    });
}

$("#CboArea").on("change", function () {
    const idArea = $(this).val();
    $("#CboLinea").prop("disabled", true);
    $("#CboLinea").html('<option value="">-- Seleccione Linea --</option>');

    if (idArea) {
        cargarLineas(idArea);
    }
});

function cargarLineas(idArea) {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#CboLinea").html('<option value="">Cargando lineas...</option>');

    var request = {
        IdArea: parseInt(idArea)
    };

    $.ajax({
        url: "LineasPage.aspx/ObtenerLineasPorArea",
        type: "POST",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                const lista = response.d.Data;

                if (lista != null && lista.length > 0) {

                    // Empezamos con la opción por defecto
                    let opcionesHTML = '<option value="">-- Seleccione una Linea --</option>';

                    // aqui ya no valido Estado lo realizo en mi procedimiento almacenado
                    $.each(lista, function (i, row) {
                        opcionesHTML += `<option value="${row.IdLinea}">${row.Nombre}</option>`;
                    });

                    $("#CboLinea").html(opcionesHTML);
                    // Solo habilito si hay datos
                    $("#CboLinea").prop("disabled", false);
                } else {
                    $("#CboLinea").html('<option value="">No hay lineas en esta area</option>');
                    // Mantengo disabled true
                }

            } else {
                $("#CboLinea").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#CboLinea").html('<option value="">Error de conexión</option>');
        }
    });
}

// 2. Configuración del Select2 (AJAX)
function cargarBuscadorEstudiantes() {
    $("#cboBuscarEstudiante").select2({
        ajax: {
            url: "EstudiantesPage.aspx/FiltroEstudiantes", // <--- CAMBIA ESTO por tu URL correcta
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                // Enviamos el parámetro 'Busqueda' al SP que creamos antes
                return JSON.stringify({ busqueda: params.term });
            },
            processResults: function (data) {
                // Nota: Dependiendo de tu backend, los datos pueden venir en data.d o data.d.Data
                // Asumo que devuelves una lista de objetos
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdEstudiante,
                        text: item.Nombres + ' ' + item.Apellidos, // Lo que se ve al seleccionar
                        // Datos adicionales para usar en el renderizado
                        nroCi: item.NroCi,
                        codigo: item.Codigo,
                        imagen: item.ImagenEstUrl,
                        dataCompleta: item
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar por Nombre o CI...',
        minimumInputLength: 3, // Importante: espera 3 letras para buscar (ahorra recursos)
        templateResult: formatoResultadosEstudiante // Función para diseño visual en la lista
    });
}

// 3. Diseño visual de los resultados (La lista desplegable con foto)
function formatoResultadosEstudiante(data) {
    if (data.loading) return data.text;

    // Si no hay imagen, usamos una por defecto (opcional)
    var imagenMostrar = data.imagen ? data.imagen : 'Imagenes/sinimagen.png';

    var contenedor = $(
        `<div class="d-flex align-items-center">
            <img src="${imagenMostrar}" style="height:40px; width:40px; margin-right:10px; border-radius:50%; object-fit:cover;"/>
            <div>
                <div style="font-weight: bold;">${data.text}</div>
                <div style="font-size: 0.85em; color: #666;">CI: ${data.nroCi} | Cod: ${data.codigo}</div>
            </div>
         </div>`
    );

    return contenedor;
}

// 4. Evento al SELECCIONAR un estudiante
$("#cboBuscarEstudiante").on("select2:select", function (e) {
    const data = e.params.data;

    // A) Verificar si ya existe en el array
    let existe = EstudiantesSeleccionados.find(p => p.IdEstudiante == data.id);

    if (existe) {
        ToastMaster.fire({
            icon: 'warning',
            title: 'El estudiante ya fue agregado al grupo.'
        });
        //toastr.warning("El estudiante ya fue agregado al grupo.");
        $("#cboBuscarEstudiante").val(null).trigger("change"); // Limpiar selección
        return false;
    }

    // B) Crear el objeto estudiante (sin pedir cantidad ni precio)
    let nuevoEstudiante = {
        IdEstudiante: data.id,
        NombreCompleto: data.text,
        NroCi: data.nroCi,
        Codigo: data.codigo,
        Imagen: data.imagen
    };

    // C) Agregar al array global
    EstudiantesSeleccionados.push(nuevoEstudiante);

    // D) Actualizar la tabla visual y limpiar el select
    mostrarTablaEstudiantes();
    $("#cboBuscarEstudiante").val(null).trigger("change");
});

// 5. Función para pintar la tabla (Similar a tu mosProdr_Precio)
function mostrarTablaEstudiantes() {
    $("#tbGrupoEstudiantes tbody").html(""); // Limpiar tabla

    EstudiantesSeleccionados.forEach((item, index) => {
        $("#tbGrupoEstudiantes tbody").append(
            $("<tr>").append(
                // Botón Eliminar
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger btn-sm")
                        .attr("onclick", `eliminarEstudiante(${index})`) // Llamada directa
                        .append($("<i>").addClass("ti ti-trash"))
                ),
                // Datos
                $("<td>").text(item.NroCi),
                $("<td>").text(item.Codigo),
                $("<td>").text(item.NombreCompleto),
                // Imagen pequeña en la tabla
                $("<td>").append(
                    $("<img>").attr("src", item.Imagen).css({ "height": "30px", "border-radius": "50%" })
                )
            )
        );
    });
}

// 6. Función para eliminar de la lista <i class="ti ti-trash"></i>
window.eliminarEstudiante = function (index) {
    EstudiantesSeleccionados.splice(index, 1); // Quitar del array
    mostrarTablaEstudiantes(); // Repintar tabla
}