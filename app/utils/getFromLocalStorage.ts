import React from 'react';

export const getFromLocalStorage = (item: string) => {
    if (typeof window !== 'undefined') {
        const ls = localStorage?.getItem(item)
        return ls ? JSON.parse(ls) : null
    }
    return null
};

