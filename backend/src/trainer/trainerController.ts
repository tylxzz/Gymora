import { Request, Response } from "express"
import mysql from "mysql2/promise"
import config from "../config/config"

export const getTrainers = async (_req: Request, res: Response) => {
  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        e.edzo_id           AS id,
        e.felhasznalo_id    AS userId,
        e.bemutatkozas      AS bio
      FROM Edzo e
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

export const getTrainerById = async (req: Request, res: Response) => {
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
        e.edzo_id           AS id,
        e.felhasznalo_id    AS userId,
        e.bemutatkozas      AS bio
      FROM Edzo e
      WHERE e.edzo_id = ?
    `,
      [id]
    )) as Array<any>

    if (rows.length === 0) {
      return res.status(404).send("Nincs ilyen edző")
    }

    res.status(200).send(rows[0])
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const createTrainer = async (req: Request, res: Response) => {
  const { userId, bio } = req.body
  if (!userId) {
    return res
      .status(400)
      .send({ error: 400, message: "userId kötelező edző létrehozásához" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Edzo (felhasznalo_id, bemutatkozas)
      VALUES (?, ?)
    `,
      [userId, bio ?? "Tapasztalt edző"]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .send({ id: result.insertId, message: "Edző létrehozva" })
    }
    res.status(500).send("Sikertelen edző létrehozás")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const updateTrainer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { userId, bio } = req.body
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      UPDATE Edzo
      SET felhasznalo_id = ?, bemutatkozas = ?
      WHERE edzo_id = ?
    `,
      [userId, bio, id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(200).send("Edző frissítve")
    }
    res.status(404).send("Nincs ilyen edző")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const deleteTrainer = async (req: Request, res: Response) => {
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
      DELETE FROM Edzo
      WHERE edzo_id = ?
    `,
      [id]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    res.status(404).send("Nincs ilyen edző")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

// --------- TRAINER SKILLS: Edzo_Szakterulet ---------

export const getTrainerSkills = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id) // trainerId
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
        es.edzo_id        AS trainerId,
        es.szakterulet_id AS skillId,
        es.oradij         AS hourlyRate
      FROM Edzo_Szakterulet es
      WHERE es.edzo_id = ?
    `,
      [id]
    )) as Array<any>

    res.status(200).send(rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const addTrainerSkill = async (req: Request, res: Response) => {
  const trainerId = parseInt(req.params.id)
  const { skillId, hourlyRate } = req.body

  if (isNaN(trainerId)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }
  if (!skillId || !hourlyRate) {
    return res
      .status(400)
      .send({ error: 400, message: "skillId és hourlyRate kötelező" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Edzo_Szakterulet (edzo_id, szakterulet_id, oradij)
      VALUES (?, ?, ?)
    `,
      [trainerId, skillId, hourlyRate]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(201).send("Szakterület hozzárendelve az edzőhöz")
    }
    res.status(500).send("Sikertelen szakterület-hozzárendelés")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const deleteTrainerSkill = async (req: Request, res: Response) => {
  const trainerId = parseInt(req.params.trainerId)
  const skillId = parseInt(req.params.skillId)

  if (isNaN(trainerId) || isNaN(skillId)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás azonosítók!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      DELETE FROM Edzo_Szakterulet
      WHERE edzo_id = ? AND szakterulet_id = ?
    `,
      [trainerId, skillId]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    res.status(404).send("Nincs ilyen edző-szakterület kapcsolat")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

// --------- TRAINER LOCATIONS: Edzo_Telephely ---------

export const getTrainerLocations = async (req: Request, res: Response) => {
  const trainerId = parseInt(req.params.id)
  if (isNaN(trainerId)) {
    return res
      .status(400)
      .send({ error: 103, message: "Hibás formátumú azonosító!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        et.edzo_id        AS trainerId,
        et.telephely_id   AS locationId
      FROM Edzo_Telephely et
      WHERE et.edzo_id = ?
    `,
      [trainerId]
    )) as Array<any>

    res.status(200).send(rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const addTrainerLocation = async (req: Request, res: Response) => {
  const trainerId = parseInt(req.params.id)
  const { locationId } = req.body
  if (isNaN(trainerId) || !locationId) {
    return res.status(400).send({
      error: 400,
      message: "trainerId érvénytelen vagy hiányzik a locationId"
    })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      INSERT INTO Edzo_Telephely (edzo_id, telephely_id)
      VALUES (?, ?)
    `,
      [trainerId, locationId]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(201).send("Telephely hozzárendelve az edzőhöz")
    }
    res.status(500).send("Sikertelen hozzárendelés")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}

export const deleteTrainerLocation = async (req: Request, res: Response) => {
  const trainerId = parseInt(req.params.trainerId)
  const locationId = parseInt(req.params.locationId)

  if (isNaN(trainerId) || isNaN(locationId)) {
    return res.status(400).send({
      error: 400,
      message: "trainerId vagy locationId hibás"
    })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [result] = (await connection.query(
      `
      DELETE FROM Edzo_Telephely
      WHERE edzo_id = ? AND telephely_id = ?
    `,
      [trainerId, locationId]
    )) as Array<any>

    if (result.affectedRows > 0) {
      return res.status(204).send()
    }
    res.status(404).send("Nincs ilyen edző-telephely kapcsolat")
  } catch (e) {
    console.log(e)
    res.status(500).send("Szerver hiba")
  } finally {
    await connection.end()
  }
}
