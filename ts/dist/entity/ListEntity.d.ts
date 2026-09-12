import { ThrowawayEmailEntityBase } from '../ThrowawayEmailEntityBase';
import type { ThrowawayEmailSDK } from '../ThrowawayEmailSDK';
import type { Control } from '../types';
import type { List, ListLoadMatch, ListListMatch } from '../ThrowawayEmailTypes';
declare class ListEntity extends ThrowawayEmailEntityBase<List> {
    constructor(client: ThrowawayEmailSDK, entopts: any);
    make(this: ListEntity): ListEntity;
    load(this: any, reqmatch?: ListLoadMatch, ctrl?: Control): Promise<ListEntity>;
    list(this: any, reqmatch?: ListListMatch, ctrl?: Control): Promise<ListEntity[]>;
}
export { ListEntity };
