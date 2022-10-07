const express = require('express')
const app = express()
const Contenedor = require('./containers/productos')

const contenedor = new Contenedor()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.set('views', './views');
app.set('view engine', 'pug');


app.post('/productos', (req, res) => {
    const producto = req.body
    contenedor.save(producto)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = contenedor.getAll()

    res.render("productos", {
        productos: prods,
        hayProductos: prods.length
    });
});

//Running server

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
