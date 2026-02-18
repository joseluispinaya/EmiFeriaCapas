namespace CapaEntidad
{
    public class EAreaInvest
    {
        public int IdArea { get; set; }
        public string Nombre { get; set; }
        public bool Estado { get; set; }
        public int NroLineasInv { get; set; }

        public string CantiLineas =>
            NroLineasInv == 0
            ? "0 Lineas"
            : NroLineasInv == 1
                ? "1 Linea"
                : $"{NroLineasInv} Lineas";
    }
}
