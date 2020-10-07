const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./wsd.db') //creating a new object, pull the database function saying where the file is in the folder

db.serialize(function(){
    //create the table
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    //insert data into the table
    /*
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?, ?, ?, ?, ?);
    `

    const values = [
        "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        "Programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consectetur maxime optio eum natus molestiae aliquam voluptas ipsam, architecto labore voluptates. Id consequuntur minus autem ullam aliquid harum molestias nobis!",
        "https://rocketseat.com.br"
    ]
    
    db.run(query, values, function(err){
        if(err) return console.log(err)

        console.log(this)
    } )
    */

    //delete data in the table
    /*
    db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
        if(err) return console.log(err)

        console.log("Deleted", this)
    })
    */

    //query data in the table
    /*
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) return console.log(err)

        console.log(rows)
    })
    */
})

module.exports = db