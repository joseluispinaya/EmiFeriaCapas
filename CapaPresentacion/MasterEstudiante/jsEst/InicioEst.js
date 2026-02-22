
$(document).ready(function () {
    cargarFerias();
});

function cargarFerias() {
    // Mostramos un indicador de carga (opcional, pero recomendado)
    $("#listaFerias").html('<div class="col-12 text-center p-5">Cargando ferias disponibles...</div>');

    $.ajax({
        url: "/FeriasPage.aspx/ListaFerias", // Asegúrate que la ruta sea correcta (sin la barra inicial si es relativa)
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {

            // Limpiamos el contenedor
            $("#listaFerias").html("");

            if (response.d.Estado) {
                const lista = response.d.Data;

                if (lista != null && lista.length > 0) {

                    // Iteramos sobre cada feria
                    lista.forEach(function (prop) {

                        // Lógica para el botón de registro (Habilitado/Deshabilitado)
                        let btnRegistroHTML = "";

                        if (prop.Estado) {
                            // Si está activo, botón normal con el evento onclick
                            btnRegistroHTML = `<a href="javascript:void(0);" onclick="registroProyecto(${prop.IdFeria})" class="btn btn-primary w-100">Registrarse</a>`;
                        } else {
                            // Si está inactivo, botón deshabilitado (clase 'disabled' de Bootstrap y sin onclick)
                            btnRegistroHTML = `<button type="button" class="btn btn-secondary w-100" disabled>Cerrado</button>`;
                        }

                        // Construimos la tarjeta HTML usando Template Strings (Backticks ``)
                        // NOTA: Ajusté un poco la estructura de divs para que cuadre con tu diseño original
                        let cardHtml = `
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-wrap gap-2 align-items-center mb-2">
                                        <div class="avatar-xl bg-light d-flex align-items-center justify-content-center rounded-circle flex-shrink-0">
                                            <img src="../Imagenes/adminImg.png" alt="" class="avatar-xl flex-shrink-0">
                                        </div>
                                        <div>
                                            <h4 class="text-dark fw-semibold fs-16 mb-1">${prop.Nombre}</h4>
                                            <div class="d-flex align-items-center text-muted">
                                                <i class="ti ti-calendar me-1"></i>
                                                <span class="fs-13">Fecha: ${prop.FechaFeriaSt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="gap-2 hstack">
                                        ${btnRegistroHTML}
                                        <a href="javascript:void(0);" class="btn btn-light w-100">Ver mas</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                        // Agregamos la tarjeta al contenedor
                        $("#listaFerias").append(cardHtml);
                    });

                } else {
                    // Si la lista está vacía
                    $("#listaFerias").html('<div class="col-12 text-center text-muted">No hay ferias disponibles en este momento.</div>');
                }
            } else {
                // Si el backend devuelve Estado = false
                $("#listaFerias").html('<div class="col-12 text-center text-danger">Error al cargar las ferias.</div>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#listaFerias").html('<div class="col-12 text-center text-danger">Ocurrió un error de comunicación.</div>');
        }
    });
}

// Función para redireccionar
function registroProyecto(IdFeria) {
    // Es buena práctica usar encodeURIComponent por seguridad, aunque con IDs numéricos no es crítico
    //var url = 'InscripcionPage.aspx?id=' + encodeURIComponent(IdFeria);
    //window.location.href = url;

    mostrarAlerta("¡Mensaje!", "Ver Detalle ID: " + IdFeria, "success", "btn btn-success");
    //console.log("Ver Detalle de la propiedad con ID: " + IdPropiedad);
}