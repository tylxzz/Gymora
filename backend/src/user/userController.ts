import { Request, Response } from "express"
import mysql from "mysql2/promise"
import config from "../config/config"
import { User } from "./user"

export const getUsers = async (_req: Request, res: Response) => {
  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        felhasznalo_id              AS id,
        nev                         AS name,
        email                       AS email,
        telefon                     AS phone,
        szerepkor_id                AS roleId,
        szuletesi_datum             AS birthDate,
        lakcim                      AS address
      FROM Felhasznalo
    `
    )) as Array<any>

    const formatted = (rows as any[]).map((row) => ({
      ...row,
      birthDate: row.birthDate
        ? new Date(row.birthDate).toISOString().split("T")[0]
        : null
    }))

    res.status(200).send(formatted)
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const getUserById = async (req: Request, res: Response) => {
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
        felhasznalo_id              AS id,
        nev                         AS name,
        email                       AS email,
        telefon                     AS phone,
        szerepkor_id                AS roleId,
        szuletesi_datum             AS birthDate,
        lakcim                      AS address
      FROM Felhasznalo
      WHERE felhasznalo_id = ?
    `,
      [id]
    )) as Array<any>

    if (rows.length === 0) {
      return res.status(404).send("Nincs ilyen felhasználó")
    }

    const row = rows[0] as any
    const formatted = {
      ...row,
      birthDate: row.birthDate
        ? new Date(row.birthDate).toISOString().split("T")[0]
        : null
    }

    res.status(200).send(formatted)
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, phone, roleId, birthDate, address, password } = req.body

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ error: 400, message: "Hiányzó kötelező mezők (name, email, password)" })
  }

  const user = new User({ name, email, phone, roleId, birthDate, address })

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Felhasznalo 
      (nev, szuletesi_datum, email, telefon, lakcim, jelszo, szerepkor_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        user.name,
        user.birthDate ?? null,
        user.email,
        user.phone ?? "",
        user.address ?? "",
        password,
        user.roleId ?? 3
      ]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .send({ id: result.insertId, message: "Felhasználó létrehozva" })
    }
    res.status(500).send("Sikertelen felhasználó létrehozás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const { name, email, phone, roleId, birthDate, address } = req.body
  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      UPDATE Felhasznalo
      SET nev = ?, email = ?, telefon = ?, szerepkor_id = ?, 
          szuletesi_datum = ?, lakcim = ?
      WHERE felhasznalo_id = ?
    `,
      [name, email, phone, roleId, birthDate, address, id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(200).send("Felhasználó frissítve")
    }
    res.status(404).send("Nincs ilyen felhasználó")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `DELETE FROM Felhasznalo WHERE felhasznalo_id = ?`,
      [id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    res.status(404).send("Nincs ilyen felhasználó")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}