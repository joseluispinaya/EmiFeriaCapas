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
    public partial class GradosPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EGradoAcademico>> ListaGradosAcademicos()
        {
            return NGradoAcademico.GetInstance().ListaGradosAcademicos();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EGradoAcademico objeto)
        {
            return NGradoAcademico.GetInstance().RegistrarGrados(objeto);
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EGradoAcademico objeto)
        {
            return NGradoAcademico.GetInstance().EditarGrados(objeto);
        }
    }
}