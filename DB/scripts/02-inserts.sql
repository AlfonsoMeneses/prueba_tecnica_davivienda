/*Cambio al schema*/
SET search_path TO prueba_tecnica;

/* Eliminando toda la data , si existe*/
TRUNCATE TABLE users, roles RESTART IDENTITY CASCADE;

/* Creando los tipos de usuarios*/
INSERT INTO roles(code, name)
	   VALUES('INTERNAL','Internal User'),
			 ('CLIENT','Client User');

/* Creando usuario administrador */
INSERT INTO users(
					  email, 
					  name,
					  last_name,
					  password,
					  role_id
					)
		 VALUES(
				'alfonsomenesesm@gmail.com',
				'Alfonso',
				'Meneses',
				'',
				(SELECT id_role FROM roles WHERE code = 'INTERNAL')
			);
