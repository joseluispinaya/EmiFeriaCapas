using System.Collections.Generic;

namespace CapaEntidad
{
    public class EDetalleEvaluacion
    {
        public int IdIndicador { get; set; }
        public decimal PuntajeObtenido { get; set; }
    }

    // Objeto principal para recibir desde el JS
    public class EEvaluacionRequest
    {
        public int IdProyecto { get; set; }
        // IdDocente lo sacas de session, no es obligatorio que venga del JSON
        public string Observaciones { get; set; }
        public bool Finalizado { get; set; }
        public List<EDetalleEvaluacion> Detalles { get; set; }
    }
}
