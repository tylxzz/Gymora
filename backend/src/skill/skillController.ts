import { Request, Response } from "express"
import mysql from "mysql2/promise"
import config from "../config/config"

export const getSkills = async (_req: Request, res: Response) => {
  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        szakterulet_id   AS id,
        nev              AS name
      FROM Szakterulet
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

export const getSkillById = async (req: Request, res: Response) => {
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
        szakterulet_id   AS id,
        nev              AS name
      FROM Szakterulet
      WHERE szakterulet_id = ?
    `,
      [id]
    )) as Array<any>

    if (rows.length === 0) {
      return res.status(404).send("Nincs ilyen szakterület")
    }
    res.status(200).send(rows[0])
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const createSkill = async (req: Request, res: Response) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).send({ error: 400, message: "Név kötelező!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Szakterulet (nev)
      VALUES (?)
    `,
      [name]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .send({ id: result.insertId, message: "Szakterület létrehozva" })
    }
    res.status(500).send("Sikertelen létrehozás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const updateSkill = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { name } = req.body

  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }
  if (!name) {
    return res.status(400).send({ error: 400, message: "Név kötelező!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      UPDATE Szakterulet
      SET nev = ?
      WHERE szakterulet_id = ?
    `,
      [name, id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(200).send("Szakterület frissítve")
    }
    res.status(404).send("Nincs ilyen szakterület")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const deleteSkill = async (req: Request, res: Response) => {
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
      DELETE FROM Szakterulet 
      WHERE szakterulet_id = ?
    `,
      [id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    res.status(404).send("Nincs ilyen szakterület")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}
