import React from 'react';
import { useQuery, gql } from '@apollo/client';

import {GET_SONG} from '../GraphQL/Queries';
import {Link} from 'react-router-dom'

const SongDetail=(props)=> {
     const {loading, error, data} = useQuery(GET_SONG, {variables:{id:props.match.params.id}})

    console.log(props.match.params.id)
    if (loading) return <p>Loading...</p>
    const {song} = data
    console.log(song)
    return (
        <div>
            <h2>Song Detail</h2>
            <Link to='/'>Back</Link>
            <div className="card">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
            </div>
        </div>
    )
}

export default SongDetail
