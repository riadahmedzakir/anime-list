import { useRef, useState, useEffect } from "react";

export const useContainerHeight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        const resizeObserver = new ResizeObserver(() => {
            if (ref.current) {
                setHeight(ref.current.clientHeight);
            }
        });
        resizeObserver.observe(ref.current);
        return () => resizeObserver.disconnect();
    }, []);

    return [ref, height] as const;
}