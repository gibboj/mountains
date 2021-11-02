
import { useEffect, useRef } from "react"
import { SeasonHelper } from "./constants/seasons";
export const useAnimationFrame = (callback: FrameRequestCallback, deps: Array<any> = []) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>(-1);
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      callback((time % SeasonHelper.getTotalDuration()))
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, deps); // Make sure the effect runs only once
}
