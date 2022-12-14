import React, { useCallback, useEffect, useState } from 'react'
import { CartProvider } from 'react-use-cart'
import { useSelector, useDispatch } from 'react-redux'
import { setCardInfo } from './slices/cardSlice'

// import { Home } from './pages'
import { Articul1, Articul2, Articul3, Articul4, Articul5, Cart, Home } from './pages'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    // useHistory
} from 'react-router-dom'
import { useCart } from 'react-use-cart'

import { Button, Carousel, Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
import { Icon, ProductInfo, OrderPanel, CompleteOrder } from './components'
import {  } from './components'
import { data } from './data'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.scss'

const App = () => {
    const [position, setPosition] = useState(-500)
    const { totalItems } = useCart()
    const cardInfo = useSelector((state: any) => state.card.cardInfo)
    const dispatch = useDispatch()

    const orderPanelPosition = useCallback((e: any) => {
        e.stopPropagation()
        setPosition(e.currentTarget.id === 'show' ? 0 : -500)
    },[])

    useEffect(() => {
        // sessionStorage.clear()
        dispatch(setCardInfo({id: Number(localStorage.getItem('productId')), urlPath: localStorage.getItem('productUrl')}))
    },[dispatch])
    
    return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                            <Nav.Link><Link to='/Articul1'>Articul1</Link></Nav.Link>
                            <Nav.Link><Link to='/Articul2'>Articul2</Link></Nav.Link>
                            <Nav.Link><Link to='/Articul3'>Articul3</Link></Nav.Link>
                            <Nav.Link><Link to='/Articul4'>Articul4</Link></Nav.Link>
                            <Nav.Link><Link to='/Articul5'>Articul5</Link></Nav.Link>
                            <NavDropdown title="Dropdown" id="nav-dropdown-dark-example" menuVariant="dark">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link style={{position: 'absolute', marginLeft: '65%'}}>
                            <Icon
                                iconName="Cart2"
                                color="green"
                                size={30}
                                className="align-top"
                                onClick={orderPanelPosition}
                                id='show'
                            />
                            {
                            totalItems > 0 && 
                                <span style={{color: 'white', background: 'red', position: 'absolute', top: '0px', width: 'auto', height: '15px', borderRadius: '20px', paddingLeft: '3px', paddingRight: '3px', fontSize: '0.8em', display: 'inline-flex', alignItems: 'center'}}>
                                {/* // <span className='counter'> */}
                                {totalItems}
                                </span>
                            }
                            
                            </Nav.Link>
                            
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <OrderPanel hidePanel={orderPanelPosition} position={position}/>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/Articul1' element={<Articul1 />}/>
                    <Route path='/Articul2' element={<Articul2 />}/>
                    <Route path='/Articul3' element={<Articul3 />}/>
                    <Route path='/Articul4' element={<Articul4 />}/>
                    <Route path='/Articul5' element={<Articul5 />}/>
                    <Route path='/complete-order' element={<CompleteOrder />}/>
                    <Route path='/cart' element={<Cart />}/>
                    <Route path={cardInfo.urlPath || '/'} element={<ProductInfo />}/>
                </Routes>

                {/* <footer className='py-5 my-5 bg-dark'> */}
                <footer style={{background: 'black', height: '200px'}}>
                    <p className='text-center text-white'>
                        Copyright &copy; Your Website 2022
                    </p>
                </footer>
            </div>
    )
}

export default App;
