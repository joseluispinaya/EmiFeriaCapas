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
    public class DCategoria
    {
        #region "PATRON SINGLETON"
        private static DCategoria instancia = null;
        private DCategoria() { }
        public static DCategoria GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DCategoria();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<ECategoria>> ListaCategorias()
        {
            try
            {
                List<ECategoria> rptLista = new List<ECategoria>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCategorias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECategoria()
                                {
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = ex.Message
                };
            }
        }

        public Respuesta<bool> RegistrarCategoria(ECategoria oCategoria)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarCategorias", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oCategoria.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", oCategoria.Descripcion);

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

        public Respuesta<bool> EditarCategoria(ECategoria oCategoria)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarCategorias", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdCategoria", oCategoria.IdCategoria);
                        cmd.Parameters.AddWithValue("@Nombre", oCategoria.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", oCategoria.Descripcion);
                        cmd.Parameters.AddWithValue("@Estado", oCategoria.Estado);

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
