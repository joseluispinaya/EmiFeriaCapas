<%@ Page Title="" Language="C#" MasterPageFile="~/MasterEstudiante/EstHome.Master" AutoEventWireup="true" CodeBehind="InscripcionPage.aspx.cs" Inherits="CapaPresentacion.MasterEstudiante.InscripcionPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .doce-perfil {
            width: 110px;
            height: 110px;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h5 class="mb-3 text-center">Registro de Inscripcion de Proyecto</h5>
    <div class="row">
        <div class="col-md-7">
            <div class="card">
                <div class="card-header border-bottom">
                    <h5 class="card-title mb-0 fw-semibold text-uppercase">Registrar datos del proyecto</h5>
                </div>
                <div class="card-body">
                    <input type="hidden" value="0" id="txtIdFeria">

                    <div class="mb-2">
                        <label class="form-label" for="txtTitulo">Titulo del Proyecto : </label>
                        <textarea class="form-control" id="txtTitulo" placeholder="Ingrese el titulo del proyecto " rows="2"></textarea>
                    </div>

                    <div class="mb-2">
                        <label for="cboCategoria" class="form-label">Categoria :</label>
                        <select class="form-select" id="cboCategoria">
                        </select>
                    </div>

                    <div class="mb-2">
                        <label for="CboArea" class="form-label">Area Invest</label>
                        <select class="form-select" id="CboArea">
                        </select>
                    </div>

                    <div class="mb-2">
                        <label for="CboLinea" class="form-label">Linea Invest</label>
                        <select class="form-select" id="CboLinea">
                        </select>
                    </div>

                    

                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="card">
                <div class="card-header border-bottom">
                    <h5 class="card-title mb-0 fw-semibold text-uppercase">Datos del Tutor</h5>
                </div>
                <div class="card-body">

                    <div class="mb-2">
                        <label class="form-label">Buscar Tutor:</label>
                        <select id="cboBuscarDocente" class="form-control select2" style="width: 100%;">
                            <option value="">Escriba el nombre o CI del tutor...</option>
                        </select>
                    </div>

                    <div class="mb-2 text-center">
                        <img src="../Imagenes/sinimagen.png" id="imgDocente" alt="image" class="img-fluid rounded-circle doce-perfil">
                    </div>

                    <input type="hidden" value="0" id="txtIdTutor">

                    <div class="d-flex align-items-center text-muted">
                        <i class="ti ti-user me-1"></i>
                        <span id="txtNombreTutor" class="fs-16">...</span>
                    </div>

                    <div class="d-flex align-items-center text-muted">
                        <i class="ti ti-phone me-1"></i>
                        <span id="txtCelu" class="fs-16">..</span>
                    </div>

                    <div class="d-flex align-items-center text-muted">
                        <i class="ti ti-id-badge-2 me-1"></i>
                        <span id="txtNroCido" class="fs-16">..</span>
                    </div>

                    <div class="mt-2">
                        <label class="form-label">Buscar Estudiantes:</label>
                        <select id="cboBuscarEstudiante" class="form-control select2" style="width: 100%;">
                            <option value="">Escriba el nombre o CI del estudiante...</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="header-title mb-0">Integrantes del Proyecto</h4>
                </div>
                <div class="card-body" id="loadd">
                    <div class="table-responsive">
                        <table id="tbGrupoEstudiantes" class="table text-center table-nowrap align-middle mb-0">
                            <thead>
                                <tr class="bg-light bg-opacity-50">
                                    <th scope="col" class="border-0" style="width: 70px;">Opcion</th>
                                    <th scope="col" class="border-0" style="width: 140px">Nro CI</th>
                                    <th scope="col" class="border-0" style="width: 140px">Codigo</th>
                                    <th scope="col" class="border-0">Estudiantes</th>
                                    <th scope="col" class="border-0" style="width: 140px;">Foto</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <!--end table-->
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <div class="d-flex justify-content-center gap-2">
                    <button type="button" id="btnGuardar" class="btn btn-success gap-1"><i class="ti ti-device-floppy fs-16"></i>Registrar</button>
                    <%--<a href="javascript: void(0);" class="btn btn-success gap-1"><i class="ti ti-device-floppy fs-16"></i>Registrar</a>--%>
                    <%--<a href="javascript:window.print()" class="btn btn-primary gap-1"><i class="ti ti-printer fs-16"></i>Imprimir</a>--%>
                    <button type="button" id="btnImprimirr" class="btn btn-primary gap-1"><i class="ti ti-printer fs-16"></i>Imprimir</button>
                    <a href="InicioEst.aspx" class="btn btn-info gap-1"><i class="ti ti-arrow-badge-left fs-18"></i>Volver</a>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsEst/InscripcionPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
