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
    public class DCarrera
    {
        #region "PATRON SINGLETON"
        private static DCarrera instancia = null;
        private DCarrera() { }
        public static DCarrera GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DCarrera();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ECarrera>> ListaCarreras()
        {
            try
            {
                List<ECarrera> rptLista = new List<ECarrera>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCarreras", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECarrera()
                                {
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    IdGradoAcademico = Convert.ToInt32(dr["IdGradoAcademico"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    NombreGrado = dr["NombreGrado"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista de carreras: {ex.Message}"
                };
            }
        }

        public Respuesta<List<ECarrera>> ObtenerCarrerasPorGrado(int idGradoAcademico)
        {
            try
            {
                List<ECarrera> rptLista = new List<ECarrera>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_CarrerasIdGrado", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdGradoAcademico", idGradoAcademico);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECarrera
                                {
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    IdGradoAcademico = Convert.ToInt32(dr["IdGradoAcademico"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "carreras obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista de carreras: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarCarrera(ECarrera oCarrera)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarCarreras", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdGradoAcademico", oCarrera.IdGradoAcademico);
                        cmd.Parameters.AddWithValue("@Nombre", oCarrera.Nombre);

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

        public Respuesta<bool> EditarCarreras(ECarrera oCarrera)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarCarrera", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdCarrera", oCarrera.IdCarrera);
                        cmd.Parameters.AddWithValue("@IdGradoAcademico", oCarrera.IdGradoAcademico);
                        cmd.Parameters.AddWithValue("@Nombre", oCarrera.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", oCarrera.Estado);

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
