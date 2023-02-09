import express from "express";
import { mkdir } from "fs";
import { join } from "path";
import { criarImovelDTO, parseToNumber, updateImovelDTO } from "./src/schemas/imovel.dto";
import { atualizarImovel } from "./src/usecases/imoveis/atualizar-imovel.usecase";
import { criarImovel } from "./src/usecases/imoveis/criar-imovel.usecase";
import { validateRequest } from "./src/utils/validateSchema.middleware";
import multer from 'multer'
import { receivePictures } from "./src/utils/receiveImages.middleware";
import { findImovel } from "./src/usecases/imoveis/find-imovel.usecase";
import { deletarImovel } from "./src/usecases/imoveis/deletar-imovel.usecase";
import { z } from "zod";

const App = express()


App.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');

    res.setHeader('Access-Control-Allow-Headers', '*')



    next();
});

App.use(express.json())

App.use(express.urlencoded({ extended: true }))

App.use(express.static('./public'))

App.post('/imoveis', receivePictures, validateRequest(criarImovelDTO), async (req, res) => {

    console.log(req.body)
    console.log(req.files)
    console.log(req.filesPath)
    console.log(req.folderPath)

    const imovel = await new criarImovel().execute(req.body, req.filesPath!)
        .catch(e => {
            console.log(e)
            return res.status(500).send('Houve um erro ao criar o imovel')
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

App.get('/imoveis', async (req, res) => {

    const imoveis = await new findImovel().findAll()
        .catch(e => {
            res.sendStatus(500)
        })

    res.status(200).send(imoveis)

})

App.delete('/imoveis/:id', async (req, res) => {

    const id = z.preprocess(parseToNumber, z.number()).safeParse(req.params.id)

    if (!id.success) {
        return res.sendStatus(400)
    }

    console.log('Deleting imovel id: ', id.data)

    const deletedImovel = await new deletarImovel().execute(id.data)
        .catch(e => {
            return res.status(500).send(e)
        })

    if (!deletedImovel) {
        return res.status(404).send('ID not found.')
    }

    return res.status(200).send(deletedImovel)

    
})

App.listen(3000, () => {
    console.log('listening')
})
