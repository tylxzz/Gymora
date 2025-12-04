import mysql from "mysql2/promise"
import jwt from "jsonwebtoken"
import config from "../config/config"

export const login = async (req: any, res: any) => {
  const { username, password } = req.body

  if (!(username && password)) {
    return res
      .status(400)
      .send({ error: "Nem megfelelően megadott adatok (username, password)!" })
  }

  const connection = await mysql.createConnection(config.database)
  try {
    const [rows] = (await connection.query(
      `
      SELECT 
        felhasznalo_id        AS id,
        nev                   AS name,
        email                 AS email,
        telefon               AS phone,
        szerepkor_id          AS roleId
      FROM Felhasznalo
      WHERE email = ? AND jelszo = ?
    `,
      [username, password]
    )) as Array<any>

    if (rows.length === 0) {
      return res
        .status(401)
        .send({ error: "Nem megfelelő felhasználónév vagy jelszó!" })
    }

    const user = rows[0]
    if (!config.jwtSecret) {
      return res.status(400).send({ error: "Hiba a titkos kulcsnál!" })
    }

    const token = jwt.sign(
      { id: user.id, roleId: user.roleId, email: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    )

    res.status(200).send({ token, expiresIn: 3600 })
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: "Szerver hiba a bejelentkezéskor!" })
  } finally {
    await connection.end()
  }
}

export const logout = async (_req: any, res: any) => {

  res.status(200).send({ message: "Sikeres kijelentkezés" })
}
