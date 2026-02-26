namespace CapaEntidad
{
    public class PlanillaDTO
    {
        public int IdAspecto { get; set; }
        public string NombreAspecto { get; set; }
        public int IdCriterio { get; set; }
        public string NombreCriterio { get; set; }
        public int IdIndicador { get; set; }
        public string IndicadorDesc { get; set; }
        public decimal PuntajeMaximo { get; set; }
        public decimal PuntajeObtenido { get; set; }
    }
}
