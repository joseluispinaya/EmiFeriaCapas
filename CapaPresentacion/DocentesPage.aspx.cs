using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class DocentesPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EDocente>> ListaDocentes()
        {
            return NDocente.GetInstance().ListaDocentes();
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EDocente objeto, string base64Image)
        {
            try
            {
                var utilidades = Utilidadesj.GetInstance();
                string imageUrl = string.Empty;

                // Si el string no está vacío, procesamos la imagen
                if (!string.IsNullOrEmpty(base64Image))
                {
                    // 1. Convertimos el string Base64 de vuelta a un arreglo de bytes
                    byte[] imageBytes = Convert.FromBase64String(base64Image);

                    // 2. Usamos tu misma clase Utilidadesj (no tienes que cambiarle nada)
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/ImagenesDoce/";
                        imageUrl = utilidades.UploadPhoto(stream, folder);
                    }
                }

                string clavePlana = objeto.NroCi;
                objeto.ImagenUrl = imageUrl;
                objeto.ClaveHash = utilidades.Hash(clavePlana);

                // Mandamos a guardar a BD
                return NDocente.GetInstance().RegistrarDocente(objeto);
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EDocente objeto, string base64Image)
        {
            try
            {
                var utilidades = Utilidadesj.GetInstance();

                // 1. Verificamos si el usuario subió una foto NUEVA
                if (!string.IsNullOrEmpty(base64Image))
                {
                    // Convertimos el string Base64 a arreglo de bytes
                    byte[] imageBytes = Convert.FromBase64String(base64Image);

                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/ImagenesDoce/";

                        // Sobrescribimos la URL del objeto con la nueva imagen subida
                        objeto.ImagenUrl = utilidades.UploadPhoto(stream, folder);
                    }
                }
                // IMPORTANTE: Si base64Image está vacío, el IF se salta.
                // Esto significa que 'objeto.ImagenEstUrl' conservará el valor 
                // original (la ruta de la foto antigua) que le enviaste desde tu JavaScript.

                // 2. Mandamos a actualizar a la BD
                // (Asegúrate de que este método llame a tu usp_ModificarEstudiante que armamos antes)
                return NDocente.GetInstance().EditarDocente(objeto);
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}