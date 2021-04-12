import gql from "graphql-tag";

export const GET_SONG_LIST = gql`
  {
    songs {
      id
      title
      artist
    }
  }
`;

export const GET_SONG = gql`
  query SongQuery($id:ID!){
    song(id:$id){
      id
      title
      artist
  }
}
`
// export { GET_SONG_LIST, GET_SONG}