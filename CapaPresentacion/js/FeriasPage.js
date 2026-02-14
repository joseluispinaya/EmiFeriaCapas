
$(document).ready(function () {

    // 1. Creamos unos datos de prueba (en formato JSON)
    var datosPrueba = [
        { "Id": 1, "Descripcion": "Feria de Ciencias 2022", "Fecha": "2022-10-15", "Estado": 1 },
        { "Id": 2, "Descripcion": "Feria Tecnológica 2023", "Fecha": "2023-11-20", "Estado": 0 },
        { "Id": 3, "Descripcion": "Expociencia 2024", "Fecha": "2024-09-10", "Estado": 1 }
    ];

    // 2. Inicializamos DataTables
    $('#tbFerias').DataTable({
        data: datosPrueba,          // Le inyectamos los datos
        responsive: true,
        columns: [
            { data: 'Id' },
            { data: 'Descripcion' },
            { data: 'Fecha' },
            {
                data: 'Estado',
                render: function (data, type, row) {
                    // Si el estado es 1, mostramos un badge verde, si es 0 uno rojo
                    if (data === 1) {
                        return '<span class="badge bg-success">Activo</span>';
                    } else {
                        return '<span class="badge bg-danger">Inactivo</span>';
                    }
                }
            },
            {
                // Columna de acciones className: "text-center" (vacía en el JSON, la llenamos con botones HTML)
                data: null,
                defaultContent: '<button class="btn btn-primary btn-sm me-2">Editar</button> <button class="btn btn-danger btn-sm">Eliminar</button>',
                orderable: false,   // Evita que se pueda ordenar por esta columna
                searchable: false,   // Evita que el buscador filtre por el texto de estos botones
                className: "text-center"
            }
        ],
        language: {
            // Esto traduce la tabla al español (Buscar, Paginación, etc.)
            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json"
        }
    });
});