const adminDbConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "panzerfaust",
    database: "watches_data"
};

export function getConfig (mode) {
    if (mode == "MYSQL2") {
        return {
            client: "mysql2",
            connection: adminDbConfig,
        }
    } else if (mode == "SQLITE3") {
        return {
            client: "sqlite3",
            connection: {filename: "./ecommerce.sqlite"},
            useNullAsDefault: true,
        }
    }
    
};