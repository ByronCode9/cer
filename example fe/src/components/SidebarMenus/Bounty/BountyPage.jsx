import React from 'react'
import AppWrapper from '../../AppWrapper/AppWrapper'


const BountyPage = () => {
    return (
        <div>Bounty Page</div>
    )
}
const BountyPageMain = () => {
    return (
        <AppWrapper Children={BountyPage} page={"bounty"} />
    )
}

export default BountyPageMain