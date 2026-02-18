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
    public partial class CategoriasPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECategoria>> ListaCategorias()
        {
            return NCategoria.GetInstance().ListaCategorias();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ECategoria objeto)
        {
            return NCategoria.GetInstance().RegistrarCategoria(objeto);
        }

        [WebMethod]
        public static Respuesta<bool> Editar(ECategoria objeto)
        {
            return NCategoria.GetInstance().EditarCategoria(objeto);
        }
    }
}