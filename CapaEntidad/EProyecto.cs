using System;

namespace CapaEntidad
{
    public class EProyecto
    {
        public int IdProyecto { get; set; }
        public string NombreProyecto { get; set; }
        public int IdFeria { get; set; }
        public int IdCategoria { get; set; }
        public int IdLinea { get; set; }
        public int IdDocente { get; set; }
        public string DocPdfUrl { get; set; }
        public DateTime FechaRegistro { get; set; }
        //public string FechaRegistroSt { get; set; }
        public bool Estado { get; set; }
    }
}
