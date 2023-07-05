import styled from 'styled-components'

export const Header = styled.div`
    display:flex;
    justify-content: space-between;
    margin: 1rem 1rem;
`

export const Logo = styled.div` 
   img{
       height: 3rem;
   }
   margin-bottom: 1rem;
`
export const NavBar = styled.ul`
    display: flex;
    li{
        margin-right: 1rem;
        cursor: pointer;
        font-size: 1.2rem;
        transition: transform 0.5s  ease;
        transition: color 0.5 ease;
    }
    .logout:hover{
            color: red;
        }

    .cart,.search,img {

        :hover{
            transform: scale(1.5);
        }
        :active{
            color: var(--color-pink);
        }
    }

    img{
        transition: transform 0.5s  ease;
        transition: color 0.5 ease;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
    }
`

const BaseModal = styled.div`
    ${(props) =>  console.log(props)}
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`
 
export const Animation = styled(BaseModal)`
   .btn {
    position: absolute;
    font-size: 2rem;
    cursor:pointer;
    margin: 0.5rem;
    transition: 1s ease;
    :hover{
      transform: rotate(360deg);
    }
  }
  transform: translateX(
    ${({state}) => {
		switch (state) {
		case 'entering':
			return '0%'
		case 'entered':
			return '0%'
		case 'exiting':
			return '+100%'
		case 'exited':
			return '+100%'
		}
	}
}
  );
   transition: 0.5s ease-in;

  `