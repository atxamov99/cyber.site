import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Section from './components/Section'
import Categories  from './components/Categories'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
        <Header />
        <Main />
        <Categories />
        <Section />
        <Footer />
    </div>
  )
}

export default App