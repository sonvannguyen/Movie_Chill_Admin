const MOVIE_TYPE = ['series', 'single']
const COUNTRY = ['Âu Mỹ', 'Hàn Quốc', 'Trung Quốc']
const CATEGORY = [
  'Tình Cảm',
  'Gia Đình',
  'Hài Hước',
  'Hành Động',
  'Học Đường',
  'Khoa Học',
  'Tâm Lý',
  'Viễn Tưởng',
  'Cổ Trang',
  'Kinh Dị',
]
const STATUS = ['ongoing', 'completed']

enum ALERT_TYPE {
  SUCCESS,
  ERROR,
}

const URL_MOVIE_DETAILS = 'http://localhost:3001/detail'
const URL_MOVIE_WATCH = 'http://localhost:3001/watch'
export { MOVIE_TYPE, COUNTRY, CATEGORY, STATUS, ALERT_TYPE, URL_MOVIE_DETAILS, URL_MOVIE_WATCH }
