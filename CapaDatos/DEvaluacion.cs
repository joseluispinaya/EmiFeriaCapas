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
    public class DEvaluacion
    {
        #region "PATRON SINGLETON"
        private static DEvaluacion instancia = null;
        private DEvaluacion() { }
        public static DEvaluacion GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DEvaluacion();
            }
            return instancia;
        }
        #endregion

        public Respuesta<NotasJuradosDTO> ObtenerNotaFinalProyecto(int idProyecto)
        {
            try
            {
                NotasJuradosDTO obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_ObtenerNotaFinalProyecto", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdProyecto", idProyecto);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new NotasJuradosDTO
                                {
                                    // uso iddocente por idproyecto
                                    IdDocente = Convert.ToInt32(dr["IdProyecto"]),
                                    // uso NotaTotal por NotaFinalPromedio
                                    NotaTotal = Convert.ToDecimal(dr["NotaFinalPromedio"]),
                                    // uso IdEvaluacion por CantJuradosQueCali
                                    IdEvaluacion = Convert.ToInt32(dr["CantJuradosQueCali"])
                                };
                            }
                        }
                    }
                }

                // Si obj es null, es que el correo no existe
                return new Respuesta<NotasJuradosDTO>
                {
                    Estado = obj != null,
                    Data = obj,
                    // Es buena práctica de seguridad decir "Credenciales incorrectas" y no "Correo no existe"
                    Mensaje = obj != null ? "Notas Obtenidas" : "El proyecto no tiene notas aun"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<NotasJuradosDTO>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<NotasJuradosDTO>> ListarNotasPorJurado(int idProyecto)
        {
            try
            {
                List<NotasJuradosDTO> rptLista = new List<NotasJuradosDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarNotasPorJurado", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdProyecto", idProyecto);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new NotasJuradosDTO
                                {
                                    IdDocente = Convert.ToInt32(dr["IdDocente"]),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    ImagenUrl = dr["ImagenUrl"].ToString(),
                                    NotaTotal = Convert.ToDecimal(dr["NotaTotal"]),
                                    IdEvaluacion = Convert.ToInt32(dr["IdEvaluacion"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<NotasJuradosDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<NotasJuradosDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<PlanillaDTO>> VerDetalleEvaluacion(int idEvaluacion)
        {
            try
            {
                List<PlanillaDTO> rptLista = new List<PlanillaDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_VerDetalleEvaluacion", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdEvaluacion", idEvaluacion);
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
                                    PuntajeMaximo = Convert.ToDecimal(dr["PuntajeMaximo"]),
                                    PuntajeObtenido = Convert.ToDecimal(dr["PuntajeObtenido"])
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
