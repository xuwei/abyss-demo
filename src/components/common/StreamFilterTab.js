import { StreamFilter } from "../model/StreamEventModel";

import React from 'react'
import { Tabs, Tab } from '@material-ui/core'

function StreamFilterTab(props) {
    return (
        <Tabs
                value={props.filterValue}
                onChange={props.onChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
            <Tab value={StreamFilter.GLOBAL_STREAM} label="Global" />
            <Tab value={StreamFilter.FRIENDS_STREAM} label="Friends" />
            <Tab value={StreamFilter.TEAM_STREAM} label="Team" />
        </Tabs>
    )
}

export default StreamFilterTab