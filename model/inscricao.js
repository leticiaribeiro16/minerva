const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const TurnoValues = {
  1: 'MANHA',
  2: 'TARDE',
  3: 'NOITE',
  4: 'FLEXIVEL'
};

const Inscricao = {
  create: async (id_edital, matricula, turno) => {
    try {
      const inscricao = await prisma.inscricao.create({
        data: {
          id_edital,
          matricula,
          turno,
        },
      });

      return inscricao.id;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id, matricula) => {
    try {
      const inscricao = await prisma.inscricao.findUnique({
        where: {
          id_edital_matricula: {
            id_edital: id,
            matricula: matricula
          }
        },
        select: {
          id_edital: true,
          matricula: true,
          aprovado: true,
          turno: true,
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
      inscricao.turno = TurnoValues[inscricao.turno];
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
          turno: true,
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

      inscricoes.forEach(inscricao => {
        inscricao.turno = TurnoValues[inscricao.turno];
      });

      return inscricoes;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Inscricao;