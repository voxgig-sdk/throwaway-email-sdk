import { ThrowawayEmailEntityBase } from '../ThrowawayEmailEntityBase';
import type { ThrowawayEmailSDK } from '../ThrowawayEmailSDK';
import type { Control } from '../types';
import type { V3n, V3nLoadMatch } from '../ThrowawayEmailTypes';
declare class V3nEntity extends ThrowawayEmailEntityBase<V3n> {
    constructor(client: ThrowawayEmailSDK, entopts: any);
    make(this: V3nEntity): V3nEntity;
    load(this: any, reqmatch?: V3nLoadMatch, ctrl?: Control): Promise<V3nEntity>;
}
export { V3nEntity };
