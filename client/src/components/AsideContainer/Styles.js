import styled from 'styled-components'

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