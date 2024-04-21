import React from 'react'
import AppWrapper from '../AppWrapper/AppWrapper'
import Trending from '../SidebarMenus/Trending'

const DashboardPage = () => {
    return (
        <AppWrapper Children={Trending} page={"dashboard"} />
    )
}

export default DashboardPage
