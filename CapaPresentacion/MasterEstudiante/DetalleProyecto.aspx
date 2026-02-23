<%@ Page Title="" Language="C#" MasterPageFile="~/MasterEstudiante/EstHome.Master" AutoEventWireup="true" CodeBehind="DetalleProyecto.aspx.cs" Inherits="CapaPresentacion.MasterEstudiante.DetalleProyecto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .doce-perfil {
            width: 90px;
            height: 90px;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-5">
            <div class="card">
                <div class="card-header">
                    <h4 class="header-title mb-0">Integrantes del Proyecto</h4>
                </div>
                <div class="card-body">
                    <input type="hidden" value="0" id="txtIdProyecto">
                    <%--<h5 class="mb-2 text-center">Integrantes del Proyecto</h5>--%>
                    <%--<h4 class="text-dark fw-medium mt-3 mb-2 pb-1">Integrantes</h4>--%>
                    <div class="table-responsive">
                        <table id="tbGrupoEstudiantes" class="table text-center table-nowrap align-middle mb-0">
                            <thead>
                                <tr class="bg-light bg-opacity-50">
                                    <th scope="col" class="border-0">Estudiantes</th>
                                    <th scope="col" class="border-0" style="width: 140px;">Foto</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <%--<div class="border border-dashed p-2 rounded text-center">
                        <div class="row">
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Arm Width : </span>54 cm</p>
                            </div>
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Seat Width : </span>67 cm</p>
                            </div>
                            <div class="col-lg-3 col-4 border-end">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Seat Depth : </span>54 cm</p>
                            </div>
                            <div class="col-lg-3 col-4">
                                <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Seat Height : </span>40 cm</p>
                            </div>
                        </div>
                    </div>--%>
                </div>
            </div>

        </div>
        <div class="col-md-7">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            <span id="lblEstado" class="badge bg-success-subtle text-success px-2 py-1 fs-13 rounded-pill">..</span>
                        </div>
                        <div class="flex-grow-1 d-inline-flex align-items-center justify-content-end fs-16">
                            <span id="lblFecha" class="ms-1 fs-14">Fecha</span>
                        </div>
                    </div>
                    <div class="mt-3 mb-2">
                        <h5 id="lblNombreProyecto" class="text-dark fw-medium">Cargando..</h5>
                        <!-- <a href="#!" class="text-dark fs-20 fw-medium">Minetta Rattan Swivel Luxury Green Premium Lounge Chair</a> -->
                    </div>
                    <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Evento. : </span><span id="lblFeria">Cargando...</span></p>
                    <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Area Inv. : </span><span id="lblArea">Cargando...</span></p>
                    <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Linea Inv. : </span><span id="lblLinea">Cargando...</span></p>
                    <p class="text-muted fw-medium fs-14 mb-3"><span class="text-dark">Categoria : </span><span id="lblCategoria">Cargando...</span></p>

                    <!-- <h5 class="mb-3 text-center">Datos del Tutor</h5> -->
                    <h4 class="text-dark fw-medium text-center">Datos del Tutor</h4>
                    <!-- <h2 class="my-4 fw-bold text-dark">$300.00 <span class="text-muted fs-14 fw-medium">/ 20% Off</span></h2> -->

                    <div class="row">
                        <div class="col-md-6">
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Tutor : </span><span id="lblTutorNombre">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Nro CI : </span><span id="lblTutorCi">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-0"><span class="text-dark">Correo : </span><span id="lblTutorCorreo">Cargando...</span></p>
                        </div>
                        <div class="col-md-6">
                            <div class="text-center">
                                <img src="../Imagenes/sinimagen.png" id="imgDocente" alt="image" class="img-fluid rounded-circle doce-perfil" />
                            </div>
                        </div>
                    </div>

                    <a href="#!" class="link-primary">Ver documento...</a>

                    <%--<h4 class="text-dark fw-medium mt-3 mb-2 pb-1">Integrantes</h4>--%>
                    <%--<div class="table-responsive">
                        <table id="tbGrupoEstudiantes" class="table text-center table-nowrap align-middle mb-0">
                            <thead>
                                <tr class="bg-light bg-opacity-50">
                                    <th scope="col" class="border-0" style="width: 140px">Codigo</th>
                                    <th scope="col" class="border-0">Estudiantes</th>
                                    <th scope="col" class="border-0" style="width: 140px;">Foto</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>--%>
                </div>
                <div class="card-footer border-top border-dashed">
                    <div class="d-flex justify-content-center gap-2">
                        <button type="button" id="btnDescargar" class="btn btn-success gap-1"><i class="ti ti-download fs-16"></i>Descargar</button>
                        <button type="button" id="btnImprimirr" class="btn btn-primary gap-1"><i class="ti ti-printer fs-16"></i>Imprimir</button>
                        <a href="ProyectosPage.aspx" class="btn btn-info gap-1"><i class="ti ti-arrow-badge-left fs-18"></i>Volver</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsEst/DetalleProyecto.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
