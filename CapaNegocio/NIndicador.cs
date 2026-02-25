using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NIndicador
    {
        #region "PATRON SINGLETON"
        private static NIndicador instancia = null;
        private NIndicador() { }
        public static NIndicador GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NIndicador();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EIndicador>> ListarIndicadores()
        {
            return DIndicador.GetInstance().ListarIndicadores();
        }

        public Respuesta<List<EIndicador>> ListarIndicadoresPorCriterio(int idCriterio)
        {
            return DIndicador.GetInstance().ListarIndicadoresPorCriterio(idCriterio);
        }

        public Respuesta<bool> RegistrarOrEditar(EIndicador oIndicador)
        {
            return DIndicador.GetInstance().RegistrarOrEditar(oIndicador);
        }

        public Respuesta<List<PlanillaDTO>> ObtenerRubricaCompleta()
        {
            return DIndicador.GetInstance().ObtenerRubricaCompleta();
        }
    }
}
