<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteCalificacion.aspx.cs" Inherits="CapaPresentacion.ReporteCalificacion" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Planilla de Calificación</title>
    <link href="assets/vendor/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #000;
            background-color: #fff;
            margin: 0;
            padding: 20px;
        }

        /* Contenedor principal tamaño carta */
        .hoja {
            max-width: 800px;
            margin: 0 auto;
        }

        /* Encabezado */
        .header-title {
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
        }

            .header-title h4 {
                margin: 5px 0;
                font-size: 14px;
                color: #3b5998;
            }

            .header-title h3 {
                margin: 5px 0;
                font-size: 16px;
            }

        /* Datos Generales */
        .info-section {
            margin-bottom: 20px;
            line-height: 1.8;
        }

        .info-row {
            display: flex;
        }

        .info-label {
            font-weight: bold;
            text-decoration: underline;
            margin-right: 10px;
            white-space: nowrap;
        }

        .info-value {
            border-bottom: 1px dotted #000;
            flex-grow: 1;
            font-size: 11px;
            text-transform: uppercase;
        }

        /* Tablas */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
            vertical-align: middle;
        }

        th {
            background-color: #d9d9d9 !important; /* Gris claro */
            text-align: center;
            font-weight: bold;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .fw-bold {
            font-weight: bold;
        }

        .bg-light {
            background-color: #f2f2f2 !important;
        }

        .bg-yellow {
            background-color: #ffc000 !important;
        }
        /* Amarillo para notas */

        /* Nota debajo de la tabla */
        .nota-tabla {
            border: 1px solid #000;
            border-top: none;
            padding: 4px 6px;
            font-size: 11px;
            font-weight: bold;
            width: fit-content;
        }

        /* Tabla Final (Total) */
        .table-total {
            width: 50%;
            margin-left: auto; /* Alinea a la derecha */
            margin-top: 30px;
        }

        /* Firma */
        .firma-section {
            margin-top: 80px;
            text-align: center;
        }

        .linea-firma {
            border-top: 1px dashed #000;
            width: 250px;
            margin: 0 auto;
            padding-top: 5px;
            font-weight: bold;
        }

        /* Estilos específicos de impresión */
        @media print {
            body {
                padding: 0;
            }

            .no-print {
                display: none !important;
            }
            /* Forzar que se impriman los colores de fondo (gris y amarillo) */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
    </style>
</head>
<body>

    <div class="no-print" style="text-align: center; margin-bottom: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background: #007bff; color: #fff; border: none; border-radius: 5px;">Imprimir Reporte</button>
        <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background: #6c757d; color: #fff; border: none; border-radius: 5px; margin-left: 10px;">Cerrar</button>
    </div>

    <div class="hoja">
        <div class="header-title">
            <h4>UNIDAD DE INVESTIGACIÓN CIENCIA Y TECNOLOGÍA - UNIDAD ACADÉMICA RIBERALTA</h4>
            <hr style="border-top: 2px solid #3b5998;"/>
            <h3>ANEXO "C"</h3>
            <h3>PLANILLA DE CALIFICACIÓN</h3>
            <h3>FERIA INTERNA DE PROYECTOS DE INVESTIGACIÓN DE LA EMI – UAR 2026</h3>
        </div>

        <div class="info-section">
            <div class="info-row">
                <span class="info-label">NOMBRE DEL PROYECTO:</span>
                <span class="info-value" id="lblNombreProyectoImpresion">Cargando...</span>
            </div>
            <div class="info-row">
                <span class="info-label">JURADO:</span>
                <span class="info-value" id="lblNombreJuradoImpresion">Cargando...</span>
            </div>
        </div>

        <div id="contenedorTablasReporte">
            <p class="text-center">Generando reporte...</p>
        </div>

        <table class="table-total">
            <tr>
                <td class="text-center fw-bold" style="width: 70%;">NOTA TOTAL / SOBRE 100%</td>
                <td class="text-center fw-bold bg-yellow fs-14" style="width: 30%; font-size: 16px;" id="lblNotaFinalTotal">0.00</td>
            </tr>
        </table>

        <div class="firma-section">
            <div class="linea-firma">Firma</div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="assets/vendor/sweetalert2/sweetalert2.min.js"></script>
<script src="js/ReporteCalificacion.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</body>
</html>
