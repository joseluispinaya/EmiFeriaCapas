<%@ Page Title="" Language="C#" MasterPageFile="~/MasterDocente/DocenteHo.Master" AutoEventWireup="true" CodeBehind="InicioDocente.aspx.cs" Inherits="CapaPresentacion.MasterDocente.InicioDocente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header border-bottom border-dashed d-flex align-items-center">
                    <h4 class="header-title">Inicio de Docente</h4>
                </div>

                <div class="card-body">
                    <p class="text-muted">Here's a basic example of SweetAlert.</p>
                    <button type="button" class="btn btn-primary" id="sweetalert-basic">Click me</button>
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="card">
                <div class="card-header border-bottom border-dashed d-flex align-items-center">
                    <h4 class="header-title">All States</h4>
                </div>

                <div class="card-body">
                    <p class="text-muted">Here are examples for each of SweetAlert's states.</p>

                    <div class="d-flex flex-wrap gap-2">
                        <button type="button" id="sweetalert-info" class="btn btn-info">Toggle Info</button>
                        <button type="button" id="sweetalert-warning" class="btn btn-warning">Toggle Warning</button>
                        <button type="button" id="sweetalert-error" class="btn btn-danger">Toggle Error</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
