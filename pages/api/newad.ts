import { NextApiRequest, NextApiResponse } from 'next';
import { createNewAd } from '../../database/newad';
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
      request.body.images,
    );
    response.status(200).json({ user: user });
  }
}
