class IssueFilter extends React.Component { // eslint-disable-line
  render () {
    return (
            <div>This is a placeholder for the issue filter.</div>
    )
  }
}

function IssueRow (props) {
    const issue = props.issue
    return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
    )
}

function IssueTable (props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>)
    return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
    )
}

//graphql date iso formatting
const dateRegex = new RegExp(/^\d\d\d\d-\d\d-\d\d/);

function jsonDateReviver(key, value){ //reviver for json.parse()
    if(dateRegex.test(value)){
        return new Date(value);
    }
    return value;
}

class IssueAdd extends React.Component { // eslint-disable-line
    constructor(){
        super();
    }
    //use arrowfunction for onSubmit or bind this to handleSubmit in constructor
    handleSubmit (event) {
        event.preventDefault();
        const form = document.forms.issueAdd; //form collection
        const issue = {
            due:new Date(new Date().getTime() + 1000*60*60*24*15), //set due day to + 15 days from date of submit
            owner:form.owner.value,
            title:form.title.value
        }
        this.props.createIssue(issue);
        form.owner.value = "";
        form.title.value = "";
    }

    render () {
        return (
            <form name="issueAdd" onSubmit={(event) => {this.handleSubmit(event)}}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        )
    }
}

class IssueList extends React.Component { // eslint-disable-line
    constructor(){
        super();
        this.state = {
            issues:[]
        };
        //this.createIssue=this.createIssue.bind(this)
    }

    //Called after rendering DOM
    componentDidMount(){   //ComponentDidUpdate() might not initially render
        this.loadData();
    }

    async loadData(){
        //graphql query
        const query = `query {
            issueList{
                id title status owner created effort due
            }
        }`
        //axios through unpkg
        try {
            const response = await axios({
                method:'post',
                url:'/graphql',
                headers:{'Content-Type':'application/json'},
                data:JSON.stringify({query}),
                transformResponse: [function(data){ //responseType does not work
                    data = JSON.parse(data,jsonDateReviver)
                    return data;
                }],
            });
            const {data:result} = await response.data;
            //console.log(result)
            this.setState({issues:result.issueList})
        }catch(err){
            console.log(JSON.stringify(err))
        }

    }
    createIssue = async(issue) => {
        const query =`mutation{
            issueAdd(issue:{
                title:"${issue.title}",
                owner:"${issue.owner}",
                due:"${issue.due.toISOString()}"
            })
            {id title due}
        }`

        try{
            const response = await axios({
                method:'post',
                url:'/graphql',
                headers:{'Content-Type':'application/json'},
                data:JSON.stringify({query}),
            });
            const {data} = await response.data
            console.log('response: '+JSON.stringify(data))
        }catch(err){
            console.log(err)
        }

    }
    /* eslint-disable */
    render () {
        return (
                <React.Fragment>
                    <h1>Issue Tracker</h1>
                    <IssueFilter />
                    <hr/>
                    <IssueTable issues={this.state.issues}/>
                    <hr/>
                    <IssueAdd createIssue={this.createIssue}/>
                </React.Fragment>
        )
    }
    /* eslint-disable */
}

// component
const element = <IssueList />
// load component
ReactDOM.render(element, document.getElementById('contents'))  // eslint-disable-line
