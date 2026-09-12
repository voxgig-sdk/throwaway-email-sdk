import { Context } from './Context';
declare class ThrowawayEmailError extends Error {
    isThrowawayEmailError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ThrowawayEmailError };
