import type User from './User';
import type Note from './Note';
import type TimeLine from './Timeline';
import type Date from './Date';


export default class Group {
  _id: number;
  name: string;
  members?: User[]; // 多對多關係，選擇性包含群組成員
  dates?: Date[]; // 群組內的日期事件
  notes?: Note[]; // 群組內的筆記
  timelines?: TimeLine[]; // 群組內的時間線

  constructor(
    _id: number,
    name: string,
    members?: User[],
    dates?: Date[],
    notes?: Note[],
    timelines?: TimeLine[],
  ) {
    this._id = _id;
    this.name = name;
    this.members = members;
    this.dates = dates;
    this.notes = notes;
    this.timelines = timelines;
  }
}