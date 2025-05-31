import type Group from './user';
export default class Date {
    _id: number;
    title: string;
    start: Date;
    end: Date;
    remark: string;
    all_day: boolean;
    group_id: number | null; // 外鍵，指向 Group
    group?: Group; // 選擇性包含群組資訊
    constructor(
        _id: number,
        title: string,
        start: Date,
        end: Date,
        remark: string,
        all_day: boolean,
        group_id: number,
        group?: Group
    ) {
        this._id = _id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.remark = remark;
        this.all_day = all_day;
        this.group_id = group_id;
        this.group = group;
    }
}