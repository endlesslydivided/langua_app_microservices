import { MessageType } from '../consts/errorMessages';
import { BaseException } from './base.exception';

interface IUnauthorizedException {
    message?: string | MessageType;
    reason: string;
}

export class UnauthorizedException extends BaseException {
    constructor({ message, reason }: IUnauthorizedException) {
        super({
            code: 401,
            message: message ?? MessageType.UNAUTHORIZED_EXCEPTION,
            reason,
        });
    }
}
