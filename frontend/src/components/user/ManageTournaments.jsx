import React { useEffect, useState} from 'react'
import { toast } from 'react-hot-toast';
import { link } from 'react-router-dom';

const


const ManageTournaments = () => {
  return (
    <div className='container'>
        <h1 className='text-center'>Manage User Data</h1>
        <hr />
        <table className='table table-dark'>
           <thead>
            <tr>
                <th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>location</th>
                    <th>schedule</th>
                    <th>Venue</th>
                </th>
            </tr>
           </thead>
           <tbody>
            {DisplayTournamentData()}
           </tbody>
        </table>
    </div>
  )
}

export default ManageTournaments;