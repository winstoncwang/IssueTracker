class IssueFilter extends React.Component{
    render(){
        return(
            <div>This is a placeholder for the issue filter.</div>
        )
    
    }
}

class IssueTable extends React.Component{
    render(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow />
                    <IssueRow />
                </tbody>
            </table>
    }
}

class IssueAdd extends React.Component{
    render(){
        return(
            <div>This is a placeholder for the issue add.</div>
        )
    
    }
}

class IssueList extends React.Component {
    render (){
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr/>
                <IssueTable />
                <hr/>
                <IssueAdd />
            </React.Fragment>
        )
    }
}

//component
const element = <IssueList />
//load component
ReactDOM.render(element, document.getElementById("contents"))