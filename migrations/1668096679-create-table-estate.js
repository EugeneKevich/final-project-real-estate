exports.up = async (sql) => {
  await sql`
  CREATE TABLE estate (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    status varchar (50) NOT NULL ,
    year_built integer NOT NULL ,
    baths integer NOT NULL,
    beds integer NOT NULL,
    building_size integer NOT NULL,
    price integer NOT NULL,
    adress varchar (250) NOT NULL,
    garage integer NOT NULL,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    images varchar (150)
  )`;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE estate
  `;
};
