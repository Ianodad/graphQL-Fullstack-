import gql from "graphql-tag";

export const CREATE_SONG_MUTATION = gql`
  mutation addSong($title: String! $artist: String!){
      addSong(title: $title, artist: $artist){
        id
        title
        artist
      
      }
  } 
`;
