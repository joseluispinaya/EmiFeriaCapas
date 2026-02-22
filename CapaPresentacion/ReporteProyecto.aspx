<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteProyecto.aspx.cs" Inherits="CapaPresentacion.ReporteProyecto" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
    <title>Ficha Técnica de Proyecto</title>

    <link href="assets/vendor/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

    <style>
        body { 
            font-family: Arial, Helvetica, sans-serif; 
            background-color: #f4f4f4; 
            color: #333;
        }
        
        .contenedor {
            width: 100%;
            max-width: 900px;
            margin: 20px auto;
            padding: 40px; /* Más espacio interno como en la imagen */
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            box-sizing: border-box;
        }

        /* --- ESTILOS DE CABECERA (LOGO Y DATOS) --- */
        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #1A52ED; /* Línea separadora */
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .header-left {
            text-align: left;
        }

        .header-right {
            text-align: right;
            font-size: 11px; /* Letra pequeña para dirección */
            line-height: 1.4;
            font-weight: bold;
        }

        .datos-feria {
            font-size: 12px;
            margin-top: 10px;
            font-weight: bold;
        }

        /* --- ESTILOS DEL TÍTULO CENTRAL --- */
        .project-title-container {
            text-align: center;
            margin-bottom: 30px;
        }

        .ficha-titulo {
            font-weight: bold;
            font-size: 16px;
            text-transform: uppercase;
            margin-bottom: 15px;
            color: #03A99F;
        }

        .nombre-proyecto {
            font-size: 15px;
            font-weight: bold;
            color: #000;
            padding: 0 20px; /* Margen a los lados para que no choque */
        }

        /* --- ESTILOS DE SECCIONES (ÁREA Y TUTOR) --- */
        .info-grid {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        .section-title {
            font-weight: bold;
            font-size: 13px;
            text-transform: uppercase;
            margin-bottom: 8px;
            color: #000;
        }

        .text-label {
            font-size: 12px;
            color: #777; /* Gris suave para las etiquetas: Área, Línea... */
            font-weight: bold;
        }

        .text-value {
            font-size: 12px;
            color: #333;
            margin-bottom: 4px;
        }

        .tutor-section {
            text-align: right;
        }

        /* --- ESTILOS DE LA TABLA --- */
        .table-title {
            text-align: center;
            font-weight: bold;
            font-size: 13px;
            text-transform: uppercase;
            margin-bottom: 10px;
            margin-top: 20px;
        }

        table.tbproductos { width: 100%; border-collapse: collapse; }
        table.tbproductos thead tr th { 
            background-color: transparent; 
            border-bottom: 1px solid #ddd;
            color: #999; /* Color gris para encabezados como en la imagen */
            font-weight: bold;
            padding: 10px; 
            font-size: 13px; 
            text-align: left; 
        }
        
        table.tbproductos tbody tr td { 
            padding: 12px 10px; 
            border-bottom: 1px solid #eee; 
            font-size: 13px; 
            font-weight: bold; /* Nombres en negrita */
            vertical-align: middle;
        }

        .foto-circle {
            width: 40px; height: 40px; 
            border-radius: 50%; 
            object-fit: cover;
            display: block;
        }

        .btn-imprimir { background-color: #03A99F; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold;}

        @media print {
            .no-print { display: none !important; }
            .contenedor { box-shadow: none; margin: 0; padding: 0; max-width: 100%; }
            body { background-color: white; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>

    <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button type="button" class="btn-imprimir" onclick="window.print();">🖨️ IMPRIMIR FICHA</button>
    </div>

    <div class="contenedor" id="seleccion">
        
        <div class="header-top">
            <div class="header-left">
                <img src="assets/images/logoEmi.png" style="height: 50px; object-fit: contain;" />
                <div class="datos-feria">
                    Feria: <span id="lblFeria">Cargando...</span><br/>
                    Fecha: <span id="lblFecha">--/--/----</span>
                </div>
            </div>
            <div class="header-right">
                RIBERALTA<br/>
                Av. Nicanor Gonzalo Salvatierra<br/>
                Nro. 154<br/>
                Barrio La Cruz<br/>
                Telf. 8524373<br/>
                www.emi.edu.bo
            </div>
        </div>

        <div class="project-title-container">
            <div class="ficha-titulo">FICHA TÉCNICA DEL PROYECTO</div>
            <div class="nombre-proyecto" id="lblNombreProyecto">
                Cargando Título del Proyecto...
            </div>
        </div>

        <div class="info-grid">
            <div style="width: 60%;">
                <div class="section-title">DETALLES DEL PROYECTO</div>
                
                <div><span class="text-label">Área: </span><span class="text-value" id="lblArea">...</span></div>
                <div><span class="text-label">Línea de Inv.: </span><span class="text-value" id="lblLinea">...</span></div>
                <div><span class="text-label">Categoría: </span><span class="text-value" id="lblCategoria">...</span></div>
            </div>

            <div class="tutor-section" style="width: 40%;">
                <div class="section-title">DATOS DEL TUTOR</div>
                
                <div class="text-value" id="lblTutorNombre" style="font-weight: bold;">...</div>
                <div class="text-value">Nro CI: <span id="lblTutorCi">...</span></div>
                <div class="text-value">Correo: <span id="lblTutorCorreo">...</span></div>
            </div>
        </div>

        <div class="table-title">INTEGRANTES DEL PROYECTO</div>

        <table class="tbproductos" id="tbDetalles">
            <thead>
                <tr>
                    <th style="width: 50px;">N°</th>
                    <th style="width: 70px;">Foto</th>
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
