import styled from 'styled-components'

export const BackNav = styled.div`
    display: flex;
    flex-direction: column;
    height: 15rem;
    background:linear-gradient(0deg, var(--color-yellow)  0%, var(--color-pink) 100%);
    margin-bottom: -10rem;
    border-radius: 15px;
    padding: 0.5rem;
    span{
        display: block;
        margin-bottom: 2rem;
    }
`
export const ProductList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    justify-content:center;
`