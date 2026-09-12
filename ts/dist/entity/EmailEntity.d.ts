import { ThrowawayEmailEntityBase } from '../ThrowawayEmailEntityBase';
import type { ThrowawayEmailSDK } from '../ThrowawayEmailSDK';
import type { Control } from '../types';
import type { Email, EmailLoadMatch } from '../ThrowawayEmailTypes';
declare class EmailEntity extends ThrowawayEmailEntityBase<Email> {
    constructor(client: ThrowawayEmailSDK, entopts: any);
    make(this: EmailEntity): EmailEntity;
    load(this: any, reqmatch?: EmailLoadMatch, ctrl?: Control): Promise<EmailEntity>;
}
export { EmailEntity };
