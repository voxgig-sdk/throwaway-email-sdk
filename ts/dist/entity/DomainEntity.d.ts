import { ThrowawayEmailEntityBase } from '../ThrowawayEmailEntityBase';
import type { ThrowawayEmailSDK } from '../ThrowawayEmailSDK';
import type { Control } from '../types';
import type { Domain, DomainLoadMatch } from '../ThrowawayEmailTypes';
declare class DomainEntity extends ThrowawayEmailEntityBase<Domain> {
    constructor(client: ThrowawayEmailSDK, entopts: any);
    make(this: DomainEntity): DomainEntity;
    load(this: any, reqmatch?: DomainLoadMatch, ctrl?: Control): Promise<DomainEntity>;
}
export { DomainEntity };
