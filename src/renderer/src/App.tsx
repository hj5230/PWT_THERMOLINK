import Navbar from './components/Navbar'
import Voice from './components/Voice'

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      {/* tracking height ensuring it always at the buttom of the page */}
      <Voice />
    </>
  )
}

export default App
