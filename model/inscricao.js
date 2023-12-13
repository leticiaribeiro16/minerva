const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Inscricao = {
  create: async (matricula, aprovado, nota) => {
    try {
      const inscricao = await prisma.inscricao.create({
        data: {
          matricula,
          aprovado,
          nota,
        },
      });

      return inscricao.id;
    } catch (error) {
      throw error;
    }
  },

  get: async (id) => {
    try {
      const inscricao = await prisma.inscricao.findUnique({
        where: {
          id,
        },
      });

      return inscricao;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const inscricoes = await prisma.inscricao.findMany();
      return inscricoes;
    } catch (error) {
      throw error;
    }
  },

};

module.exports = Inscricao;
