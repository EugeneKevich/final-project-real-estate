import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken, updateUserById } from '../../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // 1. check if session token exists
  // console.log('request.query', request.query);
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  const userId = Number(request.query.profileId);

  // 2. check if the id is a number
  if (!userId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  // 3. check if user exists and has a valid session token
  const user = await getUserBySessionToken(session.token);

  // 4. check if user exists in the database
  if (!user) {
    return response
      .status(404)
      .json({ message: 'Not a valid username or not a valid session token' });
  }

  if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
    const userName = request.body?.userName;

    // Check if all the information exist to create the user
    if (!userName) {
      return response
        .status(400)
        .json({ message: 'property username or email missing' });
    }

    // TODO: add type checking to the api

    // Create the user using the database util function
    const newUser = await updateUserById(userId, userName);

    if (!newUser) {
      return response.status(404).json({ message: 'Not a valid Username' });
    }

    // response with the new created user
    return response.status(200).json(newUser);
  }
}
