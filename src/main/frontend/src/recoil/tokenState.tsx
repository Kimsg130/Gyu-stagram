import React from 'react';
import {atom} from "recoil";

interface TokenState {
    accessToken : string | null;
    userId : string | null;
}

export const tokenState = atom<TokenState>({
    key : 'tokenState',
    default : {
        accessToken : null,
        userId : null,
    },
});
