import { IupdateImovelDTO } from "../../schemas/imovel.dto";
import { Database } from "../../utils/prismaInit";


export class atualizarImovel {

    async execute (imovelDTO: IupdateImovelDTO) {

        let toParseObject : any = imovelDTO

        Object.keys(imovelDTO).map((i) => {

            if (i == 'especif') {
                toParseObject[i] = String(toParseObject[i])
            }

            if (i == 'informacoes') {
                toParseObject[i] = String(toParseObject[i])
            }
        })

        const updatedImovel = await Database.imoveis.update({
            where: {
                id: imovelDTO.id
            }, 
            data: {
                ...toParseObject
            }
        }).catch(e => {
            throw e
        })

        return updatedImovel

    }
}