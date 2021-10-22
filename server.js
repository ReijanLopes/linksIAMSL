const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
// const { response } = require('express');


const server = express();

server.set('views', './src/views')
server.set('view engine', 'ejs')

server.use(express.static(__dirname + "/public"));



const token = process.env.DATO_TOKEN;
const PORT =  process.env.PORT;

async function getAPIdata(){

    let dados;
    const hd = { headers:{'Authorization':  `Bearer ${token}`,}};

    const Bd = JSON.stringify({
        query: `{
            allLinks {
            id
            nameLink
            url
            icon {
                iconName
                }
            }
                              
            }`
            });

  
            await axios.post('https://graphql.datocms.com/', Bd, hd).then(response => {dados = response.data.data })
            return dados
    }



server.get('/', async (req, res) => {

    const data = await getAPIdata()


    res.render("home", {data})

})


server.listen(PORT || 3001, () => {
    console.log(`Server Running on ${PORT || 3001}`);
})

