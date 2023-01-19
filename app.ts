import express from "express";
import { imovelDTO } from "./src/schemas/imovel.dto";
import { criarImovel } from "./src/usecases/criar-imovel.usecase";
import { validateRequest } from "./src/utils/validateSchema.middleware";


const App = express()


App.use(express.json())

App.post('/imoveis', validateRequest(imovelDTO), async (req, res) => {

    const imovel = await new criarImovel().execute(req.body)
        .catch(e => {
            return res.status(500).send(e)
        })
    
    return res.status(201).send(imovel)

})

App.listen(3000)
