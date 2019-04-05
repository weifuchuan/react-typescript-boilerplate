import { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';

export default function useWindowSize(): { width: number; height: number } {
	const [ size, setSize ] = useState({ width: window.innerWidth, height: window.innerHeight });
	useEffect(() => {
		const subscription = fromEvent(window, 'resize').subscribe(() => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		});
		return () => subscription.unsubscribe();
  }, []);
  return size;
}
