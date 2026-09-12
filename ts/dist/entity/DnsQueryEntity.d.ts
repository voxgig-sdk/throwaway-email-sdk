import { ThrowawayEmailEntityBase } from '../ThrowawayEmailEntityBase';
import type { ThrowawayEmailSDK } from '../ThrowawayEmailSDK';
import type { Control } from '../types';
import type { DnsQuery, DnsQueryLoadMatch, DnsQueryCreateData } from '../ThrowawayEmailTypes';
declare class DnsQueryEntity extends ThrowawayEmailEntityBase<DnsQuery> {
    constructor(client: ThrowawayEmailSDK, entopts: any);
    make(this: DnsQueryEntity): DnsQueryEntity;
    load(this: any, reqmatch?: DnsQueryLoadMatch, ctrl?: Control): Promise<DnsQueryEntity>;
    create(this: any, reqdata?: DnsQueryCreateData, ctrl?: Control): Promise<DnsQueryEntity>;
}
export { DnsQueryEntity };
