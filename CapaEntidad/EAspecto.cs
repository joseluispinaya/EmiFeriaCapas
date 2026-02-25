namespace CapaEntidad
{
    public class EAspecto
    {
        public int IdAspecto { get; set; }
        public string Nombre { get; set; }
        public bool Estado { get; set; }
        public int NroCriterios { get; set; }

        public string CantCriterios =>
            NroCriterios == 0
            ? "0 Criterios"
            : NroCriterios == 1
                ? "1 Criterio"
                : $"{NroCriterios} Criterios";
    }
}
