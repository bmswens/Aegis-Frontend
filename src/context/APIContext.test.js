// testing help
import React from 'react'
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'

// to test
import APIContext, { APIContextProvider } from './APIContext'

function APIContextTester(props) {
    const apiContext = React.useContext(APIContext)

    return (
        <>
            <p id="driver">{apiContext.api.driver}</p>
            <button onClick={() => apiContext.update()}>Update</button>
            <p id="lastUpdate">{String(apiContext.lastUpdate.getMilliseconds())}</p>
        </>
    )
}

describe('<APIContextProvider>', function() {
    it("should default to using the demo driver", function() {
        render(
            <APIContextProvider>
                <APIContextTester />
            </APIContextProvider>
        )
        let driver = document.getElementById("driver")
        expect(driver.innerHTML).toEqual("demo")
    })
    it("should be able to use the local storage driver", function() {
        window.localStorage.setItem("storageDriver", '"local"')
        render(
            <APIContextProvider>
                <APIContextTester />
            </APIContextProvider>
        )
        let driver = document.getElementById("driver")
        expect(driver.innerHTML).toEqual("local")
    })
    it("should provide the last time it was updated", async function() {
        const user = userEvent.setup()
        render(
            <APIContextProvider>
                <APIContextTester />
            </APIContextProvider>
        )
        let startTime = document.getElementById("lastUpdate").innerHTML
        let button = screen.getByRole("button", {name: "Update"})
        await act(() => user.click(button))
        await waitFor(() => {
            let secondTime = document.getElementById("lastUpdate").innerHTML
            expect(startTime).not.toEqual(secondTime)
        })
    }, 10000)
})