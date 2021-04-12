import React, { useState } from "react";
// import { gql } from "@apollo/client";
import gql from 'graphql-tag'
import { useMutation } from "@apollo/client";
import { GET_SONG_LIST} from '../GraphQL/Queries'

// import {CREATE_SONG_MUTATION} from '../queries';

const CREATE_SONG_MUTATION = gql`
  mutation addSong($title: String! $artist: String!){
      addSong(title: $title, artist: $artist){
        id
        title
        artist
      
      }
  } 
`;

const CreateSong = (props) => {


  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const [addSong, { error }] = useMutation(CREATE_SONG_MUTATION, {
    variables: {
        title: title,
        artist: artist,
      },
      refetchQueries: [{ query: GET_SONG_LIST }], // fetch the query agin after reload
      onCompleted : () => props.history.push('/')
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addSong();
  };

  return (
    <div className="container">
      <div className="pt-4">
        {/* <button type="submit" onClick={handleSubmit}>Submit</button> */}
        <form className="form pt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="artist">Song Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Song Title"
              type="text"
              name="title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="artistName">Artist Name</label>
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist Name"
              type="text"
              name="artist"
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSong;
