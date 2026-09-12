import { ThrowawayEmailEntityBase } from '../ThrowawayEmailEntityBase';
import type { ThrowawayEmailSDK } from '../ThrowawayEmailSDK';
import type { Control } from '../types';
import type { V2n, V2nLoadMatch } from '../ThrowawayEmailTypes';
declare class V2nEntity extends ThrowawayEmailEntityBase<V2n> {
    constructor(client: ThrowawayEmailSDK, entopts: any);
    make(this: V2nEntity): V2nEntity;
    load(this: any, reqmatch?: V2nLoadMatch, ctrl?: Control): Promise<V2nEntity>;
}
export { V2nEntity };
