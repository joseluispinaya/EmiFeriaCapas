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
    public class DAspecto
    {
        #region "PATRON SINGLETON"
        private static DAspecto instancia = null;
        private DAspecto() { }
        public static DAspecto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DAspecto();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EAspecto>> ListarAspectos()
        {
            try
            {
                List<EAspecto> rptLista = new List<EAspecto>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarAspectos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EAspecto()
                                {
                                    IdAspecto = Convert.ToInt32(dr["IdAspecto"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    NroCriterios = Convert.ToInt32(dr["NroCriterios"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EAspecto>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EAspecto>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<bool> GuardarOrEditarAspectos(EAspecto oAspecto)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarAspecto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdAspecto", oAspecto.IdAspecto);
                        cmd.Parameters.AddWithValue("@Nombre", oAspecto.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", oAspecto.Estado);

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
