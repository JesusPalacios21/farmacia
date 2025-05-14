CREATE DATABASE farmacia;
USE farmacia;

CREATE TABLE medicamentos(
    id              INT AUTO_INCREMENT PRIMARY KEY, 
    tipo            ENUM(
                        'ANALGESICO', 'ANTIBIOTICO', 'ANTIINFLAMATORIO',
                        'ANTIHIPERTENSIVO', 'ANTIDIABETICO ORAL',
                        'ANTIHISTAMINICO', 'ANTICONCEPTIVO', 'ANTIDEPRESIVO',
                        'ANTIGRIPAL', 'INHIBIDOR DE ACIDEZ'
                    ),
    nombre          VARCHAR(120) NOT NULL,
    nomcomercial    VARCHAR(80) NULL,
    presentacion    ENUM('TABLETAS', 'CAPSULAS', 'JARABES', 'INYECTABLES', 'SUPOSITORIOS') NOT NULL,
    receta          ENUM('S', 'N') NOT NULL,
    precio          DECIMAL(7,2) NOT NULL
) ENGINE = INNODB;

INSERT INTO medicamentos (tipo, nombre, nomcomercial, presentacion, receta, precio) VALUES
('ANALGESICO', 'Paracetamol', 'Panadol', 'TABLETAS', 'N', 12.50),
('ANTIBIOTICO', 'Amoxicilina', 'Amoxicilina Genfar', 'CAPSULAS', 'S', 18.00),
('ANTIINFLAMATORIO', 'Ibuprofeno', 'Ibuprofeno Genfar', 'TABLETAS', 'N', 10.50),
('ANTIHIPERTENSIVO', 'Losartán', 'Losacor', 'TABLETAS', 'S', 30.00),
('ANTIDIABETICO ORAL', 'Metformina', 'Glucophage', 'TABLETAS', 'S', 22.00),
('ANTIHISTAMINICO', 'Loratadina', 'Loratadina Hersil', 'JARABES', 'N', 14.00),
('ANTICONCEPTIVO', 'Levonorgestrel', 'Levonorgestrel Bonapharm', 'TABLETAS', 'N', 20.00),
('ANTIDEPRESIVO', 'Sertralina', 'Sertralina Vita Pharma', 'TABLETAS', 'S', 45.00),
('ANTIGRIPAL', 'Clorfenamina + Paracetamol', 'Next', 'TABLETAS', 'N', 11.00),
('INHIBIDOR DE ACIDEZ', 'Omeprazol', 'Omepracid', 'CAPSULAS', 'N', 15.50),
('ANTIINFLAMATORIO', 'Diclofenaco', 'Voltaren', 'INYECTABLES', 'S', 9.50),
('ANALGESICO', 'Paracetamol', 'Paracetamol Genfar', 'SUPOSITORIOS', 'N', 7.80);

SELECT * FROM medicamentos;

DROP DATABASE farmacia;