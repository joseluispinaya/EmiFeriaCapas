namespace CapaEntidad
{
    public class EIndicador
    {
        public int IdIndicador { get; set; }
        public string Descripcion { get; set; }
        public decimal PuntajeMaximo { get; set; }
        public bool Estado { get; set; }

        public int IdCriterio { get; set; }
        public string NombreCriterio { get; set; } // Para mostrar en tabla

        public int IdAspecto { get; set; } // <--- VITAL
        public string NombreAspecto { get; set; } // Para mostrar en tabla

        //public string PuntajeStr => PuntajeMaximo.ToString("0.00");
    }
}
