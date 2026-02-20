<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Login EMI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Sistema Net EMI Unidad Academica Riberalta" name="description" />
    <meta content="Emi Riberalta" name="author" />

    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">

    <link href="assets/vendor/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

    <!-- Theme Config Js -->
    <script src="assets/js/config.js"></script>

    <!-- Vendor css -->
    <link href="assets/css/vendor.min.css" rel="stylesheet" type="text/css" />

    <!-- App css -->
    <link href="assets/css/app.min.css" rel="stylesheet" type="text/css" id="app-style" />

    <!-- Icons css -->
    <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
        <div class="row g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
            <div class="col-xl-4 col-lg-5 col-md-6">
                <div class="card overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
                    <a href="#" class="auth-brand mb-3">
                        <img src="assets/images/logoEmi.png" alt="dark logo" height="50" class="logo-dark">
                        <img src="assets/images/logoEmi.png" alt="logo light" height="50" class="logo-light">
                    </a>

                    <h4 class="fw-semibold mb-2">Inicio de sesion</h4>

                    <div class="text-start mb-3">
                        <div class="mb-3">
                            <label class="form-label" for="txtCorreo">Correo</label>
                            <input type="email" id="txtCorreo" name="Correo" class="form-control" placeholder="Ingrese su correo">
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="txtClave">Contraseña</label>
                            <input type="password" id="txtClave" class="form-control" placeholder="Ingrese su contraseña">
                        </div>

                        <div class="mb-3">
                            <label for="cboRol" class="form-label">Rol de usuario</label>
                            <select class="form-select" id="cboRol">
                                <option value="">-- Seleccione su Rol --</option>
                                <option value="1">Administracion</option>
                                <option value="2">Docente</option>
                                <option value="3">Estudiante</option>
                            </select>
                        </div>

                        <div class="d-grid">
                            <button id="btnIniciar" class="btn btn-primary" type="button">Ingresar</button>
                        </div>
                    </div>

                    <p class="text-danger fs-14 mb-3">Olvido su contraseña? <a href="#" class="fw-semibold text-dark ms-1">Recuperar</a></p>

                    <p class="mt-auto mb-0">
                        <script>document.write(new Date().getFullYear())</script> © EMI - By <span class="fw-bold text-decoration-underline text-uppercase text-reset fs-12">Zero_byte</span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Vendor js -->
    <script src="assets/js/vendor.min.js"></script>

    <!-- App js -->
    <script src="assets/js/app.js"></script>
    <script src="assets/vendor/sweetalert2/sweetalert2.min.js"></script>
    <script src="assets/vendor/loadingoverlay/loadingoverlay.min.js"></script>
    <script src="js/Login.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</body>
</html>
