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
    public class DCriterio
    {
        #region "PATRON SINGLETON"
        private static DCriterio instancia = null;
        private DCriterio() { }
        public static DCriterio GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DCriterio();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ECriterio>> ListarCriterios()
        {
            try
            {
                List<ECriterio> rptLista = new List<ECriterio>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarCriterios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECriterio()
                                {
                                    IdCriterio = Convert.ToInt32(dr["IdCriterio"]),
                                    IdAspecto = Convert.ToInt32(dr["IdAspecto"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECriterio>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECriterio>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<List<ECriterio>> ListarCriteriosPorAspecto(int idAspecto)
        {
            try
            {
                List<ECriterio> rptLista = new List<ECriterio>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarCriteriosPorAspecto", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdAspecto", idAspecto);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECriterio
                                {
                                    IdCriterio = Convert.ToInt32(dr["IdCriterio"]),
                                    IdAspecto = Convert.ToInt32(dr["IdAspecto"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECriterio>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECriterio>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarOrEditar(ECriterio oCriterio)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarCriterio", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdCriterio", oCriterio.IdCriterio);
                        cmd.Parameters.AddWithValue("@IdAspecto", oCriterio.IdAspecto);
                        cmd.Parameters.AddWithValue("@Nombre", oCriterio.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", oCriterio.Estado);

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

    }
}
