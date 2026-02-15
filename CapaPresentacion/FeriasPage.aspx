<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="FeriasPage.aspx.cs" Inherits="CapaPresentacion.FeriasPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datepiker-jquery-ui/jquery-ui.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center">
                    <h4 class="header-title">Ferias Registradas</h4>
                    <button type="button" id="btnNuevore" class="btn btn-info btn-sm">Agregar <i class="ti ti-plus ms-1"></i></button>
                    <!-- <a href="javascript:void(0);" class="btn btn-sm btn-secondary">Add Brand <i class="ti ti-plus ms-1"></i></a> -->
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbFerias" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Descripcion</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="modalAdd" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabeldetalle"
        aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Convocatoria</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-1">
                        <label for="txtDescripcion" class="form-label">Descripcion</label>
                        <input type="text" id="txtDescripcion" name="Descripcion" class="form-control form-control-sm">
                    </div>
                    <div class="mb-1">
                        <label for="txtFechaFeria" class="form-label">Fecha</label>
                        <input type="text" id="txtFechaFeria" class="form-control form-control-sm">
                    </div>
                    <%--<div class="mb-3">
                        <label for="txtFechaPrueba" class="form-label">Fecha Prueba</label>
                        <input type="text" id="txtFechaPrueba" class="form-control form-control-sm" data-provider="flatpickr" data-date-format="d M, Y">
                    </div>--%>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" id="btnGuardarReg" class="btn btn-sm btn-success"><i class="ti ti-brand-facebook me-1"></i>Guardar</button>
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
    <script src="assets/vendor/datepiker-jquery-ui/jquery-ui.js"></script>
    <script src="assets/vendor/datepiker-jquery-ui/idioma/datepicker-es.js"></script>

    <script src="js/FeriasPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
