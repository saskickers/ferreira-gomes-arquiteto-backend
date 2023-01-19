import { NextFunction, Request, Response } from 'express';
import { z, AnyZodObject, ZodError } from 'zod'
import { ErrorMessageOptions } from 'zod-error';
import { generateErrorMessage } from 'zod-error/lib/functions';


export const validateRequest =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {


            const parsedSchema = schema.safeParse(req.body)

            if (!parsedSchema.success) {
                const errorMessage = generateErrorMessage(parsedSchema.error.issues)
                return res.status(500).send(errorMessage)
            }

            return next();


        };