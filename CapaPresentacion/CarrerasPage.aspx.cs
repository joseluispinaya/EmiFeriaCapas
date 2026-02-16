using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class CarrerasPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECarrera>> ListaCarreras()
        {
            return NCarrera.GetInstance().ListaCarreras();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ECarrera objeto)
        {
            return NCarrera.GetInstance().RegistrarCarrera(objeto);
        }

        [WebMethod]
        public static Respuesta<bool> Editar(ECarrera objeto)
        {
            return NCarrera.GetInstance().EditarCarreras(objeto);
        }

        [WebMethod]
        public static Respuesta<List<ECarrera>> ObtenerCarrerasPorGrado(int IdGradoAcademico)
        {
            return NCarrera.GetInstance().ObtenerCarrerasPorGrado(IdGradoAcademico);
        }
    }
}