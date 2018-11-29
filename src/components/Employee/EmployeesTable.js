import React from 'react'

import GlobalContext from '../special/GlobalContext'

import Table from '../common/Table'
import TableRow from '../common/TableRow'

const fields = [{
	name: 'fullname',
	title: 'ФИО',
	width: '250px'
}]
export default ({
  emps
}) => {
  return (
    <GlobalContext>
			{({ bottomPanel, setBottomPanel }) =>
				<Table
					fields={fields}
				>
					{({ tableFields }) => 
						emps.map(emp => {
							const { id, person: { lName, fName, mName } } = emp
							const active = bottomPanel.id === id
							return (
                <TableRow
                  key={id}
                  entity={emp}
                  tableFields={tableFields}
                  rowFields={[{
                    name: 'fullname',
                    value: [lName, fName, mName].join(' ')
                  }
                  // ,{
                  //   name: 'emps',
                  //   icon: org.employees.length ? 'user' : 'user plus',
                  //   iconColor: 'grey',
                  //   type: 'onHover',
                  //   styles: ['center'],
                  //   value: org.employees.length || ' ',
                  //   onClick: () => {
                  //     setBottomPanel({
                  //       type: 'Employees',
                  //       orgId: org.id
                  //     })
                  //   },
                  //   active: bottomPanel
                  //     && bottomPanel.type === 'Employees'
                  //     && bottomPanel.orgId === org.id
                  // }
                  ]}
                  active={active}
                  onClick={() => {
                    setBottomPanel({
                      ...bottomPanel,
                      id
                    })
                  }}
                />
							)
						}
					)}
				</Table>
			}
		</GlobalContext>
  )
}
