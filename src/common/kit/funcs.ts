export async function retryDo<Result = any>(
  action: () => Promise<Result>,
  retryCount: number = 3
): Promise<Result> {
  if (retryCount > 1) {
    try {
      return await action();
    } catch (err) {
      return await retryDo(action, retryCount - 1);
    }
  } else {
    try {
      return await action();
    } catch (err) {
      throw err;
    }
  }
}

// repeat run f by timeout if f return false
export function repeat(f: () => boolean, timeout: number = 100) {
  const g: any = (g: any) => {
    if (f()) {
      return;
    }
    setTimeout(() => {
      g(g);
    }, timeout);
  };
  g(g);
}
