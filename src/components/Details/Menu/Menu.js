import React from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import LeftIcon from './LeftIcon'

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
  height: 46px;
	padding-right: 1em;
	/* border-bottom: 1px solid #7e7e81; */
	/* border-bottom: 1px solid rgba(34,36,38,.15); */
	border-bottom: 1px solid rgba(152, 153, 154, 1);
`

export default ({
	title,
	subtitle,
	setDetails,
}) => {
  return (
		<Container>
			<LeftIcon
				size='big'
				name='cancel'
				onClick={() => setDetails(null)}
			/>
			{title &&
				<Div
					fs='1.28571429rem'
					fw='bold'
				>
					{title}
				</Div>
			}
			{subtitle &&
				<Div
					mt='4px'
					ml='10px'
					fs='1rem'
					c='rgba(0,0,0,.6)'
					ws='0.1em'
				>
					{subtitle}
				</Div>
			}
		</Container>
	)
}



