CREATE DATABASE IF NOT EXISTS gymora
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_hungarian_ci;

USE gymora;

-- =========================
-- ALAPTÁBLÁK
-- =========================

CREATE TABLE Szerepkor (
  szerepkor_id INT AUTO_INCREMENT PRIMARY KEY,
  megnevezes VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Tipus (
  tipus_id INT AUTO_INCREMENT PRIMARY KEY,
  tipus VARCHAR(50) NOT NULL,
  ar INT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Szakterulet (
  szakterulet_id INT AUTO_INCREMENT PRIMARY KEY,
  nev VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Telephely (
  telephely_id INT AUTO_INCREMENT PRIMARY KEY,
  cim VARCHAR(255) NOT NULL,
  nyitvatartas VARCHAR(50) NOT NULL,
  max_kapacitas INT NOT NULL,
  aktualis_kihasznaltsag INT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Felhasznalo (
  felhasznalo_id INT AUTO_INCREMENT PRIMARY KEY,
  nev VARCHAR(100) NOT NULL,
  szuletesi_datum DATE,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefon VARCHAR(50),
  lakcim VARCHAR(255),
  jelszo VARCHAR(255) NOT NULL,
  szerepkor_id INT NOT NULL,
  FOREIGN KEY (szerepkor_id)
    REFERENCES Szerepkor(szerepkor_id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE Edzo (
  edzo_id INT AUTO_INCREMENT PRIMARY KEY,
  felhasznalo_id INT NOT NULL,
  bemutatkozas VARCHAR(255),
  FOREIGN KEY (felhasznalo_id)
    REFERENCES Felhasznalo(felhasznalo_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- KAPCSOLÓ / TRANZAKCIÓS
-- =========================

CREATE TABLE Bejelentkezes (
  bejelentkezes_id INT AUTO_INCREMENT PRIMARY KEY,
  felhasznalo_id INT NOT NULL,
  felhasznalonev VARCHAR(100) NOT NULL,
  bejelentkezes_idopont DATETIME NOT NULL,
  FOREIGN KEY (felhasznalo_id)
    REFERENCES Felhasznalo(felhasznalo_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Berlet (
  berlet_id INT AUTO_INCREMENT PRIMARY KEY,
  felhasznalo_id INT NOT NULL,
  tipus_id INT NOT NULL,
  vasarlas_datum DATE NOT NULL,
  ervenyes DATE,
  allapot VARCHAR(20) NOT NULL,
  FOREIGN KEY (felhasznalo_id)
    REFERENCES Felhasznalo(felhasznalo_id)
    ON DELETE CASCADE,
  FOREIGN KEY (tipus_id)
    REFERENCES Tipus(tipus_id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE Edzo_Szakterulet (
  edzo_id INT NOT NULL,
  szakterulet_id INT NOT NULL,
  oradij INT NOT NULL,
  PRIMARY KEY (edzo_id, szakterulet_id),
  FOREIGN KEY (edzo_id)
    REFERENCES Edzo(edzo_id)
    ON DELETE CASCADE,
  FOREIGN KEY (szakterulet_id)
    REFERENCES Szakterulet(szakterulet_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Edzo_Telephely (
  edzo_id INT NOT NULL,
  telephely_id INT NOT NULL,
  PRIMARY KEY (edzo_id, telephely_id),
  FOREIGN KEY (edzo_id)
    REFERENCES Edzo(edzo_id)
    ON DELETE CASCADE,
  FOREIGN KEY (telephely_id)
    REFERENCES Telephely(telephely_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Foglalas (
  foglalas_id INT AUTO_INCREMENT PRIMARY KEY,
  felhasznalo_id INT NOT NULL,
  edzo_id INT NOT NULL,
  telephely_id INT NOT NULL,
  datum DATETIME NOT NULL,
  statusz VARCHAR(20) NOT NULL,
  FOREIGN KEY (felhasznalo_id)
    REFERENCES Felhasznalo(felhasznalo_id)
    ON DELETE CASCADE,
  FOREIGN KEY (edzo_id)
    REFERENCES Edzo(edzo_id)
    ON DELETE CASCADE,
  FOREIGN KEY (telephely_id)
    REFERENCES Telephely(telephely_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- DEMÓ ADATOK
-- =========================

INSERT INTO Szerepkor (szerepkor_id, megnevezes) VALUES
(1, 'Adminisztrátor'),
(2, 'Edző'),
(3, 'Vendég');

INSERT INTO Felhasznalo 
(felhasznalo_id, nev, szuletesi_datum, email, telefon, lakcim, jelszo, szerepkor_id) VALUES
(1, 'Kiss Péter', '1990-05-12', 'kiss.péter@gmail.com', '+36 30 9258870', 'Budapest, 19. kerület', 'jelszo', 1),
(2, 'Nagy Anna', '1988-03-24', 'nagy.anna@gmail.com', '+36 30 8370529', 'Budapest, 7. kerület', 'jelszo', 2),
(3, 'Szabó Gábor', '1995-07-19', 'szabó.gábor@gmail.com', '+36 30 3386465', 'Budapest, 2. kerület', 'jelszo', 2),
(4, 'Tóth Eszter', '1992-01-08', 'tóth.eszter@gmail.com', '+36 30 1064132', 'Budapest, 10. kerület', 'jelszo', 3),
(5, 'Kovács Dániel', '1998-11-02', 'kovács.dániel@gmail.com', '+36 30 3595892', 'Budapest, 14. kerület', 'jelszo', 3),
(6, 'Varga Zsófia', '1999-09-14', 'varga.zsófia@gmail.com', '+36 30 2996495', 'Budapest, 3. kerület', 'jelszo', 3),
(7, 'Balogh László', '1987-04-17', 'balogh.lászló@gmail.com', '+36 30 2656370', 'Budapest, 19. kerület', 'jelszo', 3),
(8, 'Farkas Katalin', '2000-06-21', 'farkas.katalin@gmail.com', '+36 30 3032165', 'Budapest, 20. kerület', 'jelszo', 3),
(9, 'Molnár Bence', '2001-12-05', 'molnár.bence@gmail.com', '+36 30 6924355', 'Budapest, 19. kerület', 'jelszo', 2),
(10, 'Papp Nóra', '1993-10-30', 'papp.nóra@gmail.com', '+36 30 9585045', 'Budapest, 18. kerület', 'jelszo', 3);

INSERT INTO Bejelentkezes 
(bejelentkezes_id, felhasznalo_id, felhasznalonev, bejelentkezes_idopont) VALUES
(1, 1, 'kiss.peter', '2025-11-06 07:45:00'),
(2, 9, 'molnar.bence', '2025-11-06 09:10:00'),
(3, 4, 'toth.eszter', '2025-11-06 10:02:00'),
(4, 8, 'farkas.katalin', '2025-11-06 11:48:00'),
(5, 3, 'szabo.gabor', '2025-11-06 12:05:00'),
(6, 7, 'balogh.laszlo', '2025-11-06 14:25:00'),
(7, 5, 'kovacs.daniel', '2025-11-06 15:40:00'),
(8, 8, 'farkas.katalin', '2025-11-06 17:03:00'),
(9, 9, 'molnar.bence', '2025-11-06 18:15:00'),
(10, 2, 'nagy.anna', '2025-11-06 19:40:00');

INSERT INTO Tipus (tipus_id, tipus, ar) VALUES
(1, 'Napijegy', 2500),
(2, '10 alkalmas', 15000),
(3, 'Havi', 20000),
(4, 'Negyedéves', 50000),
(5, 'Éves', 160000);

INSERT INTO Berlet 
(berlet_id, felhasznalo_id, tipus_id, vasarlas_datum, ervenyes, allapot) VALUES
(1, 10, 2, '2024-01-22', '2024-04-21', 'lejárt'),
(2, 4, 3, '2025-01-17', '2025-02-16', 'lejárt'),
(3, 8, 4, '2024-05-30', '2024-08-28', 'lejárt'),
(4, 5, 4, '2025-07-30', '2025-10-28', 'lejárt'),
(5, 8, 4, '2024-04-13', '2024-07-12', 'lejárt'),
(6, 10, 4, '2024-12-26', '2025-03-26', 'lejárt'),
(7, 5, 3, '2025-01-22', '2025-02-21', 'lejárt'),
(8, 6, 5, '2024-01-18', '2025-01-17', 'lejárt'),
(9, 6, 2, '2024-03-21', '2024-06-19', 'lejárt'),
(10, 4, 5, '2025-04-20', '2026-04-20', 'aktív');

INSERT INTO Szakterulet (szakterulet_id, nev) VALUES
(1, 'Személyi edzés'),
(2, 'CrossFit'),
(3, 'Jóga'),
(4, 'Pilates'),
(5, 'Kardió'),
(6, 'Súlyzós edzés'),
(7, 'Funkcionális edzés');

INSERT INTO Edzo (edzo_id, felhasznalo_id, bemutatkozas) VALUES
(1, 2, 'Tapasztalt edző'),
(2, 3, 'Tapasztalt edző'),
(3, 9, 'Tapasztalt edző');

INSERT INTO Telephely 
(telephely_id, cim, nyitvatartas, max_kapacitas, aktualis_kihasznaltsag) VALUES
(1, 'Budapest, Rákóczi út 12.', '06:00-22:00', 100, 55),
(2, 'Győr, Baross Gábor út 5.', '06:00-22:00', 80, 59),
(3, 'Debrecen, Piac utca 33.', '06:00-22:00', 120, 42);

INSERT INTO Edzo_Szakterulet (edzo_id, szakterulet_id, oradij) VALUES
(1, 2, 9000),
(1, 7, 9500),
(2, 3, 8500),
(2, 4, 8700),
(3, 1, 10000),
(3, 5, 9200),
(3, 6, 8000);

INSERT INTO Edzo_Telephely (edzo_id, telephely_id) VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(3, 3);

INSERT INTO Foglalas 
(foglalas_id, felhasznalo_id, edzo_id, telephely_id, datum, statusz) VALUES
(1, 1, 1, 1, '2025-09-03 13:00:00', 'lezajlott'),
(2, 4, 2, 2, '2025-10-09 15:00:00', 'törölt'),
(3, 4, 2, 2, '2025-03-01 17:00:00', 'lezajlott'),
(4, 6, 2, 2, '2025-07-04 13:00:00', 'törölt'),
(5, 1, 3, 2, '2025-08-08 15:00:00', 'lezajlott'),
(6, 4, 3, 3, '2025-08-05 18:00:00', 'törölt'),
(7, 7, 1, 1, '2025-05-14 13:00:00', 'aktív'),
(8, 8, 3, 3, '2025-07-11 11:00:00', 'aktív'),
(9, 7, 2, 2, '2025-02-16 08:00:00', 'aktív'),
(10, 5, 1, 1, '2025-12-11 14:00:00', 'aktív');


