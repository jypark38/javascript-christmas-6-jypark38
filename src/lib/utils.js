export function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 이미 얼려진 객체인지 확인
  if (Object.isFrozen(obj)) {
    return obj;
  }

  Object.freeze(obj);

  // 객체의 모든 속성을 재귀적으로 얼림
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      deepFreeze(obj[key]);
    }
  }

  return obj;
}
