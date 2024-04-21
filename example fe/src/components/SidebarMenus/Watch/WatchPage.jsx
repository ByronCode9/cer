import React from 'react'
import AppWrapper from '../../AppWrapper/AppWrapper'


const WatchPage = () => {
    return (
        <div>Watch Page</div>
    )
}

const WatchPageMain = () => {
    return (
        <AppWrapper Children={WatchPage} page="watch" />
    )
}

export default WatchPageMain