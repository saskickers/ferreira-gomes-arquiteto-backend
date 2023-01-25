import express from "express";
import { mkdir } from "fs";
import { join } from "path";
import { imovelDTO, updateImovelDTO } from "./src/schemas/imovel.dto";
import { atualizarImovel } from "./src/usecases/atualizar-imovel.usecase";
import { criarImovel } from "./src/usecases/criar-imovel.usecase";
import { validateRequest } from "./src/utils/validateSchema.middleware";
import multer from 'multer'
import { receivePictures } from "./src/utils/receiveImages.middleware";

const App = express()


App.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');

    res.setHeader('Access-Control-Allow-Headers', '*')

    
    
    next();
});

App.use(express.json())

App.use(express.urlencoded({extended: true}))

App.post('/imoveis', receivePictures, validateRequest(imovelDTO), async (req, res) => {

    console.log(req.body)

    const imovel = await new criarImovel().execute(req.body, req.filesPath!)
        .catch(e => {
            console.log("Error creating Imovel")
            return res.status(500).send(e)
        })
    
    console.log(req.filesPath)
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

App.post('/test', receivePictures, async (req, res) => {

    
    console.log(req.files)

    res.status(200).send({
        ...req.body,
        ...req.files
    })


    // mkdir(join(__dirname, 'public', 'images', req.body.a), e => {
    //     if (e) {
    //         return res.status(500).send(e)
    //     }
    //     return res.status(201).send('Diretório criado.')
    // })
})

App.listen(3000, ()=>{
    console.log('listening')
})
