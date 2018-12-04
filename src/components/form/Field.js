import React, { Fragment } from 'react'
import { formik, getIn, connect, FieldArray } from 'formik'
import styled from 'styled-components'

import FormikInput from './FormikInput'
import Tel from './Tel'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: .67857143rem;
`

const Label = styled.div`
  flex: 0 0 122px;
  padding-top: calc(10.5rem/14);
  font-size: calc(13rem/14);
  font-weight: bold;
  line-height: 1.21428571rem;
  ${props => props.required && `
    ::after {
      content: '*';
      display: inline-block;
      margin: -.2em 0 0 .2em;
      vertical-align: top;
      color: #db2828;
    }
  `}
`

const Content = styled.div`
  flex: 1 1 auto;
  min-width: 210px;
`

const Error = styled.div`
  color: ${props => props.theme.colors.error};
`

const Field = ({
  name,
  type,
  formik,
  label,
  required,
  inputLabel,
  ...rest
}) => {
  const isArray = name === 'person.tels'
  // const component = data =>
  //   type === 'string' ? data :
  //   type === 'tel' ? <Tel tel={data} />
  //   : null
  return (
    <Container>
      <Label
        required={required}
      >
        {label}
      </Label>
      <Content>
        {isArray
          ? <FieldArray
              name={name}
              render={arrayHelpers => (
                <>
                  {getIn(formik.values, name).map((_, i) => 
                    <Fragment
                      key={i}
                    >
                      <Tel
                        baseName={`${name}.${i}`}
                      />
                    </Fragment>
                  )}
                </>
              )}
            />
          : <>
              <FormikInput
                {...rest}
                name={name}
                type={type}
              />
              <Error>
                {getIn(formik.errors, name)}
              </Error>
            </>
        }
        
        {/* {Array.isArray(content)
          ? content.map((item, i) => 
              <Fragment key={i}>
                {component(item)}
              </Fragment>
            )
          : component(content)
        } */}
      </Content>
    </Container>
  )
}

export default connect(Field)