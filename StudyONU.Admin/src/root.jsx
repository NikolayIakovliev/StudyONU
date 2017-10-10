import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class Root extends React.Component {
    render() {
        return <h2>Home</h2>;
    }
}

//const Home = () => (
//    <div>
//        <h2>Home</h2>
//    </div>
//)

//const About = () => (
//    <div>
//        <h2>About</h2>
//    </div>
//)

//const Topics = () => (
//    <div>
//        <h2>Topics</h2>
//    </div>
//)

//class Root extends React.Component {
//    render() {
//        return (
//            <Route>
//                <div>
//                    <ul>
//                        <li><Link to="/">Home</Link></li>
//                        <li><Link to="/about">About</Link></li>
//                        <li><Link to="/topics">Topics</Link></li>
//                    </ul>
//                    <hr />
//                    <Route exact path="/" component={Home} />
//                    <Route exact path="/about" component={About} />
//                    <Route exact path="/topics" component={Topics} />
//                </div>
//            </Route>
//        )
//    }
//}