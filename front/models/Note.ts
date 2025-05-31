import type Group from "./Group";

export default class Note {
    _id: number;
  title: string;
  date: Date;
  content: string;
  group_id: number | null; // 可為 null，表示不屬於任何群組
  group?: Group; // 選擇性包含群組資訊

  constructor(
    _id: number,
    title: string,
    date: Date,
    content: string,
    group_id: number | null = null,
    group?: Group
  ) {
    this._id = _id;
    this.title = title;
    this.date = date;
    this.content = content;
    this.group_id = group_id;
    this.group = group;
  }
}