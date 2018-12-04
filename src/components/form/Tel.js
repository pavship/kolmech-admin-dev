import React, { Component } from 'react'
import { connect, getIn } from 'formik'
import InputMask from 'react-input-mask'
import styled from 'styled-components'
import { Dropdown as SDropdown } from 'semantic-ui-react';
import { Input } from '../styled/styled-semantic';
import FormikInput from './FormikInput.js';

const countryOtions = [
  { key: 'rus', text: '+7', value: 'rus' },
  { key: 'notRus', text: 'прочие', value: 'notRus' },
]

const DropdownPropFilter = ({ inputError, ...rest }) => (
	<SDropdown {...rest} />
)
export const Dropdown = styled(DropdownPropFilter)`
	&&&&&& {
    ${props => props.inputError && `
      border: 1px solid ${props.theme.colors.errorBorder};
      border-right-color: transparent;
    `}
	}
`

const Error = styled.div`
  color: ${props => props.theme.colors.error};
`

class Tel extends Component {
  render() {
    const {
      baseName,
      formik,
      ...rest
    } = this.props
    // const Dropdown = (
    //   <Dropdown
    //     tabIndex={-1}
    //     name={`person.tels.${i}.country`}
    //     value={values.person.tels[i].country}
    //     options={countryOtions}
    //     onChange={(e, { name, value }) => setFieldValue( name, value )}
    //   />
    // )
    // const country = values.person.tels[i].country
    const number = getIn(formik.values, baseName + '.number')
    const country = getIn(formik.values, baseName + '.country')
    const error = getIn(formik.errors, baseName)
    if (country === 'rus') return <>
      <InputMask
        name={baseName + '.number'}
        mask='( 999 ) 999-99-99'
        maskChar=''
        value={getIn(formik.values, baseName + '.number')}
        onChange={formik.handleChange}
      >
        {(inputProps) =>
          <Input
            w='270px !important'
            // placeholder='Номер телефона'
            error={!!error}
            label={
              <Dropdown
                tabIndex={-1}
                name={baseName + '.country'}
                value={country}
                options={countryOtions}
                inputError={!!error}
                onChange={(e, { name, value }) => formik.setFieldValue( name, value )}
              />
            }
            {...rest}
            {...inputProps}
          />
        }
      </InputMask>
      <Error>
        {error && error.number}
      </Error>
    </>
    else return <>
      <FormikInput
        w='270px !important'
        name={baseName + '.number'}
        error={!!error}
        // placeholder='Телефон с кодом страны'
        label={
          <Dropdown
            tabIndex={-1}
            name={baseName + '.country'}
            value={country}
            options={countryOtions}
            inputError={!!error}
            onChange={(e, { name, value }) => formik.setFieldValue( name, value )}
          />
        }
        {...rest}
      />
      <Error>
        {error && error.number}
      </Error>
    </>
  }
}

export default connect(Tel)
