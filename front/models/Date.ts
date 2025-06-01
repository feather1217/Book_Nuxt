import type Group from './Group'

export default class DateEvent {
  _id: number
  title: string
  start: Date
  end: Date
  remark: string
  all_day: boolean
  group_id: number | null
  group?: Group
  color: string 

  constructor(
    _id: number,
    title: string,
    start: Date,
    end: Date,
    remark: string,
    all_day: boolean,
    group_id: number | null,
    color: Color,
    group?: Group
  ) {
    this._id = _id
    this.title = title
    this.start = start
    this.end = end
    this.remark = remark
    this.all_day = all_day
    this.group_id = group_id
    this.color = color
    this.group = group
  }
}


export type Color =
  | '#4CAF50' // 綠色
  | '#FF5733' // 紅橘
  | '#2196F3' // 藍色
  | '#FFC107' // 黃色
  | '#9C27B0' // 紫色

export const COLORS = {
  GREEN: '#4CAF50' as Color,
  ORANGE: '#FF5733' as Color,
  BLUE: '#2196F3' as Color,
  YELLOW: '#FFC107' as Color,
  PURPLE: '#9C27B0' as Color,
}