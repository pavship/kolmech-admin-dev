import React from 'react'

import styled from 'styled-components'
import { Div } from '../styled/styled-semantic';
import { Icon } from 'semantic-ui-react';

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
  height: 35px;
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
			<Div
				w='55px'
				ta='center'
			>
				<Icon 
					link
					size='big'
					name='cancel'
					onClick={() => setDetails(null)}
				/>
				{/* <SCaret
					size='large'
					active={expanded ? 1 : 0}
					disabled={disabled}
				/> : null */}
			</Div>
			{title &&
				<Div
					ml='10px'
					fs='1rem'
					fw='bold'
					// c='rgba(0,0,0,.6)'
					// ws='0.5em'
				>
					{title}
				</Div>
			}
			{subtitle &&
				<Div
					ml='10px'
					fs='1rem'
					c='rgba(0,0,0,.6)'
					ws='0.5em'
				>
					{subtitle}
				</Div>
			}
		</Container>
	)
}



