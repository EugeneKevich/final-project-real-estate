// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import {
  createNewAd,
  getEstateByUserId,
  updateEstateByid,
} from '../../database/newad';
import { getValidSessionByToken } from '../../database/sessions';
import { getUserBySessionToken, User } from '../../database/users';

export default async function createAdHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
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

    const newAd = await createNewAd(
      user.id,
      request.body.status,
      request.body.yearBuilt,
      request.body.baths,
      request.body.beds,
      request.body.buildingSize,
      request.body.price,
      request.body.adress,
      request.body.garage,
      request.body.imageLink,
    );
    response.status(200).json({ user: user });
  }

  if (request.method === 'PUT') {
    const id = request.body?.id;
    const status = request.body?.status;
    const baths = request.body?.baths;
    const buildingSize = request.body?.buildingSize;
    const price = request.body?.price;
    const adress = request.body?.adress;
    const beds = request.body?.beds;

    const newEstate = await updateEstateByid(
      id,
      status,
      baths,
      beds,
      buildingSize,
      price,
      adress,
    );
    return response.status(200).json(newEstate);
  }
}
