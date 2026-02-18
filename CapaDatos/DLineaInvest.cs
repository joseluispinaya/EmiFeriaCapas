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
    public class DLineaInvest
    {
        #region "PATRON SINGLETON"
        private static DLineaInvest instancia = null;
        private DLineaInvest() { }
        public static DLineaInvest GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DLineaInvest();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<ELineaInvest>> ListaLineasInvestigacion()
        {
            try
            {
                List<ELineaInvest> rptLista = new List<ELineaInvest>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerLineaInvest", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ELineaInvest()
                                {
                                    IdLinea = Convert.ToInt32(dr["IdLinea"]),
                                    IdArea = Convert.ToInt32(dr["IdArea"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    NombreArea = dr["NombreArea"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ELineaInvest>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ELineaInvest>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = ex.Message
                };
            }
        }

        public Respuesta<List<ELineaInvest>> ObtenerLineasPorArea(int idArea)
        {
            try
            {
                List<ELineaInvest> rptLista = new List<ELineaInvest>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_LineasInvestIdArea", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdArea", idArea);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ELineaInvest
                                {
                                    IdLinea = Convert.ToInt32(dr["IdLinea"]),
                                    IdArea = Convert.ToInt32(dr["IdArea"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ELineaInvest>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ELineaInvest>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarLineasInvest(ELineaInvest oLineaInvest)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarLineasInvest", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdArea", oLineaInvest.IdArea);
                        cmd.Parameters.AddWithValue("@Nombre", oLineaInvest.Nombre);

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
                    Mensaje = respuesta ? "Registrado Correctamente." : "El nombre ya existe, intente con otro."
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error al Registrar" };
            }
        }

        public Respuesta<bool> EditarLineasInvest(ELineaInvest oLineaInvest)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarLineasInvest", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdLinea", oLineaInvest.IdLinea);
                        cmd.Parameters.AddWithValue("@IdArea", oLineaInvest.IdArea);
                        cmd.Parameters.AddWithValue("@Nombre", oLineaInvest.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", oLineaInvest.Estado);

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
                    Mensaje = respuesta ? "Actualizado Correctamente." : "No se pudo actualizar. Verifique que el nombre no esté duplicado o que el registro exista."
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error al actualizar" };
            }
        }

    }
}
