import React from 'react';
import {Link, withRouter} from "react-router-dom";


class Tabs extends React.Component{

    state = {
        tabs: this.props.tabs,
        active_tab: 0,
    }   

    onTabClick = (e) => {
        this.setState({
            active_tab: e.target.id,
        });
    }

    getTabTitles = () => {
        let i = 0;
        let tabButtons = this.state.tabs.map(
            (tab) =>{

                if(i==this.state.active_tab){
                    i++;
                    return(
                        <Link to={this.props.match.url + "/" + tab} className="ActiveTabButton" id={i-1} onClick={this.onTabClick}>
                            {tab}
                        </Link>
                    );
                }

                else{
                    i++;
                    return(
                        <Link to={this.props.match.url + "/" + tab} className="TabButton" id={i-1} onClick={this.onTabClick}>
                            {tab}
                        </Link>
                    );
                }
            }
        );

        console.log("HISTORY", this.props.match);
        return tabButtons;
    }

    /*getTabPages = () => {
        let i = 0;
        let tabJSX =  this.state.tabs.map(
            (tab) => {

                if(i == this.state.active_tab){
                    i++;
                    return(
                        <div className="ActiveTabPage">
                            {tab.content}
                        </div>
                    );
                }
    
                else{
                    i++;
                    return(
                        <div className="TabPage">
                            {tab.content}
                        </div>
                    );
                }
            }
        );
        return tabJSX;
    }*/

    render(){
        return(
            <div id="Tabs">

                <div style={{backgroundColor: "rgb(32, 32, 32)"}}>
                    <div id='TabButtons'>
                        {this.getTabTitles()}
                    </div>
                </div>

                {/*(<div id="TabPages">
                    {this.getTabPages()}
                </div>  )*/
                }

            </div>
        );
    }
}

export default withRouter(Tabs);