import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getOne } from '../../api/product'
import Product from '../../components/Product'

function ProductPage() {
    const { id } = useParams('id')
    const [ state, setState ] = useState({
        product: {},
        isLoading: true,
        error: false
    })
    const { product, isLoading, error } = state

    useEffect( () => {
        getOne(id)
            .then(data => { 

                data == {} && setState(
                    { ...state, 
                        error: true, 
                        isLoading: false})
            
                setState(
                    { ...state, 
                        product: data, 
                        isLoading: false})
            })
            .catch(err => {
                console.log('Something Happen')
                setState(
                    { ...state, 
                        error: true, 
                        isLoading: false})
            }
            )
    },[])

    return (
        
        <div>
            { 
        isLoading  ? <h1> Loading...</h1> :
        error ? <h2>Ha ocurrido un error</h2> :
            <Product product = { product }/> }            
        </div>
    )
}

export default ProductPage
