import { Request, Response } from "express"
import mysql from "mysql2/promise"
import config from "../config/config"

export const getBookings = async (req: Request, res: Response) => {
  const { userId, trainerId } = req.query

  const conditions: string[] = []
  const params: any[] = []

  if (userId) {
    conditions.push("f.felhasznalo_id = ?")
    params.push(parseInt(userId as string))
  }
  if (trainerId) {
    conditions.push("f.edzo_id = ?")
    params.push(parseInt(trainerId as string))
  }

  let where = ""
  if (conditions.length > 0) {
    where = "WHERE " + conditions.join(" AND ")
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        foglalas_id    AS id,
        felhasznalo_id AS userId,
        edzo_id        AS trainerId,
        telephely_id   AS locationId,
        datum          AS date,
        statusz        AS status
      FROM Foglalas f
      ${where}
    `,
      params
    )) as Array<any>

    res.status(200).send(rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const getBookingById = async (req: Request, res: Response) => {
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
        foglalas_id    AS id,
        felhasznalo_id AS userId,
        edzo_id        AS trainerId,
        telephely_id   AS locationId,
        datum          AS date,
        statusz        AS status
      FROM Foglalas f
      WHERE foglalas_id = ?
    `,
      [id]
    )) as Array<any>

    if (rows.length === 0) {
      return res.status(404).send("Nincs ilyen foglalás")
    }
    res.status(200).send(rows[0])
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const createBooking = async (req: Request, res: Response) => {
  const { userId, trainerId, locationId, date, status } = req.body

  if (!userId || !trainerId || !locationId || !date) {
    return res.status(400).send({
      error: 400,
      message: "userId, trainerId, locationId, date kötelező"
    })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Foglalas
      (felhasznalo_id, edzo_id, telephely_id, datum, statusz)
      VALUES (?, ?, ?, ?, ?)
    `,
      [userId, trainerId, locationId, date, status ?? "aktív"]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .send({ id: result.insertId, message: "Foglalás létrehozva" })
    }
    res.status(500).send("Sikertelen foglalás létrehozás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const updateBooking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { userId, trainerId, locationId, date, status } = req.body

  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      UPDATE Foglalas
      SET felhasznalo_id = ?, edzo_id = ?, telephely_id = ?, datum = ?, statusz = ?
      WHERE foglalas_id = ?
    `,
      [userId, trainerId, locationId, date, status, id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(200).send("Foglalás frissítve")
    }
    res.status(404).send("Nincs ilyen foglalás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const deleteBooking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      DELETE FROM Foglalas
      WHERE foglalas_id = ?
    `,
      [id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    res.status(404).send("Nincs ilyen foglalás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}
