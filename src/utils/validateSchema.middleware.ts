import { NextFunction, Request, Response } from 'express';
import { rm } from 'fs';
import { z, AnyZodObject, ZodError } from 'zod'
import { ErrorMessageOptions } from 'zod-error';
import { generateErrorMessage } from 'zod-error/lib/functions';


export const validateRequest =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {


            const parsedSchema = schema.safeParse(req.body)

            if (!parsedSchema.success) {

                if (req.files && req.folderPath) {
                    rm(req.folderPath, {force: true, recursive: true}, (e) => {
                        if (e) {
                            res.status(500).send('Houve um erro ao apagar a pasta.')
                        }
                        console.log('Pasta apagada.')
                    })
                }

                const errorMessage = generateErrorMessage(parsedSchema.error.issues)
                return res.status(500).send(errorMessage)
            }

            console.log(parsedSchema.data)
            req.body = parsedSchema.data
            return next();


        };