import { Request, Response } from "express"
import mysql from "mysql2/promise"
import config from "../config/config"

export const getMemberships = async (_req: Request, res: Response) => {
  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        berlet_id        AS id,
        felhasznalo_id   AS userId,
        tipus_id         AS typeId,
        vasarlas_datum   AS purchaseDate,
        ervenyes         AS expiryDate,
        allapot          AS status
      FROM Berlet
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

export const getMembershipById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        berlet_id        AS id,
        felhasznalo_id   AS userId,
        tipus_id         AS typeId,
        vasarlas_datum   AS purchaseDate,
        ervenyes         AS expiryDate,
        allapot          AS status
      FROM Berlet
      WHERE berlet_id = ?
    `,
      [id]
    )) as Array<any>

    if (rows.length === 0) {
      return res.status(404).send("Nincs ilyen bérlet")
    }
    res.status(200).send(rows[0])
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const createMembership = async (req: Request, res: Response) => {
  const { userId, typeId, purchaseDate, expiryDate, status } = req.body

  if (!userId || !typeId || !purchaseDate) {
    return res.status(400).send({
      error: 400,
      message: "userId, typeId, purchaseDate kötelező"
    })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Berlet
      (felhasznalo_id, tipus_id, vasarlas_datum, ervenyes, allapot)
      VALUES (?, ?, ?, ?, ?)
    `,
      [userId, typeId, purchaseDate, expiryDate ?? null, status ?? "aktív"]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .send({ id: result.insertId, message: "Bérlet létrehozva" })
    }
    res.status(500).send("Sikertelen bérlet létrehozás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}
