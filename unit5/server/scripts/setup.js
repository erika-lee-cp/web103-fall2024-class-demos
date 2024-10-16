import { pool } from '../config/database.js';

const createTables = async () => {
    try {
        console.log('dropping tables...');
        const dropTablesQuery = `
            DROP TABLE IF EXISTS appointments;
            DROP TABLE IF EXISTS customers;
            DROP TABLE IF EXISTS stylists_hair_styles;            
            DROP TABLE IF EXISTS hair_styles;
            DROP TABLE IF EXISTS stylists;
        `;
        await pool.query(dropTablesQuery);

        console.log('recreating tables...');
        const createStylesQuery = `
            CREATE TABLE IF NOT EXISTS hair_styles (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );`;
        const createStylistsQuery = `
            CREATE TABLE IF NOT EXISTS stylists (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );`;
        const createStylistsStylesQuery = `
            CREATE TABLE IF NOT EXISTS stylists_hair_styles (
                stylist_id INT NOT NULL,
                hair_style_id INT NOT NULL,

                PRIMARY KEY (stylist_id, hair_style_id),
                FOREIGN KEY (stylist_id) REFERENCES stylists(id) ON DELETE CASCADE,
                FOREIGN KEY (hair_style_id) REFERENCES hair_styles(id) ON DELETE CASCADE
            );`;
        const createCustomersQuery = `
            CREATE TABLE IF NOT EXISTS customers (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );`;
        const createAppointmentsQuery = `
            CREATE TABLE IF NOT EXISTS appointments (
                id SERIAL PRIMARY KEY,
                date_time TIMESTAMP,
                customer_id INT NOT NULL,
                stylist_id INT NOT NULL,

                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
                FOREIGN KEY (stylist_id) REFERENCES stylists(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createStylesQuery);
        console.log("created styles");

        await pool.query(createStylistsQuery);
        console.log("created stylists");

        await pool.query(createStylistsStylesQuery);
        console.log("created styles stylists relation table");

        await pool.query(createCustomersQuery);
        console.log("created customers");

        await pool.query(createAppointmentsQuery);
        console.log("created appointments");
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        console.log("adding initial data...");
        const insertQuery = `
        INSERT INTO customers (id, name) VALUES (1, 'Arya');
        INSERT INTO customers (id, name) VALUES (2, 'Katniss');
        INSERT INTO customers (id, name) VALUES (3, 'Gandalf');
        INSERT INTO customers (id, name) VALUES (4, 'Hermione');
        INSERT INTO customers (id, name) VALUES (5, 'Barnaby');

        INSERT INTO stylists (id, name) VALUES (1, 'Syrio');
        INSERT INTO stylists (id, name) VALUES (2, 'Cinna');
        INSERT INTO stylists (id, name) VALUES (3, 'Frodo');
        INSERT INTO stylists (id, name) VALUES (4, 'Minerva');
        INSERT INTO stylists (id, name) VALUES (5, 'Tiger');

        INSERT INTO hair_styles (id, name) VALUES (1, 'Pixie');
        INSERT INTO hair_styles (id, name) VALUES (2, 'Mullet');
        INSERT INTO hair_styles (id, name) VALUES (3, 'Layered');
        INSERT INTO hair_styles (id, name) VALUES (4, 'Fade');
        INSERT INTO hair_styles (id, name) VALUES (5, 'Crew');

        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (1, 1);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (1, 2);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (1, 3);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (1, 4);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (1, 5);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (2, 1);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (2, 2);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (3, 4);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (3, 5);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (4, 1);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (4, 2);
        INSERT INTO stylists_hair_styles (stylist_id, hair_style_id) VALUES (4, 3);

        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-20 10:00:00', 1, 1);
        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-21 14:30:00', 1, 2);
        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-22 09:15:00', 1, 3);
        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-23 16:45:00', 2, 4);
        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-24 11:30:00', 3, 5);
        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-24 16:45:00', 3, 2);
        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-25 09:30:00', 4, 5);
        INSERT INTO appointments (date_time, customer_id, stylist_id) VALUES ('2024-10-25 11:15:00', 5, 5);
        `;
        await pool.query(insertQuery);
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await createTables();
    await insertData();
}

setup();
