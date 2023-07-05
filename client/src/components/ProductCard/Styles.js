import styled from 'styled-components'

export const Card = styled.div`
        width: 18rem;
        display: flex;
        flex-direction: column;
    `
export const ImgWrapper = styled.img`
    margin-top: -2rem;
    width: 100%;
    height: 20rem;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
`
export const ContentCard = styled.div`
    background: var(--color-white);
    padding: 1rem;
    border-radius: 0 0 10px 10px;
    border-top: 5px solid;
    border-image:   linear-gradient(to right, var(--color-pink) 20%, var(--color-yellow) 20%, var(--color-yellow) 40%,var(--color-green) 40%, var(--color-green) 60%, var(--color-light-blue) 60%, var(--color-light-blue) 80%, var(--color-violet) 80%) 5;
    font-family: 'Oxygen', sans-serif;   
    text-align: center; 

    h4{
        font-family: 'Rubik', sans-serif;   
        font-size: 1.3rem;
        font-weight: 400;
        padding-bottom: 1rem;
    }
    p{
        font-size: 0.8rem;
        font-weight: 200;
    }
    h5{
        font-weight: bold;
        font-size: 1.2rem;
    }
`
