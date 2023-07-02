import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { leagueValidationSchema } from 'validationSchema/leagues';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getLeagues();
    case 'POST':
      return createLeague();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLeagues() {
    const data = await prisma.league
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'league'));
    return res.status(200).json(data);
  }

  async function createLeague() {
    await leagueValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.tournament?.length > 0) {
      const create_tournament = body.tournament;
      body.tournament = {
        create: create_tournament,
      };
    } else {
      delete body.tournament;
    }
    const data = await prisma.league.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
