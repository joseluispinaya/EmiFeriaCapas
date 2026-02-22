using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;

namespace CapaPresentacion.MasterEstudiante
{
    public partial class InscripcionPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<int> RegistrarProyecto(EProyecto objeto, List<EGrupoEstudiante> ListaGrupoEst)
        {
            try
            {
                if (ListaGrupoEst == null || !ListaGrupoEst.Any())
                {
                    return new Respuesta<int> { Estado = false, Mensaje = "No se tiene lista de estudiantes." };
                }

                XElement proyectostr = new XElement("Proyecto",
                    new XElement("NombreProyecto", objeto.NombreProyecto),
                    new XElement("IdFeria", objeto.IdFeria),
                    new XElement("IdCategoria", objeto.IdCategoria),
                    new XElement("IdLinea", objeto.IdLinea),
                    new XElement("IdDocente", objeto.IdDocente),
                    new XElement("DocPdfUrl", "")
                );

                XElement listaEst = new XElement("ListaGrupoEst");

                foreach (EGrupoEstudiante item in ListaGrupoEst)
                {
                    listaEst.Add(new XElement("Item",

                        new XElement("IdEstudiante", item.IdEstudiante)
                        )

                    );
                }

                proyectostr.Add(listaEst);
                return NProyecto.GetInstance().RegistrarProyecto(proyectostr.ToString());
            }
            catch (Exception ex)
            {
                // Capturar cualquier error y retornar una respuesta de fallo
                return new Respuesta<int>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<ProyectoReportDTO> ObtenerDetalleReporteProyecto(int IdProyecto)
        {
            return NProyecto.GetInstance().ObtenerDetalleReporteProyecto(IdProyecto);
        }
    }
}