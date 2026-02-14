<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="FeriasPage.aspx.cs" Inherits="CapaPresentacion.FeriasPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center">
                    <h4 class="header-title">Ferias Registradas</h4>
                    <button type="button" class="btn btn-info btn-sm">Agregar <i class="ti ti-plus ms-1"></i></button>
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/FeriasPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
