using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class FeriasPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EFeria>> ListaFerias()
        {
            return NFeria.GetInstance().ListaFerias();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EFeria objeto)
        {
            try
            {
                // Tu excelente lógica de conversión
                DateTime Vfecha = DateTime.ParseExact(
                    objeto.FechaFeriaSt,
                    "dd/MM/yyyy",
                    CultureInfo.InvariantCulture
                );

                // Actualizamos la fecha real en el mismo objeto
                objeto.FechaFeria = Vfecha;

                return NFeria.GetInstance().RegistrarFeria(objeto);
            }
            catch (FormatException)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "La fecha no tiene el formato válido (dd/MM/yyyy)."
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EFeria objeto)
        {
            try
            {
                DateTime Vfecha = DateTime.ParseExact(
                    objeto.FechaFeriaSt,
                    "dd/MM/yyyy",
                    CultureInfo.InvariantCulture
                );

                objeto.FechaFeria = Vfecha;

                return NFeria.GetInstance().EditarFeria(objeto);
            }
            catch (FormatException)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "La fecha no tiene el formato válido (dd/MM/yyyy)."
                };
            }
        }
    }
}