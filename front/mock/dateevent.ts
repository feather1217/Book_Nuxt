// mock/mockDates.ts

import DateEvent, { COLORS } from '@/models/Date'
import Group from '@/models/Group'
import User from '@/models/User'

const aliceUser = new User(1, 'Alice', 'alice123', 'pass123', new Date('1990-01-01'), 3, 'alice@example.com')
const bobUser = new User(2, 'Bob', 'bob123', 'pass123', new Date('1992-02-02'), 1, 'bob@example.com')
const charlieUser = new User(3, 'Charlie', 'charlie123', 'pass123', new Date('1995-03-03'), 1, 'charlie@example.com')
const dianaUser = new User(4, 'Diana', 'diana123', 'pass123', new Date('1993-04-04'), 3, 'diana@example.com')

const groupA = new Group(1, '讀書會', [aliceUser, bobUser])
const groupB = new Group(2, '專案小組', [charlieUser, dianaUser])

const mockDates: DateEvent[] = [
  new DateEvent(
    1,
    '全天會議',
    new Date('2025-06-03'),
    new Date('2025-06-03'),
    '公司全體會議',
    true,
    null,
    COLORS.GREEN,
    undefined,
  ),
  new DateEvent(
    2,
    '設計討論',
    new Date('2025-06-03T10:00:00'),
    new Date('2025-06-03T12:00:00'),
    '針對新 UI 討論',
    false,
    1,
    COLORS.ORANGE,    
    groupA,
   
  ),
  new DateEvent(
    3,
    '畢業旅行',
    new Date('2025-06-05'),
    new Date('2025-06-07'),
    '三天兩夜旅遊',
    true,
    2,
    COLORS.BLUE,
    groupB,
    
  ),
  new DateEvent(
    4,
    '程式期末報告',
    new Date('2025-06-08T13:00:00'),
    new Date('2025-06-08T15:00:00'),
    '介紹甘特圖專案',
    false,
    2,
    COLORS.YELLOW,
    groupB,
    
  ),
  new DateEvent(
    5,
    '私人備忘',
    new Date('2025-06-10'),
    new Date('2025-06-10'),
    '記得去銀行',
    true,
    null,
    COLORS.PURPLE,
    undefined,
  ),
    new DateEvent(
    5,
    '考試',
    new Date('2025-06-10'),
    new Date('2025-06-10'),
    '期末考',
    true,
    null,
    COLORS.GREEN,
    undefined,
  )
]

export default mockDates
