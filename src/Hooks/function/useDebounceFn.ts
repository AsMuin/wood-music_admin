import debounce from "@/service/utils/debounce";
import useLatest from "../state/useLatest";
import { useCallback } from "react";

function useDebounceFn(fn:(...args:any[])=>any,delay:number = 500) {
    const fnRef = useLatest(fn);
    const debouncedFn = useCallback(debounce(fnRef.current,delay),[])

    return debouncedFn;
}

export default useDebounceFn;