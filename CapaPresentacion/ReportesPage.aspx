<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="ReportesPage.aspx.cs" Inherits="CapaPresentacion.ReportesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="card position-relative">

                <div class="card-body" id="loadd">
                    <!-- Invoice Logo-->
                    <div class="d-flex align-items-start justify-content-between mb-3">
                        <div class="overflow-hidden position-relative d-flex align-items-center justify-content-start px-2" style="height: 60px; width: 180px;">
                            <label for="imageInput" class="position-absolute top-0 start-0 end-0 bottom-0"></label>
                            <!-- <input class="d-none" type="file" id="imageInput"> 28 -->
                            <img id="preview" src="assets/images/logoEmi.png" alt="Preview Image" height="50">
                        </div>

                        <div class="text-end">
                            <div class="row g-1 align-items-center">
                                <div class="col-auto">
                                    <label for="invoiceNo" class="col-form-label fs-16 fw-bold">#INV</label>
                                </div>
                                <div class="col-auto">
                                    <input type="number" id="invoiceNo" class="form-control" placeholder="00001234">
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="hidden" value="0" id="txtIdFeria">

                    <div class="mb-3">
                        <label class="form-label" for="txtTitulo">Titulo del Proyecto : </label>
                        <textarea class="form-control" id="txtTitulo" placeholder="Ingrese el titulo del proyecto " rows="3"></textarea>
                    </div>

                    <div class="row">
                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-sm-0 mt-3">
                            <div class="mb-2">
                                <label class="form-label">Buscar Tutor:</label>
                                <select id="cboBuscarDocente" class="form-control select2" style="width: 100%;">
                                    <option value="">Escriba el nombre o CI del tutor...</option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <label for="cboCategoria" class="form-label">Categoria :</label>
                                <select class="form-select" id="cboCategoria">
                                </select>
                                <!-- <input type="text" data-provider="flatpickr" data-altFormat="F j, Y" class="form-control" placeholder="Select Date"> -->
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-sm-0 mt-3">
                            <input type="hidden" value="0" id="txtIdTutor">
                            <div class="mb-2">
                                <label class="form-label">Tutor del Proyecto :</label>
                                <input type="text" id="txtNombreTutor" class="form-control" disabled>
                            </div>

                            <div class="mb-2">
                                <label for="CboArea" class="form-label">Area Invest</label>
                                <select class="form-select" id="CboArea">
                                </select>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-sm-0 mt-3">
                            <div class="mb-2">
                                <label class="form-label">Contacto del Tutor :</label>
                                <input type="text" id="txtCelu" class="form-control" disabled>
                            </div>

                            <div class="mb-2">
                                <label for="CboLinea" class="form-label">Linea Invest</label>
                                <select class="form-select" id="CboLinea">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 offset-md-3 mt-3">
                            <div class="mb-2">
                                <label class="form-label">Buscar Estudiante:</label>
                                <select id="cboBuscarEstudiante" class="form-control select2" style="width: 100%;">
                                    <option value="">Escriba el nombre o CI del estudiante...</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
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
                <!-- end card-body-->

            </div>
            <!-- end card -->
            <div class="mb-5">
                <div class="d-flex justify-content-center gap-2">
                    <button type="button" id="btnGuardar" class="btn btn-success gap-1"><i class="ti ti-device-floppy fs-16"></i>Registrar</button>
                    <%--<a href="javascript: void(0);" class="btn btn-success gap-1"><i class="ti ti-device-floppy fs-16"></i>Registrar</a>--%>
                    <%--<a href="javascript:window.print()" class="btn btn-primary gap-1"><i class="ti ti-printer fs-16"></i>Imprimir</a>--%>
                    <button type="button" id="btnImprimirr" class="btn btn-primary gap-1"><i class="ti ti-printer fs-16"></i>Imprimir</button>
                    <a href="javascript: void(0);" class="btn btn-info gap-1"><i class="ti ti-download fs-16"></i>Descargar</a>
                </div>
            </div>
            <!-- end buttons -->
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/ReportesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
