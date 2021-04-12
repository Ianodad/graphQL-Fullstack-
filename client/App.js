import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SongList from './Components/SongList';
import CreateSong from './Components/CreateSong';
import SongDetail from './Components/SongDetail';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
// import {ApolloProvider} from 'react-apollo';
// import ApolloClient from "apollo-boost";


// Components imports

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <div>
                <ApolloProvider client={client}>
                <Router>
                <Switch>
                   <Route path="/create" exact component={CreateSong}/>
                   <Route path="/songdetail/:id" exact component={SongDetail}/>    
                   <Route path="/" exact component={SongList}/>
                   {/* <Route path="/create" exact components={CreateSong}/> */}
                 </Switch>
                </Router>
                </ApolloProvider>
            </div>
        );
    }
}

export default App