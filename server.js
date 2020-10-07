//I used express to create and configure my server
const express = require("express")
const server = express()

const db = require("./db")

/*
const ideas = [
    {
        image: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
        title: "Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consectetur maxime optio eum natus molestiae aliquam voluptas ipsam, architecto labore voluptates. Id consequuntur minus autem ullam aliquid harum molestias nobis!",
        url: "https://rocketseat.com.br"
    },
    {
        image: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consectetur maxime optio eum natus molestiae aliquam voluptas ipsam, architecto labore voluptates. Id consequuntur minus autem ullam aliquid harum molestias nobis!",        
        url: "https://rocketseat.com.br"
    },
    {
        image: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consectetur maxime optio eum natus molestiae aliquam voluptas ipsam, architecto labore voluptates. Id consequuntur minus autem ullam aliquid harum molestias nobis!",        
        url: "https://rocketseat.com.br"
    },
    {
        image: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consectetur maxime optio eum natus molestiae aliquam voluptas ipsam, architecto labore voluptates. Id consequuntur minus autem ullam aliquid harum molestias nobis!",        
        url: "https://rocketseat.com.br"
    },

]
*/

//configure static files(css, scripts, images)
server.use(express.static("public"))

//enable use of req body
server.use(express.urlencoded({extended: true}))

//configuring nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//I created a route 
//and capture the customer’s request to respond
server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        //limit ideas on the index page
        const reversedIdeas = [...rows].reverse() //creating array and spreading the content of ideas applying reverse

        let lastIdeas = []

        for(let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", {ideas: lastIdeas})
    })

})

server.get("/ideas", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse() //creating array and spreading the content of ideas applying reverse

        return res.render("ideas.html", {ideas: reversedIdeas})
    })
})

server.post("/", function(req, res){
    //insert data into the table
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
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    
    db.run(query, values, function(err){
        if(err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideas")
    })
    
})

//I turned on my server on port 3000
server.listen(3000)