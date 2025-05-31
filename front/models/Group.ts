import type User from './user';
import type Note from './note';
import type TimeLine from './timeline';
import type Date from './date';


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