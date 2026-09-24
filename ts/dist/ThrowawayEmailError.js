"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowawayEmailError = void 0;
class ThrowawayEmailError extends Error {
    isThrowawayEmailError = true;
    sdk = 'ThrowawayEmail';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ThrowawayEmailError = ThrowawayEmailError;
//# sourceMappingURL=ThrowawayEmailError.js.map