using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DIndicador
    {
        #region "PATRON SINGLETON"
        private static DIndicador instancia = null;
        private DIndicador() { }
        public static DIndicador GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DIndicador();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EIndicador>> ListarIndicadores()
        {
            try
            {
                List<EIndicador> rptLista = new List<EIndicador>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarIndicadores", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EIndicador()
                                {
                                    IdIndicador = Convert.ToInt32(dr["IdIndicador"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    PuntajeMaximo = Convert.ToDecimal(dr["PuntajeMaximo"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    IdCriterio = Convert.ToInt32(dr["IdCriterio"]),
                                    NombreCriterio = dr["NombreCriterio"].ToString(),
                                    IdAspecto = Convert.ToInt32(dr["IdAspecto"]),
                                    NombreAspecto = dr["NombreAspecto"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EIndicador>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EIndicador>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<List<EIndicador>> ListarIndicadoresPorCriterio(int idCriterio)
        {
            try
            {
                List<EIndicador> rptLista = new List<EIndicador>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarIndicadoresPorCriterio", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdCriterio", idCriterio);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EIndicador
                                {
                                    IdIndicador = Convert.ToInt32(dr["IdIndicador"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    PuntajeMaximo = Convert.ToDecimal(dr["PuntajeMaximo"]),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EIndicador>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EIndicador>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarOrEditar(EIndicador oIndicador)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarIndicador", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdIndicador", oIndicador.IdIndicador);
                        cmd.Parameters.AddWithValue("@IdCriterio", oIndicador.IdCriterio);
                        cmd.Parameters.AddWithValue("@Descripcion", oIndicador.Descripcion);
                        cmd.Parameters.AddWithValue("@PuntajeMaximo", oIndicador.PuntajeMaximo);
                        cmd.Parameters.AddWithValue("@Estado", oIndicador.Estado);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Correctamente." : "intente mas tarde."
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error" };
            }
        }

        public Respuesta<List<PlanillaDTO>> ObtenerRubricaCompleta()
        {
            try
            {
                List<PlanillaDTO> rptLista = new List<PlanillaDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerRubricaCompleta", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new PlanillaDTO
                                {
                                    IdAspecto = Convert.ToInt32(dr["IdAspecto"]),
                                    NombreAspecto = dr["NombreAspecto"].ToString(),
                                    IdCriterio = Convert.ToInt32(dr["IdCriterio"]),
                                    NombreCriterio = dr["NombreCriterio"].ToString(),
                                    IdIndicador = Convert.ToInt32(dr["IdIndicador"]),
                                    IndicadorDesc = dr["IndicadorDesc"].ToString(),
                                    PuntajeMaximo = Convert.ToDecimal(dr["PuntajeMaximo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<PlanillaDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<PlanillaDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
