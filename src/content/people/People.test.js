// testing help
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// to test
import People from './People'

describe('<People>', function() {
    it("should render a person card", function() {
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        let actual = screen.getByText("Brandon Swenson")
        expect(actual).not.toBeNull()
    })
})