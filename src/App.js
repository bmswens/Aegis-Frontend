// router
import { BrowserRouter } from "react-router-dom"

// custom
import Content from "./content/Content"
import Context from "./context/Context"
import TopNav from "./nav/TopNav"


function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <Context>
        <TopNav />
        <Content />
      </Context>
    </BrowserRouter>
  )
}

export default App
