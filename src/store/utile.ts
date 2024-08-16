type DebounceFn = (...args: any[]) => void;
// 防抖
export function debounce(func: DebounceFn, delay: number = 3000): DebounceFn {
  let timer: number | undefined;

  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// 节流
export function throttle(func: DebounceFn, delay: number = 3000): DebounceFn {
  let timeout: number | undefined;

  return function (this: any, ...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = undefined;
        func.apply(this, args);
      }, delay);
    }
  };
}
