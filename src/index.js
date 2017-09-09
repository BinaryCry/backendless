// css
import './style.less';

// React, ReactDom.render
import React, { Component } from "react";
import ReactDom, { render as Render } from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

// tabs
import tabsData from "./tabs.json";

// tabs components
import DummyTable from "./tabs/dummyTable";
import DummyChart from "./tabs/dummyChart";
import DummyList from "./tabs/dummyList";

// Main Component
import Main from "./components/main";

class TabsList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>
                <div>

                    <Route exact path="/" component={Main} />
                    <Route path="/dummyTable" component={DummyTable}/>
                    <Route path="/dummyChart" component={DummyChart}/>
                    <Route path="/dummyList" component={DummyList}/>

                    <hr/>
                    <ul>
                        {
                            this.props.list.map( item => {
                                return(
                                    <li key={ item.order }>
                                        <Link to={ `./${item.id}` } >{ item.title }</Link>
                                    </li>
                                )
                            } )
                        }
                    </ul>
                    <hr/>

                </div>
            </Router>
        )
    }
}

Render(<TabsList list={ tabsData.data.tabs } />, document.getElementById('root'));

