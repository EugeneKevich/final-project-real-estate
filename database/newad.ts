import { sql } from './connect';
import { User } from './users';

export type Estate = [
  {
    id: number;
    status: string;
    yearBuilt: number;
    baths: number;
    beds: number;
    buildingSize: number;
    price: number;
    adress: string;
    garage: number;
    images: string;
  },
];

export async function createNewAd(
  userId: User['id'],
  status: string,
  year_built: number,
  baths: number,
  beds: number,
  building_size: number,
  price: number,
  adress: string,
  garage: number,
  imageSrc: string,
) {
  const [estate] = await sql<Estate[]>`
  INSERT INTO estate
  (user_id, status,
  year_built,
  baths,
  beds,
  building_size,
  price,
  adress, garage,
  images)
  VALUES
  (${userId}, ${status},${year_built},${baths},${beds}, ${building_size}, ${price},${adress}, ${garage}, ${imageSrc})
  RETURNING
  id,
  status,
  year_built,
  baths,
  beds,
  building_size,
  price,
  adress,
  garage,
  images
  `;
  return estate;
}

export async function getEstateByUserId(id: number) {
  const [estate] = await sql<Estate[]>`
  SELECT
  estate.status,
  estate.year_built,
  estate.baths,
  estate.beds,
  estate.building_size,
  estate.price,
  estate.adress,
  estate.garage,
  estate.images
  FROM
    estate,
    users
  WHERE
    estate.user_id = users.id AND
    estate.user_id = ${id}

  `;
  return [estate];
}

export async function deleteEstateById(id: number) {
  const [estate] = await sql<Estate[]>`
  DELETE FROM
    estate
  WHERE
    id = ${id}
  RETURNING *
  `;
  return estate;
}

export async function getEstate() {
  const [estate] = await sql<Estate[]>`
SELECT
  *
FROM
  estate
`;
  return [estate];
}

export async function getEstateById(id: number) {
  const [estate] = await sql<Estate[]>`
  SELECT
    *
  FROM
    estate
  WHERE
    estate.id = ${id}
  `;
  return estate;
}

export async function updateEstateByid(
  id: number,
  status: string,
  baths: number,
  beds: number,
  buildingSize: number,
  price: number,
  adress: string,
) {
  const [estate] = await sql<Estate[]>`
  UPDATE
      estate
  SET
    status = ${status},
    baths = ${baths},
    beds = ${beds},
    building_size = ${buildingSize},
    price = ${price},
    adress = ${adress}
  WHERE
    id=${id}
  RETURNING *
  `;
  return estate;
}
