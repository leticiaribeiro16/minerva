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
          id_user: matricula
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
          id_user: matricula,
        },
      });

      return inscricoes;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Inscricao;