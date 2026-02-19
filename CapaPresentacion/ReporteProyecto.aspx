<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteProyecto.aspx.cs" Inherits="CapaPresentacion.ReporteProyecto" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
    <title>Reporte de Proyecto</title>

    <link href="assets/vendor/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

    <style>
        body { font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4; }
        .contenedor {
            width: 100%;
            max-width: 900px;
            margin: 20px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            box-sizing: border-box;
        }
        .title { font-weight: bold; font-size: 14px;}
        .title2 { font-weight: bold; color: #03A99F; font-size: 16px; margin-bottom: 4px; }
        .text { font-size: 12px; color: #555; margin: 3px 0; }
        .badge { background-color: #03A99F; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
        
        table.tbproductos { width: 100%; border-collapse: collapse; margin-top: 20px; }
        table.tbproductos thead tr th { background-color: #03A99F; padding: 10px; font-size: 14px; color: white; text-align: left; }
        table.tbproductos tbody tr td { padding: 8px; border-bottom: 1px solid #ddd; font-size: 14px; }
        
        .btn-imprimir { background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;}
        
        /* MAGIA: Esto oculta el botón solo cuando se manda a imprimir o guardar como PDF */
        @media print {
            .no-print { display: none !important; }
            .contenedor { box-shadow: none; margin: 0; padding: 0; }
            body { background-color: white; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button type="button" class="btn-imprimir" onclick="window.print();">🖨️ IMPRIMIR REPORTE</button>
    </div>

    <div class="contenedor" id="seleccion">
        <table style="width: 100%; border-bottom: 2px solid #03A99F; padding-bottom: 10px;">
            <tr>
                <td style="width: 15%">
                    <img src="assets/images/logoEmi.png" style="width: 100px; height: 40px; object-fit: contain;" />
                </td>
                <td style="width: 60%">
                    <p class="title2">FICHA TÉCNICA DEL PROYECTO</p>
                    <p class="title" id="lblNombreProyecto">Cargando Título...</p>
                    <p class="text">Feria: <span id="lblFeria" class="badge">...</span></p>
                </td>
                <td style="text-align: right; width: 25%">
                    <p class="text"><strong>Fecha:</strong> <span id="lblFecha">--/--/----</span></p>
                    <p class="text"><strong>Estado:</strong> <span id="lblEstado">Activo</span></p>
                </td>
            </tr>
        </table>
        
        <table style="width: 100%; margin-top: 20px;">
            <tr>
                <td style="width: 60%; vertical-align: top;">
                    <p class="title">ÁREA, LINEA Y CATEGORÍA</p>
                    <p class="text"><strong>Área:</strong> <span id="lblArea">...</span></p>
                    <p class="text"><strong>Línea de Inv.:</strong> <span id="lblLinea">...</span></p>
                    <p class="text"><strong>Categoría:</strong> <span id="lblCategoria">...</span></p>
                </td>
                <td style="width: 40%; vertical-align: top; text-align: right;">
                    <p class="title">DATOS DEL TUTOR</p>
                    <p class="text"><span id="lblTutorNombre">...</span></p>
                    <p class="text">Nro CI: <span id="lblTutorCi">...</span></p>
                    <p class="text">Correo: <span id="lblTutorCorreo">...</span></p>
                </td>
            </tr>
        </table>

        <table class="tbproductos" id="tbDetalles">
            <thead>
                <tr>
                    <th style="width: 50px;">N°</th>
                    <th style="width: 60px;">Foto</th>
                    <th>Estudiantes</th>
                    <th>Nro CI</th>
                    <th>Código</th>
                </tr>
            </thead>
            <tbody>
                <tr><td colspan="5" style="text-align:center;">Cargando estudiantes...</td></tr>
            </tbody>
        </table>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="assets/vendor/sweetalert2/sweetalert2.min.js"></script>
    <script src="js/ReporteProyecto.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="js/ReporteProyecto.js" type="text/javascript"></script>--%>
</body>
</html>
