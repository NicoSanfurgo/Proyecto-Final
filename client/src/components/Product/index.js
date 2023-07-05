import React from 'react'
import BtnAddToCart from '../BtnAddToCart'

function Product({ product }) {
    return (
        <div>
            <img src={ product?.thumbnail } alt={ product?.title } />
            <h4>{ product?.title }</h4>
			<p>{ product?.description }</p>
			<h5>$ { product?.price }</h5>
			<BtnAddToCart idProduct = { product?.id } />
        </div>
    )
}

export default Product
