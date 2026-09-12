import { ThrowawayEmailEntityBase } from '../ThrowawayEmailEntityBase';
import type { ThrowawayEmailSDK } from '../ThrowawayEmailSDK';
import type { Control } from '../types';
import type { Resolve, ResolveLoadMatch } from '../ThrowawayEmailTypes';
declare class ResolveEntity extends ThrowawayEmailEntityBase<Resolve> {
    constructor(client: ThrowawayEmailSDK, entopts: any);
    make(this: ResolveEntity): ResolveEntity;
    load(this: any, reqmatch?: ResolveLoadMatch, ctrl?: Control): Promise<ResolveEntity>;
}
export { ResolveEntity };
