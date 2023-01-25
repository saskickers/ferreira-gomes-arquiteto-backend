import { NextFunction, Request, Response } from "express"
import { mkdir, mkdirSync, rmdir } from "fs"
import multer, { Multer } from "multer"
import { Database } from "./prismaInit"

declare global {
    namespace Express {
      interface Request {
        filesPath?: string[] 
      }
    }
  }

export async function receivePictures(req: Request, res: Response, next: NextFunction) {

    console.log(req.body)
    
    const folderNumber = await Database.imoveis.count() + 1

    const imagesPath = `public/images/${folderNumber}`




    const storage = multer.diskStorage({

        destination: async function (req, file, cb) {
            cb(null, await createDir(imagesPath))
        },

        filename: function (req, file, callback) {
            callback(null, file.originalname)
        }
    })

    const receiveIMG = multer({storage: storage}).array('fotos')

    receiveIMG(req, res, err => {

        if (err) {
            return res.status(500).send(err)
        }

        const files = req.files as unknown as Express.Multer.File[]

        req.filesPath = files.map((item) => {
            return item.path
        })

        return next()
    }) 


    async function createDir(path: string) {

        mkdir(path, {recursive: true}, (err) => {
            if (err) {
                return res.status(500).send('Houve um erro ao criar a pasta.')
            }
        })

        return path
    }
}
