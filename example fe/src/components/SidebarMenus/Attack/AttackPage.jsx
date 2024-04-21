import React from 'react'
import AppWrapper from '../../AppWrapper/AppWrapper'

const AttackPage = () => {
    return (
        <div>Attack Page</div>
    )

}

const AttackPageMain = () => {
    return (
        <AppWrapper Children={AttackPage} page={"attack"} />
    )
}

export default AttackPageMain