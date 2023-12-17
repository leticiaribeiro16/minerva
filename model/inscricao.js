const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Inscricao = {
  create: async (matricula, aprovado, nota, turno) => {
    try {
      const inscricao = await prisma.inscricao.create({
        data: {
          matricula,
          aprovado,
          nota,
          turno,
        },
      });

      return inscricao.id;
    } catch (error) {
      throw error;
    }
  },

  get: async (id, matricula) => {
    try {
      const inscricao = await prisma.inscricao.findUnique({
        where: {
          id: id,
          matricula: matricula
        },
      });

      return inscricao;
    } catch (error) {
      throw error;
    }
  },

  getAll: async (matricula) => {
    try {
      const inscricoes = await prisma.inscricao.findMany({
        where: {
          matricula: matricula,
        },
        select: {
          id_edital: true,
          matricula: true,
          aprovado: true,
          edital: {
            select: {
              id: true,
              titulo: true,
              demanda: {
                select: {
                  qnt_bolsas: true,
                  disciplina: {
                    select: {
                      nome: true,
                      carga_horaria: true,
                    }
                  },
                  user: {
                    select: {
                      nome: true,
                    }
                  }
                }
              }
            }
          }
        }
      });

      return inscricoes;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Inscricao;