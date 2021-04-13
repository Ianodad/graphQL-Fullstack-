import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { GET_SONG } from "../GraphQL/Queries";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import Lyrics from "./Lyrics"

const ADD_LYRIC_MUTATION = gql`
  mutation addLyricToSong($content: String! $songId: ID){
      addLyricToSong(content: $content, songId: $songId){
        id
        lyrics{
            content
        }
      }
  } 
`;

const SongDetail = (props) => {
    const [lyric, setLyric] = useState("");

    const [addLyricToSong] = useMutation(ADD_LYRIC_MUTATION, {
    variables: {
        content: lyric,
        songId: props.match.params.id,
      },
      refetchQueries: [{ query: GET_SONG }], // fetch the query agin after reload
    })

    const { loading, error, data } = useQuery(GET_SONG, {
    variables: { id: props.match.params.id },
  });


  const handleAddLyric=(event)=>{
    event.preventDefault();

    addLyricToSong();
  }
//   console.log(props.match.params.id);
  if (loading) return <p>Loading...</p>;
  const { song } = data;
//   console.log(song);
  return (
    <div>
      <h2>Song Detail</h2>
      <Link to="/">Back</Link>
      <div className="card">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
      <div className="lyrics">
        <Lyrics data={song.lyrics} />
      </div>
      <div className="mt-4">
        <form className="form pt-4" onSubmit={handleAddLyric}>
          <div className="form-group">
            <label htmlFor="artist">Add Lyrics</label>
            <input
              value={lyric}
              onChange={(e) => setLyric(e.target.value)}
              placeholder="Add Lyric"
              type="text"
              name="lyric"
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SongDetail;
