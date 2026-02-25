
let tablaData;
let idEditar = 0;
let TodosIndicadores = [];

$(document).ready(function () {
    listarIndicadores();
    cargarAspectos(); // Llena el primer combo al inicio
});

function listarIndicadores() {
    if ($.fn.DataTable.isDataTable("#tbIndicadores")) {
        $("#tbIndicadores").DataTable().destroy();
        $('#tbIndicadores tbody').empty();
    }

    tablaData = $("#tbIndicadores").DataTable({
        responsive: true,
        "ajax": {
            "url": 'IndicadoresPage.aspx/ListarIndicadores',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    // AQUÍ CAPTURAMOS LA DATA PARA USARLA LUEGO
                    TodosIndicadores = json.d.Data;
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdIndicador", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            {
                "data": "PuntajeMaximo",
                "className": "text-end", // Alineado a la derecha (estándar para números)
                "render": function (data, type, row) {
                    // 'display' es lo que se ve, 'sort' es lo que usa para ordenar
                    if (type === 'display' || type === 'filter') {
                        // Convierte a número y fuerza 2 decimales
                        return parseFloat(data).toFixed(2);
                    }
                    // Para ordenar y otros usos, devuelve el número original
                    return data;
                }
            },
            {
                "data": "Estado", "className": "text-center", render: function (data) {
                    if (data === true)
                        return '<span class="badge bg-success">Activo</span>';
                    else
                        return '<span class="badge bg-danger">Inactivo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-2"><i class="ti ti-pencil-plus"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="ti ti-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px",
                "className": "text-center"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function cargarAspectos() {

    $("#cboAspecto").html('<option value="">Cargando Aspectos...</option>');

    $.ajax({
        url: "AspectosPage.aspx/ListaAspectos",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                let opcionesHTML = '<option value="">-- Seleccione un Aspecto --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdAspecto}">${row.Nombre}</option>`;
                });
                $("#cboAspecto").html(opcionesHTML);

            } else {
                $("#cboAspecto").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboAspecto").html('<option value="">Error de conexión</option>');
            mostrarAlerta("Error", "No se pudieron cargar los Aspectos de evaluacion.", "error", "btn btn-danger");
        }
    });
}

// --- LÓGICA DE CASCADA (ASPECTO -> CRITERIO) ---
$("#cboAspecto").on("change", function () {
    const idAspecto = $(this).val();
    cargarCriterios(idAspecto, null); // Pasamos null porque es cambio manual
});

function cargarCriterios(idAspecto, criterioPreseleccionado) {
    // Si no hay aspecto, limpiar criterio
    if (!idAspecto) {
        $("#cboCriterio").html('<option value="">-- Seleccione --</option>');
        return;
    }

    // AJAX para cargar criterios
    $.ajax({
        url: "CriteriosPage.aspx/ListarCriteriosPorAspecto",
        type: "POST",
        data: JSON.stringify({ IdAspecto: parseInt(idAspecto) }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#cboCriterio").empty();
            $("#cboCriterio").append('<option value="">-- Seleccione --</option>');

            if (response.d.Estado) {
                $.each(response.d.Data, function (i, item) {
                    $("#cboCriterio").append(`<option value="${item.IdCriterio}">${item.Nombre}</option>`);
                });

                // --- CLAVE PARA EDICIÓN ---
                // Si mandamos un ID para pre-seleccionar, lo ponemos aquí
                if (criterioPreseleccionado) {
                    $("#cboCriterio").val(criterioPreseleccionado);
                }
            }
        }
    });
}

// --- AL HACER CLIC EN EDITAR ---
$('#tbIndicadores tbody').on('click', '.btn-editar', function () {
    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) { fila = fila.prev(); }
    let data = tablaData.row(fila).data();

    idEditar = data.IdIndicador;

    // 1. Setear campos simples
    $("#txtDescripcion").val(data.Descripcion);
    $("#txtPuntaje").val(data.PuntajeMaximo);
    $("#cboEstado").val(data.Estado ? 1 : 0).prop("disabled", false);

    // 2. MANEJO DE LA CASCADA INVERSA
    // A) Primero seteamos el Aspecto (Padre)
    $("#cboAspecto").val(data.IdAspecto);

    // B) Llamamos a cargarCriterios pero le pasamos el Hijo que queremos seleccionar
    //    Esto evita problemas de sincronía, ya que la selección se hace DENTRO del success del AJAX
    cargarCriterios(data.IdAspecto, data.IdCriterio);

    $("#modalLabeldetalle").text("Editar Indicador");
    $("#modalAdd").modal("show");
});

$('#tbIndicadores tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Info de: ${data.Descripcion}.`;
    mostrarAlerta("¡Mensaje!", textoSms, "info", "btn btn-info");

});

$("#btnNuevore").on("click", function () {
    idEditar = 0;

    // Limpieza de campos
    $("#txtDescripcion").val("");
    $("#txtPuntaje").val("");
    $("#cboEstado").val(1).prop("disabled", true);

    // IMPORTANTE: Resetear la cascada
    $("#cboAspecto").val(""); // Limpiar padre
    $("#cboCriterio").empty().append('<option value="">-- Seleccione --</option>'); // Limpiar hijo

    $("#modalLabeldetalle").text("Nuevo Registro");
    $("#modalAdd").modal("show");
});

function habilitarBoton() {
    $('#btnGuardarReg').prop('disabled', false);
}

$("#btnGuardarReg").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarReg').prop('disabled', true);

    // --- VALIDACIÓN DE DESCRIPCIÓN ---
    if ($("#txtDescripcion").val().trim() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Debe completar el campo de Descripción' });
        $("#txtDescripcion").focus();
        habilitarBoton();
        return;
    }

    // --- VALIDACIÓN DE COMBOS ---
    if ($("#cboAspecto").val() === "" || $("#cboCriterio").val() === "") {
        ToastMaster.fire({ icon: 'warning', title: 'Seleccione Aspecto y Criterio' });
        $("#cboAspecto").focus();
        habilitarBoton();
        return;
    }

    // --- OBTENCIÓN Y LIMPIEZA DEL PUNTAJE ---
    let puntajeInput = $("#txtPuntaje").val().trim();

    // Reemplazamos coma por punto
    puntajeInput = puntajeInput.replace(',', '.');

    // Validamos formato numérico
    if (puntajeInput === "" || isNaN(puntajeInput)) {
        ToastMaster.fire({ icon: 'warning', title: 'Ingrese un puntaje válido (Ej: 10.5)' });
        $("#txtPuntaje").focus();
        habilitarBoton();
        return;
    }

    // Convertimos a número (Variable Única para todo el proceso)
    const puntajeFinal = parseFloat(puntajeInput);

    // Validación básica de rango (No negativos)
    if (puntajeFinal <= 0) {
        ToastMaster.fire({ icon: 'warning', title: 'El puntaje debe ser mayor a 0' });
        $("#txtPuntaje").focus();
        habilitarBoton();
        return;
    }

    // --- VALIDACIÓN DE SUMATORIA POR ASPECTO ---

    const idAspectoSeleccionado = parseInt($("#cboAspecto").val());
    let limitePuntos = 0;

    // 1. Definir Límites (Hardcode temporal)
    if (idAspectoSeleccionado === 1) {
        limitePuntos = 30; // Evaluación del documento
    } else if (idAspectoSeleccionado === 2) {
        limitePuntos = 70; // Exposición y defensa
    } else {
        limitePuntos = 100; // Default
    }

    // 2. Calcular suma actual (Excluyendo el que se edita)
    const sumaActual = TodosIndicadores
        .filter(ind => ind.IdAspecto === idAspectoSeleccionado && ind.IdIndicador !== idEditar)
        .reduce((sum, ind) => sum + ind.PuntajeMaximo, 0);

    // 3. Proyectar total
    const totalProyectado = sumaActual + puntajeFinal;

    // 4. Verificar Límite (Usamos toFixed para precisión)
    if (parseFloat(totalProyectado.toFixed(2)) > limitePuntos) {

        ToastMaster.fire({
            icon: 'error',
            title: `Excede el límite del Aspecto.`,
            text: `El límite es ${limitePuntos} pts. Actualmente hay ${sumaActual.toFixed(2)}. Si agrega ${puntajeFinal}, suma ${totalProyectado.toFixed(2)}.`
        });

        $("#txtPuntaje").focus();
        habilitarBoton();
        return; // DETENEMOS TODO
    }

    // --- CONSTRUCCIÓN DEL OBJETO ---
    const objeto = {
        IdIndicador: idEditar,
        IdCriterio: parseInt($("#cboCriterio").val()),
        Descripcion: $("#txtDescripcion").val().trim(),
        PuntajeMaximo: puntajeFinal, // Usamos la variable ya limpia
        Estado: ($("#cboEstado").val() === "1" ? true : false)
    }

    // --- ENVÍO AJAX ---
    $("#modalAdd").find("div.modal-content").LoadingOverlay("show");
    const sms = idEditar === 0 ? "Registrado " : "Actualizado ";

    $.ajax({
        url: "IndicadoresPage.aspx/RegistrarOrEditar", // Asegúrate que la URL sea correcta
        type: "POST",
        data: JSON.stringify({ objeto: objeto }), // Asegúrate que coincida con el parámetro del WebMethod
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                ToastMaster.fire({
                    icon: 'success',
                    title: `${sms} ${response.d.Mensaje}.`
                });

                $("#modalAdd").modal('hide');
                listarIndicadores(); // Recargar tabla y actualizar variable global TodosIndicadores
                idEditar = 0;
            } else {
                mostrarAlerta("¡Error!", "No se pudo procesar intente mas tarde.", "warning", "btn btn-warning");
            }
        },
        error: function () {
            $("#modalAdd").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlerta("Error", "Error de comunicación con el servidor.", "error", "btn btn-danger");
        },
        complete: function () {
            habilitarBoton();
        }
    });

});

// fin