import React from 'react'
import AppWrapper from '../../AppWrapper/AppWrapper'
import TokenPage from './index';

const TokenPageMain = () => {
    return (
        <AppWrapper Children={TokenPage} page={"token"} />
    )
}

export default TokenPageMain