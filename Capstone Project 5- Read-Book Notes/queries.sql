CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	author VARCHAR(255),
	rating INTEGER CHECK (rating >=1 AND rating <= 5),
	notes TEXT,
	date_read DATE,
	ISBN INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

