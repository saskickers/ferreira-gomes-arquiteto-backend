import express from "express";
import { mkdir } from "fs";
import { join } from "path";
import { imovelDTO, updateImovelDTO } from "./src/schemas/imovel.dto";
import { atualizarImovel } from "./src/usecases/atualizar-imovel.usecase";
import { criarImovel } from "./src/usecases/criar-imovel.usecase";
import { validateRequest } from "./src/utils/validateSchema.middleware";


const App = express()


App.use(express.json())

App.post('/imoveis', validateRequest(imovelDTO), async (req, res) => {

    const imovel = await new criarImovel().execute(req.body)
        .catch(e => {
            console.log("Error creating Imovel")
            return res.status(500).send(e)
        })
    
    return res.status(201).send(imovel)

})

App.put('/imoveis', validateRequest(updateImovelDTO), async (req, res) => {

    const imovel = await new atualizarImovel().execute(req.body)
        .catch(e => {
            console.log("Error updating Imovel")
            return res.status(500).send(e)
        })
    
    return res.status(201).send(imovel)

})

App.post('/test', async (req, res) => {

    mkdir(join(__dirname, 'public', 'images', req.body.a), e => {
        if (e) {
            return res.status(500).send(e)
        }
        return res.status(201).send('Diretório criado.')
    })
})

App.listen(3000)
