import { Database } from "../../utils/prismaInit";

export class deletarImovel {

    async execute(id: number) {
        try {

            const imovelExiste = await Database.imoveis.findUnique({
                where: {id: id}
            })

            if (!imovelExiste) {
                return null
            }

            const imovelDeletado = await Database.imoveis.delete({
                where: {
                    id: id
                }
            })
            console.log(imovelDeletado)
            return imovelDeletado
        }
        catch(e) {
            console.log(e)
            throw e
        }
    }

}