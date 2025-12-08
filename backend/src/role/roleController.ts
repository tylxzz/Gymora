import { Request, Response } from "express"
import mysql from "mysql2/promise"
import config from "../config/config"

export const getRoles = async (_req: Request, res: Response) => {
  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        szerepkor_id    AS id,
        megnevezes      AS name
      FROM Szerepkor
    `
    )) as Array<any>
    res.status(200).send(rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}