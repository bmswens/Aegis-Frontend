// React
import React from 'react'

// custom
import { ContentGrid } from '../Content'
import PersonCard from './PersonCard'

function People(props)  {

    return (
        <ContentGrid>
            <PersonCard
                firstName="Brandon"
                lastName="Swenson"
                title="App Dev"
                address="317 W. 3rd St, Beaver Dam, WI"
                email="example@gmail.com"
                phone="123-467-789"
            />
        </ContentGrid>
    )
}

export default People