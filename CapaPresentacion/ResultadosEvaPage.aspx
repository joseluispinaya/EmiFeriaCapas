<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="ResultadosEvaPage.aspx.cs" Inherits="CapaPresentacion.ResultadosEvaPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
    <style>
        .doce-perfil {
            width: 70px;
            height: 70px;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <input type="hidden" value="0" id="txtIdProyecto">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="mb-3">
                                <h5 id="lblNombreProyecto" class="text-dark fw-medium">.....</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <div class="d-flex align-items-center">
                                    <div id="rater2"></div>

                                    <span id="lblNotaNumerica" class="ms-2 fw-bold text-dark fs-14"></span>
                                </div>
                                <small id="lblEstadoCalificacion" class="text-muted"></small>
                            </div>
                        </div>
                        <%--<div class="col-md-3">
                            <div class="mb-3">
                                <div id="rater2" dir="ltr" class="star-rating" data-rating="4"
                                    style="width: 80px; height: 16px; background-size: 16px;" title="My custom rating text 5">
                                    <div class="star-value" style="background-size: 16px; width: 80%;"></div>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Evento. : </span><span id="lblFeria">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Area Inv. : </span><span id="lblArea">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Linea Inv. : </span><span id="lblLinea">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Categoria : </span><span id="lblCategoria">Cargando...</span></p>
                        </div>
                        <div class="col-md-5">
                            <h5 class="text-dark fw-medium text-center">Datos del Tutor</h5>

                            <div class="d-flex align-items-center gap-2">
                                <div class="d-flex align-items-center justify-content-center">
                                    <img src="Imagenes/sinimagen.png" id="imgDocente" alt="image" class="img-fluid rounded-circle doce-perfil">
                                </div>

                                <div>
                                    <p id="lblTutorNombre" class="text-dark fw-medium fs-16 mb-1">Cargando...</p>
                                    <p id="lblTutorCorreo" class="mb-0">Cargando...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header border-bottom border-dashed d-flex justify-content-between align-items-center">
                    <h4 class="header-title">Notas por Jurado</h4>
                    <a href="ProyectosFePage.aspx" class="btn btn-sm btn-secondary">Volver <i class="ti ti-arrow-badge-left fs-20 ms-1"></i></a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="tbNotasJurados" class="table table-centered table-nowrap border-top mb-0">
                            <thead class="bg-light bg-opacity-25">
                                <tr>
                                    <th class="ps-3">Jurados</th>
                                    <%--<th>Nota Total</th>--%>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-header border-bottom border-dashed d-flex align-items-center">
                    <h4 class="header-title">Integrantes</h4>
                </div>
                <div class="card-body">
                    <%--<h5 class="text-dark fw-medium text-center mb-2">Integrantes</h5>--%>

                    <div class="table-responsive">
                        <table id="tbIntegrantes" class="table table-centered table-nowrap border-top mb-0">
                            <thead class="bg-light bg-opacity-25">
                                <tr>
                                    <th class="ps-3">Estudiantes</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>
    <script src="assets/vendor/rater-js/index.js"></script>

    <script src="js/ResultadosEvaPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
