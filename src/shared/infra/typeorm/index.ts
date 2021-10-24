import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

export default async (host = "database-boilerplate-node"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? 'boilerplate-node-test' : defaultOptions.database,
      port: process.env.NODE_ENV === 'test' ? 9001 : 5432,
    })
  )
}