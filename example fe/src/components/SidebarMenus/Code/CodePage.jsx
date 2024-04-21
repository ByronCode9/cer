import React from 'react'
import AppWrapper from '../../AppWrapper/AppWrapper'
import CodePage from './index';


const CodePageMain = () => {
    return (
        <AppWrapper Children={CodePage} page={"code"} />
    )
}

export default CodePageMain