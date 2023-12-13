const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Demanda = {
  create: async (id_disciplina, orientador, qnt_bolsas, requisitos) => {
    try {
      const demanda = await prisma.demanda.create({
        data: {
          id_disciplina,
          orientador,
          qnt_bolsas,
          requisitos,
        },
      });

      return demanda.id; 
    } catch (error) {
      throw error;
    }
  },

  get: async (id) => {
    try {
      const demanda = await prisma.demanda.findUnique({
        where: {
          id,
        },
      });

      return demanda;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, id_disciplina, orientador, qnt_bolsas, requisitos) => {
    try {
      const updatedDemanda = await prisma.demanda.update({
        where: {
          id,
        },
        data: {
          id_disciplina,
          orientador,
          qnt_bolsas,
          requisitos,
        },
      });

      return updatedDemanda !== null;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const deletedDemanda = await prisma.demanda.delete({
        where: {
          id,
        },
      });

      return deletedDemanda !== null;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const demandas = await prisma.demanda.findMany();
      return demandas;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Demanda;
