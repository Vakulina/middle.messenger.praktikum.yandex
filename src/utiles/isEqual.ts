type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }
  /* eslint-disable-next-line */
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (Array.isArray(value) && isObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        /* eslint-disable-next-line */
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
