import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import {GET_SONG_LIST} from '../GraphQL/Queries';
import { useMutation } from "@apollo/client";

// import { graphql } from "react-apollo";
// import gql from "graphql-tag";

const DELETE_SONG_MUTATION =gql`
mutation DeleteSong($id:ID){
  deleteSong(id:$id){
    id
  }
}
`;
const SongList =()=> {
    const [deleteSong ] = useMutation(DELETE_SONG_MUTATION)
    const {loading, error, data} = useQuery(GET_SONG_LIST)

    
    
    const handleDeleteSong=(id)=> {
      console.log(id)
      deleteSong({
        variables:{id},
        refetchQueries:[{query: GET_SONG_LIST}]
      })
    }
    
    if (loading) return <p>Loading...</p>
    const {songs}= data
    console.log(songs)
        return (
      <div className="container">
        <h2>This is song list</h2>
        <div className="song-list">
            { songs.map(song=>(
                <div className="card" style={{"width":"20%"}}>

                <li className="" key={song.id}>
                  <Link to={`/songdetail/${song.id}`}>
                    {song.title}
                   </Link>
                </li>
                <i className="mr-4 float-right bg-primary" onClick={()=>handleDeleteSong(song.id)} ><a>delete</a></i>
                </div>
            ))
            }
        </div>
        <a>
          <Link to='/create'>Create new song</Link>
        </a>
      </div>
    );
  }

export default SongList;
