using System;

namespace CapaEntidad
{
    public class ProyectoResumenDTO
    {
        public string NombreFeria { get; set; }
        public int IdProyecto { get; set; }
        public string NombreProyecto { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string FechaRegistroSt { get; set; }
        public bool Estado { get; set; }
    }
}
