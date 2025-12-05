import { z } from 'zod';

const id = z
  .number({ message: '아이디는 숫자여야 합니다.' })
  .int({ message: '아이디는 정수여야 합니다.' })
  .positive({ message: '아이디는 양수여야 합니다.' });
const coercedId = z.coerce
  .number({ message: '아이디는 숫자여야 합니다.' })
  .int({ message: '아이디는 정수여야 합니다.' })
  .positive({ message: '아이디는 양수여야 합니다.' });
const sequence = z
  .number({ message: '시퀀스 번호는 숫자여야 합니다.' })
  .int({ message: '시퀀스 번호는 정수여야 합니다.' })
  .positive({ message: '시퀀스 번호는 양수여야 합니다.' });
const coercedSequence = z.coerce
  .number({ message: '시퀀스 번호는 숫자여야 합니다.' })
  .int({ message: '시퀀스 번호는 정수여야 합니다.' })
  .positive({ message: '시퀀스 번호는 양수여야 합니다.' });
const coercedDate = z.coerce
  .date({ message: '올바르지 않은 날짜 형식입니다.' })
  .transform((date) => date.toISOString().slice(0, 10));
const query = z.string({ message: '검색어는 문자열이어야 합니다.' }).trim().default('');
const sort = z
  .literal(['latest', 'oldest', 'trending', 'relevant'], { message: '잘못된 정렬 기준입니다.' })
  .default('latest');
const page = z.coerce
  .number({ message: '페이지 번호는 숫자여야 합니다.' })
  .int({ message: '페이지 번호는 정수여야 합니다.' })
  .positive({ message: '페이지 번호는 양수여야 합니다.' })
  .default(1);
const slug = z.string({ message: '슬러그는 문자열이어야 합니다.' }).trim();

const title = z
  .string({ message: '제목은 문자열이어야 합니다.' })
  .min(2, { message: '제목은 2글자 이상이어야 합니다.' })
  .max(64, { message: '제목은 64글자 이하여야 합니다.' });
const content = z
  .string({ message: '내용은 문자열이어야 합니다.' })
  .min(10, { message: '내용은 10글자 이상이어야 합니다.' })
  .max(16384, { message: '내용은 16384글자 이하여야 합니다.' });
const thumbnailRegex = /^[0-9]+\/[a-zA-Z0-9_-]+\.webp$/;
const thumbnail = z
  .string({ message: '썸네일의 path는 문자열이어야 합니다.' })
  .regex(thumbnailRegex, { message: '썸네일의 path는 올바른 형식이어야 합니다.' });
const topicSlugs = z
  .array(z.string({ message: '토픽은 문자열이어야 합니다.' }))
  .max(10, { message: '토픽은 최대 10개까지 선택할 수 있습니다.' });

const email = z.email('올바른 이메일 형식이 아닙니다.').trim();
const usernameRegex = /^[a-zA-Z0-9]+$/;
const username = z
  .string({ message: '유저네임은 문자열이어야 합니다.' })
  .trim()
  .min(4, '유저네임은 4글자 이상이어야 합니다.')
  .max(16, '유저네임은 16글자 이하여야 합니다.')
  .regex(usernameRegex, { message: '유저네임은 영문자와 숫자로만 이루어져야 합니다.' });
const nicknameRegex = /^[a-zA-Z0-9가-힣_]+(?: [a-zA-Z0-9가-힣_]+)*$/;
const nickname = z
  .string({ message: '닉네임은 문자열이어야 합니다.' })
  .trim()
  .min(2, '닉네임은 2글자 이상이어야 합니다.')
  .max(12, '닉네임은 12글자 이하여야 합니다.')
  .regex(nicknameRegex, { message: '닉네임은 영문자, 숫자, 한글, 밑줄(_)로만 이루어져야 합니다.' });

const zodFields = {
  id,
  coercedId,
  sequence,
  coercedSequence,
  coercedDate,
  query,
  sort,
  page,
  slug,
  title,
  content,
  thumbnail,
  topicSlugs,
  email,
  username,
  nickname,
};

export default zodFields;
export { content as contentField };
