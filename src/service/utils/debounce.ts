function debounce(fn:(...args:any[])=>any,delay:number = 500) {
    let timer:NodeJS.Timeout;
    
    return function(...args:any[]) {
            clearTimeout(timer);
        timer = setTimeout(()=>{
            fn(...args)
        },delay);
    }
}
export default debounce;