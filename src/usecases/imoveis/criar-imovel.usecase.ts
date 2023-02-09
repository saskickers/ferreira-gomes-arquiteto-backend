
import { Imoveis, Prisma } from "@prisma/client";
import { IcriarImovelDTO } from "../../schemas/imovel.dto";
import { Database } from "../../utils/prismaInit";
import multer from 'multer'
import fs from 'fs'



export class criarImovel {

    async execute(imovelDTO: IcriarImovelDTO, fotos: string[]) {

        console.log(imovelDTO)
        console.log(fotos)

        try {

            const imovel = await Database.imoveis.create({
                data: {
                    ...imovelDTO,
                    createdAt: new Date().toISOString(),
                    fotos: String(fotos)
                }
            })

            return imovel
            
        } catch (e) {
            throw e
        }



    }


    
}



