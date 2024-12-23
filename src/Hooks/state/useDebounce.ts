import { useEffect, useState } from "react";

function useDebounce(debounceValue:any,delay:number = 500) {
    const [debounceState,setDebounceState] = useState(debounceValue)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceState(debounceValue)
        },delay)
        return ()=>{
            clearTimeout(timer)
        }
    },[debounceValue])

    return debounceState;
    }

    export default useDebounce;