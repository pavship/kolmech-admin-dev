import React, { useState } from 'react'

import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { OrgDetails } from '../Org/Details/Details'
import CreateComOfferDetails from '../ComOffer/CreateComOfferDetails'
import CreateTaskDetails from '../Amo/CreateTaskDetails'

const Container = styled.div`
  height: calc(100% - 36px);
  overflow-y: scroll;
`

const MainContentContainer = styled.div`
  position: relative;
  height: 100%;
`

const Sidebar = styled(posed.div({
  enter: { 
    x: 0,
    transition: { ease: 'easeInOut' }
  },
  exit: {
    x: '100%',
    transition: { ease: 'easeInOut' }
  }
}))`
  position: absolute;
  z-index: 12;
  top: 36px;
  right: 0;
  // width: 600px;
  width: ${props =>
    props.type === 'CreateComOffer' ? '470px' :
    '600px'
  };
  height: calc(100% - 36px);
	background-color: rgba(255,255,255,1);
	box-shadow: 0 0 20px rgba(34,36,38,.15);
`

const DetailsContext = React.createContext()
export default DetailsContext

export const DetailsProvider = ({
  children
}) => {
  const [ details, setDetails ] = useState(null)
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
              type={details.type}
            >
							{ details.type === 'Org' ?	<OrgDetails
                  details={details}
                  setDetails={setDetails}
                /> :
                details.type === 'CreateComOffer' ?	<CreateComOfferDetails
                  details={details}
                  setDetails={setDetails}
                /> :
                details.type === 'createAmoTask' ?	<CreateTaskDetails
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