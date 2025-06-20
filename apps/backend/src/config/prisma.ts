import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    params.args.where = { ...params.args.where, isDeleted: false };
  }
  if (params.action === 'findMany') {
    if (params.args.where) {
      params.args.where = { ...params.args.where, isDeleted: false };
    } else {
      params.args.where = { isDeleted: false };
    }
  }
  if (params.action === 'update') {
    params.args.data = { ...params.args.data, updatedAt: new Date() };
  }
  if (params.action === 'updateMany') {
    if (params.args.where) {
      params.args.where = { ...params.args.where, isDeleted: false };
    } else {
      params.args.where = { isDeleted: false };
    }
  }
  if (params.action === 'delete') {
    params.action = 'update';
    params.args.data = { isDeleted: true, deletedAt: new Date() };
  }
  if (params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (params.args.data) {
      params.args.data = { isDeleted: true, deletedAt: new Date() };
    } else {
      params.args.data = { isDeleted: true, deletedAt: new Date() };
    }
  }
  return next(params);
});

export default prisma; 