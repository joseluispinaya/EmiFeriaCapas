namespace CapaEntidad
{
    public class NotasJuradosDTO
    {
        public int IdDocente { get; set; }
        public string NombreCompleto { get; set; }
        public string ImagenUrl { get; set; }
        public decimal NotaTotal { get; set; }
        public int IdEvaluacion { get; set; }
    }
}
