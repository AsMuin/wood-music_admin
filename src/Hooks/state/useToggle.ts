import { useMemo, useState } from 'react';

type ReturnType<D, R> = [D | R, { toggle: () => void; set: (value: D | R) => void; setDefault: () => void; setReverse: () => void }];

function useToggle<D = any, R = any>(defaultValue: D, reverseValue: R): ReturnType<D, R> {
    const [value, setValue] = useState<D | R>(defaultValue);
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;
    const actions = useMemo(() => {
        function toggle() {
            setValue(prev => (prev === defaultValue ? reverseValueOrigin : defaultValue));
        }
        function set(value: D | R) {
            setValue(value);
        }
        function setDefault() {
            setValue(defaultValue);
        }
        function setReverse() {
            setValue(reverseValueOrigin);
        }
        return {
            toggle,
            set,
            setDefault,
            setReverse
        };
    }, [defaultValue, reverseValueOrigin]);
    return [value, actions];
}

export default useToggle;
