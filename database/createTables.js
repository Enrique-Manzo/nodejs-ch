import { SQLClientAdmin as knex } from "./SQLClient.js";

knex.schema.hasTable("watches")
    .then(exists => {
        if (!exists) {
            knex.schema.createTable("watches", table => {
                table.integer("id"),
                table.string("watch_name"),
                table.float("price"),
                table.string("tag"),
                table.string("image"),
                table.boolean("featured"),
                table.integer("stock"),
                table.string("watch_description")
            })
            .then(()=>{console.log("The watches table has been created.")})
        } else {
            console.log("The watches table has already been created. No changes made.")
        }
    })
    .finally(()=> {
        knex.destroy()
    })


knex.schema.hasTable("messages")
.then(exists => {
    if (!exists) {
        knex.schema.createTable("messages", table => {
            table.string("chat_user"),
            table.string("chat_text")
        }).then(()=>{console.log("The messages table has been created.")})
    } else {
        console.log("The messages table has already been created. No changes made.")
    }
})
.finally(()=> {
    knex.destroy()
})
