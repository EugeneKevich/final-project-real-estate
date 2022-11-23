// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { getEstate, getEstateByUserId } from '../../database/newad';
import { getValidSessionByToken } from '../../database/sessions';
import { getUserBySessionToken } from '../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const session =
      request.cookies.sessionToken &&
      (await getValidSessionByToken(request.cookies.sessionToken));

    if (!session) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const user = await getUserBySessionToken(session.token);

    if (!user) {
      response
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    const estate = await getEstateByUserId(user.id);

    if (!estate) {
      response.status(400).json({ errors: [{ message: 'no ads' }] });
    }

    response.status(200).json({ estate });
  } else {
    response.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }

  const oneEstate = await getEstate();
  return response.status(200).json(oneEstate);
}
