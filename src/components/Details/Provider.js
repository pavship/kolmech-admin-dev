import React, { useState } from 'react'

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import OrgDetails from '../Org/Details/Details';

const Container = styled.div`
  height: calc(100% - 36px);
  position: relative;
`

const MainContentContainer = styled.div`
`

const Sidebar = styled(posed.div({
  enter: { 
    x: 0,
    transition: { ease: 'easeInOut' }
  },
  exit: {
    x: 600,
    transition: { ease: 'easeInOut' }
  }
}))`
  position: absolute;
  z-index: 1;
  top: 1px;
  right: 0;
  width: 600px;
  height: calc(100% - 1px);
	background-color: rgba(255,255,255,1);
	box-shadow: 0 0 20px rgba(34,36,38,.15);
`

const DetailsContext = React.createContext()
export default DetailsContext

export const DetailsProvider = ({
  children
}) => {
  const [ details, setDetails ] = useState(null)
  // const [ details, setDetails ] = useState({ type: 'Org', id: 'cjvzvp08a01470752jlibcg6j' })
  return (
    <DetailsContext.Provider
      value={{ details, setDetails }}
    >
      <Container>
        <MainContentContainer>
          {children}
        </MainContentContainer>
        <PoseGroup>
          {details &&
            <Sidebar key='1'
              // pose={isOpen ? 'open' : 'closed'}
            >
							{details.type === 'Org'
								?	<OrgDetails
										details={details}
										setDetails={setDetails}
									/>
								: null
							}
            </Sidebar>
          }
        </PoseGroup>
      </Container>
    </DetailsContext.Provider>
  )
}