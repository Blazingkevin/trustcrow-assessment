import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

function validationMiddleware<T>(type: any): any {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);
        validate(dto).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                res.status(400).json({
                    message: 'Validation failed',
                    errors: errors.map(error => error.constraints),
                });
            } else {
                next();
            }
        });
    };
}

export default validationMiddleware;
