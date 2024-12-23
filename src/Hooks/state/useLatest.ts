import { useRef } from "react";

function useLatest(ref:any){
  const latest = useRef(ref);
  latest.current = ref;
  return latest;
}

export default useLatest;