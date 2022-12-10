import { useCallback } from "react";

export const useTextCompletion = () => {
    const request = useCallback(async (msg: string) => {
        const result = await fetch('http://localhost:8181/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ context: msg })
        }).then(res => res.text());
        return result;
    }, [])
    return { request };
};
