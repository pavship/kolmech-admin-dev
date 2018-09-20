import React, { Fragment } from 'react'

import { Header as SHeader, Icon } from 'semantic-ui-react'
import { Span, Header, CardSection } from './styled-semantic/styled-semantic'

const DetailsHeader = ({ entity, closeDetails }) => {
	return (
		<CardSection head noIndent>
            <Header m='0' >
                <Icon link
                    name='cancel'
                    onClick={closeDetails} 
                />
                <SHeader.Content>Новый заказ
                    {/* { entity.id === 'new' 
                        ? 'Новый заказ'
                        : <Fragment>
                            {`Заявка №${num}`}
                            <Span ml='10px' fs='1rem' c='rgba(0,0,0,.6)' ws='0.5em' >
                                {`от ${dateLocal}`}
                            </Span>
                        </Fragment> } */}
                </SHeader.Content>
            </Header>
        </CardSection>
	)
}

export default DetailsHeader
