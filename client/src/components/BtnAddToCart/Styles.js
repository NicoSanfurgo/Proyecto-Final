import styled from 'styled-components'
import { IoCartOutline, IoCartSharp } from 'react-icons/io5'

export const AddCartButton = styled( IoCartOutline )`
   font-size: 1.5rem;
`
export const ButtonContainer = styled.button`
    border:none;
    background: var(--color-black);
    color: var(--color-white);
    text-transform: uppercase;
    font-size: 0.6rem;
    border-radius:50%;
    padding:0.5rem;
    :hover{
      ${AddCartButton}{
         color: black;
      }
    }
`

export const RemoveCartButton =  styled( IoCartSharp )`
   font-size: 1.5rem;
`