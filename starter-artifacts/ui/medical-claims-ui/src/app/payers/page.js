"use client";
import React, { useState, useEffect } from 'react'
import { Table, Pagination, Spinner } from 'flowbite-react';
import Link from 'next/link'
import TransactionsStatement from '../hooks/TransactionsStatement'

export default function Payers(){	
  const [page, setPage] = useState(1);
	const { data, isLoading } = TransactionsStatement.GetPayers(page, 10);

	const cardClass = (isLoading)=>{
		let classList = 'card mb-10';
		if(isLoading) classList += ' h-full';
		return classList;
	}

	return(
		<>
			<div className={cardClass(isLoading)}>
				<div className="card-header">
					<h4 className="card-title">Payers</h4>
				</div>
				<div className="card-body">
						{!isLoading ? (
							<div className="relative overflow-x-auto sm:rounded">
									<PayersTable data={data} {...{page, setPage }} />
							</div>  
						) : 
							<div className='text-center mt-20'>
								<Spinner aria-label="Loading..." />
							</div>
					}
				</div>
			</div>
		</>
	);
}


function PayersTable({ data, page, setPage }){
	const headers = [
		{ key: 'name', name: 'Name'},
		{ key: 'email', name: 'Email'},
		{ key: 'phoneNumber', name: 'Phone Number'},
		{ key: 'country', name: 'Country'}
	];

	return(
		<>
			<Datatable headers={headers} {...{data}}/>
      <Pagination
        className="p-6 self-center"
        currentPage={page}
        onPageChange={(page) => {
          setPage(page);
          //setContinuationToken(data.continuationToken);
        }}
        totalPages={100}
      />
		</>
	);
}

const Datatable = ({ headers = [], data = [] }) => {
  return (
    <Table className="w-full" hoverable>
      <Table.Head>
        {headers.map((header) => (
          <Table.HeadCell key={header.key} className="!p-4">
            {header.name}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((row) => (
          <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {Object.values(headers).map((header, index) => (
              <Table.Cell key={`${row.id}-${index}`} className="!p-4">
                {row[header.key] ? row[header.key] : '-'}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};