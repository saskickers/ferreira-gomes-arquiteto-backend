import { createHash, randomUUID } from "crypto"
import { NextFunction, Request, Response } from "express"
import { mkdir, mkdirSync, rm, rmdir } from "fs"
import multer, { Multer } from "multer"
import { Database } from "./prismaInit"

declare global {
    namespace Express {
        interface Request {
            filesPath?: string[],
            folderPath?: string
        }
    }
}

export async function receivePictures(req: Request, res: Response, next: NextFunction) {

    console.log(req.body)

    if (!req.is('multipart/form-data')) {
        return res.status(400).send('Wrong application type. Only MULTIPART/FORM-DATA accepted.')
    }


    const folderId = randomUUID()

    const imagesPath = `public/images/${folderId}`


    const storage = multer.diskStorage({

        destination: async function (req, file, cb) {
            cb(null, await createDir(imagesPath))
        },

        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })

    const receiveIMG = multer({ storage: storage }).array('fotos')

    receiveIMG(req, res, err => {

        if (err) {
            deleteDir(imagesPath)
            return res.status(500).send(err)
        }

        const files = req.files as unknown as Express.Multer.File[]

        if (files.length < 1 && req.method == 'POST') {
            return res.status(500).send('No photo sent.')
        }

        req.filesPath = files.map((item) => {
            return `${folderId}/${item.originalname}`
        })

        req.folderPath = imagesPath

        return next()
    })


    async function createDir(path: string) {

        mkdir(path, { recursive: true }, (err) => {
            if (err) {
                return res.status(500).send('Houve um erro ao criar a pasta.')
            }
        })

        return path
    }

    async function deleteDir(path: string, deleteContent?: boolean) {

        if (!deleteContent) {

            rmdir(path, (e) => {
                if (e) {
                    console.log(e)
                    return res.status(500).send('Houve um erro ao apagar a pasta.')
                }
            })

        } else {

            rm(path, { force: true, recursive: true }, e => {
                if (e) {
                    console.log(e)
                    return res.status(500).send('Houve um erro ao apagar a pasta.')
                }
            })
            
        }
    }
}
