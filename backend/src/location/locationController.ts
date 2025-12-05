import { Request, Response } from "express"
import mysql from "mysql2/promise"
import config from "../config/config"

export const getLocations = async (_req: Request, res: Response) => {
  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        telephely_id          AS id,
        cim                   AS address,
        nyitvatartas          AS openingHours,
        max_kapacitas         AS maxCapacity,
        aktualis_kihasznaltsag AS currentUsage
      FROM Telephely
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

export const getLocationById = async (req: Request, res: Response) => {
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
        telephely_id          AS id,
        cim                   AS address,
        nyitvatartas          AS openingHours,
        max_kapacitas         AS maxCapacity,
        aktualis_kihasznaltsag AS currentUsage
      FROM Telephely
      WHERE telephely_id = ?
    `,
      [id]
    )) as Array<any>

    if (rows.length === 0) {
      return res.status(404).send("Nincs ilyen telephely")
    }
    res.status(200).send(rows[0])
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const createLocation = async (req: Request, res: Response) => {
  const { address, openingHours, maxCapacity, currentUsage } = req.body
  if (!address || !openingHours || !maxCapacity) {
    return res.status(400).send({
      error: 400,
      message: "address, openingHours, maxCapacity kötelező"
    })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Telephely (cim, nyitvatartas, max_kapacitas, aktualis_kihasznaltsag)
      VALUES (?, ?, ?, ?)
    `,
      [address, openingHours, maxCapacity, currentUsage ?? 0]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .send({ id: result.insertId, message: "Telephely létrehozva" })
    }
    res.status(500).send("Sikertelen telephely létrehozás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const updateLocation = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { address, openingHours, maxCapacity, currentUsage } = req.body

  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      UPDATE Telephely
      SET cim = ?, nyitvatartas = ?, max_kapacitas = ?, aktualis_kihasznaltsag = ?
      WHERE telephely_id = ?
    `,
      [address, openingHours, maxCapacity, currentUsage, id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(200).send("Telephely frissítve")
    }
    res.status(404).send("Nincs ilyen telephely")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const deleteLocation = async (req: Request, res: Response) => {
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
      DELETE FROM Telephely
      WHERE telephely_id = ?
    `,
      [id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    res.status(404).send("Nincs ilyen telephely")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}
