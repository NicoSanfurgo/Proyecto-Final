import { Transition } from 'react-transition-group'
import { RiCloseFill } from 'react-icons/ri'
import { Animation } from './Styles'
import PropTypes from 'prop-types'

function AsideContainer({ children, state, onClose}) {
	return (
		<Transition
			in={ state }
			timeout={300}
		>
			{ (state)=>(
				<Animation state={state}>
					<RiCloseFill className="btn" onClick={ onClose } />
					{ children }
				</Animation>
			)}
               
		</Transition>
        
	)
}

AsideContainer.propTypes = {
	children : PropTypes.node.isRequired,
	state: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
}

export default AsideContainer
