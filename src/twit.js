var SearchBox = React.createClass({
    getInitialState: function() {
        return {
            error: false,
            user: {
                // avatar_url: 'https://avatars.githubusercontent.com/u/8053315?v=3',
                // html_url: 'https://github.com/rgscherf',
                // login: 'rgscherf',
                // name: 'Rob Scherf',
                // public_repos: 18,
                // commits: [{
                //     message: 'add gunicorn to venv',
                //     repo_name: 'rgscherf/twit2',
                //     repo_url: 'https://github.com/rgscherf/twit2',
                //     commit_url: 'https://github.com/rgscherf/twit2/commit/8db4aeadb2fd8b55aef8e4cfca82e23bfc8e2130',
                //     sha: '8db4aeadb2fd8b55aef8e4cfca82e23bfc8e2130',
                //     timestamp_raw: '2016-07-05T23:28:36Z',
                //     timestamp_pretty: '2016-07-05T23:28:36Z'
                // }, {
                //     message: 'proper flex layout for head elements',
                //     repo_name: 'rgscherf/twit2',
                //     repo_url: 'https://github.com/rgscherf/twit2',
                //     commit_url: 'https://github.com/rgscherf/twit2/commit/bfcf2e4c63b792105e9445dae804d670cd364a50',
                //     sha: 'bfcf2e4c63b792105e9445dae804d670cd364a50',
                //     timestamp_raw: '2016-07-05T18:36:39Z',
                //     timestamp_pretty: '2016-07-05T18:36:39Z'
                // }, {
                //     message: 'php -> py port',
                //     repo_name: 'rgscherf/twit2',
                //     repo_url: 'https://github.com/rgscherf/twit2',
                //     commit_url: 'https://github.com/rgscherf/twit2/commit/1c2a1c531b4053d10968d1195a60396f4f32e98a',
                //     sha: '1c2a1c531b4053d10968d1195a60396f4f32e98a',
                //     timestamp_raw: '2016-07-05T18:20:15Z',
                //     timestamp_pretty: '2016-07-05T18:20:15Z'
                // }, {
                //     message: 'new favicon',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/99dd66af6d2958469cc7ab27bbcc22f8bad48510',
                //     sha: '99dd66af6d2958469cc7ab27bbcc22f8bad48510',
                //     timestamp_raw: '2016-07-04T17:50:25Z',
                //     timestamp_pretty: '2016-07-04T17:50:25Z'
                // }, {
                //     message: 'changed projecthome usort to use anonymous function',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/d9577aa498c936caf7bf63483026bda0313e2bca',
                //     sha: 'd9577aa498c936caf7bf63483026bda0313e2bca',
                //     timestamp_raw: '2016-07-04T17:33:33Z',
                //     timestamp_pretty: '2016-07-04T17:33:33Z'
                // }, {
                //     message: 'removed trailing , from data.json',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/ee21c212bcb40c7bf3e46ff7583a367c1c7b5f3a',
                //     sha: 'ee21c212bcb40c7bf3e46ff7583a367c1c7b5f3a',
                //     timestamp_raw: '2016-07-04T17:16:32Z',
                //     timestamp_pretty: '2016-07-04T17:16:32Z'
                // }, {
                //     message: 'final adjustments to data.json',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/f88ccc443326d45f5db2d9a95ae023f1c35b4584',
                //     sha: 'f88ccc443326d45f5db2d9a95ae023f1c35b4584',
                //     timestamp_raw: '2016-07-04T17:13:35Z',
                //     timestamp_pretty: '2016-07-04T17:13:35Z'
                // }, {
                //     message: 'public files',
                //     repo_name: 'rgscherf/twit2',
                //     repo_url: 'https://github.com/rgscherf/twit2',
                //     commit_url: 'https://github.com/rgscherf/twit2/commit/71114affb5933312972c7e54488fef05e71633a9',
                //     sha: '71114affb5933312972c7e54488fef05e71633a9',
                //     timestamp_raw: '2016-07-03T16:21:16Z',
                //     timestamp_pretty: '2016-07-03T16:21:16Z'
                // }, {
                //     message: 'first commit',
                //     repo_name: 'rgscherf/twit2',
                //     repo_url: 'https://github.com/rgscherf/twit2',
                //     commit_url: 'https://github.com/rgscherf/twit2/commit/9f013b520a0ec494783842e9f3ec6d1ed8531aef',
                //     sha: '9f013b520a0ec494783842e9f3ec6d1ed8531aef',
                //     timestamp_raw: '2016-07-03T15:54:58Z',
                //     timestamp_pretty: '2016-07-03T15:54:58Z'
                // }, {
                //     message: 'safer unique check for getcommits',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/8016f017746fe712d1d03b2e30176a54f756055b',
                //     sha: '8016f017746fe712d1d03b2e30176a54f756055b',
                //     timestamp_raw: '2016-07-02T20:53:08Z',
                //     timestamp_pretty: '2016-07-02T20:53:08Z'
                // }, {
                //     message: 'usort comparison function adjust',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/9b7e81e1645efe212ce98e50058dbd6f9104abaf',
                //     sha: '9b7e81e1645efe212ce98e50058dbd6f9104abaf',
                //     timestamp_raw: '2016-07-02T20:46:15Z',
                //     timestamp_pretty: '2016-07-02T20:46:15Z'
                // }, {
                //     message: 'usort() sorts in place lol',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/4b586d26ecfd541b9d0a2944c0aefc85b8cef154',
                //     sha: '4b586d26ecfd541b9d0a2944c0aefc85b8cef154',
                //     timestamp_raw: '2016-07-02T20:44:14Z',
                //     timestamp_pretty: '2016-07-02T20:44:14Z'
                // }, {
                //     message: 'commit bug fixes',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/5d0f04881f5e0909610232c562e64d222c6cecc2',
                //     sha: '5d0f04881f5e0909610232c562e64d222c6cecc2',
                //     timestamp_raw: '2016-07-02T20:42:44Z',
                //     timestamp_pretty: '2016-07-02T20:42:44Z'
                // }, {
                //     message: 'commit bug fixes',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/9aa423e168889f62f735c01c417d52f1a5b05c54',
                //     sha: '9aa423e168889f62f735c01c417d52f1a5b05c54',
                //     timestamp_raw: '2016-07-02T20:39:09Z',
                //     timestamp_pretty: '2016-07-02T20:39:09Z'
                // }, {
                //     message: 'commit bug fixes',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/910724d3479ce2f0a3f0346b356639ea4cd5ced4',
                //     sha: '910724d3479ce2f0a3f0346b356639ea4cd5ced4',
                //     timestamp_raw: '2016-07-02T20:37:44Z',
                //     timestamp_pretty: '2016-07-02T20:37:44Z'
                // }, {
                //     message: 'commit processing on controller side 2',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/294fadde67121691f4a758a4c582aa25c8023afd',
                //     sha: '294fadde67121691f4a758a4c582aa25c8023afd',
                //     timestamp_raw: '2016-07-02T20:36:49Z',
                //     timestamp_pretty: '2016-07-02T20:36:49Z'
                // }, {
                //     message: 'commit processing on controller side',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/a4a7b473e22604f595d66e4552fa74eb2aaefc63',
                //     sha: 'a4a7b473e22604f595d66e4552fa74eb2aaefc63',
                //     timestamp_raw: '2016-07-02T20:36:00Z',
                //     timestamp_pretty: '2016-07-02T20:36:00Z'
                // }, {
                //     message: 'query fix',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/bae127a274e81966e1751f4a7edc03d2a079faec',
                //     sha: 'bae127a274e81966e1751f4a7edc03d2a079faec',
                //     timestamp_raw: '2016-07-02T20:21:35Z',
                //     timestamp_pretty: '2016-07-02T20:21:35Z'
                // }, {
                //     message: 'php configuration is a nightmare, let\'s push it',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/bd87cc4ada43cbbf7989d52e5c8839054cac4a6d',
                //     sha: 'bd87cc4ada43cbbf7989d52e5c8839054cac4a6d',
                //     timestamp_raw: '2016-07-02T20:18:57Z',
                //     timestamp_pretty: '2016-07-02T20:18:57Z'
                // }, {
                //     message: 'data model changes to plumb in postgres',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/babb4704c38422011357261b7bfed48fc581566a',
                //     sha: 'babb4704c38422011357261b7bfed48fc581566a',
                //     timestamp_raw: '2016-07-01T14:20:33Z',
                //     timestamp_pretty: '2016-07-01T14:20:33Z'
                // }, {
                //     message: 'diagnosing database connectivity',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/ef2912c8f0022a839dabf89611a47eb4b0ed9759',
                //     sha: 'ef2912c8f0022a839dabf89611a47eb4b0ed9759',
                //     timestamp_raw: '2016-07-01T14:20:33Z',
                //     timestamp_pretty: '2016-07-01T14:20:33Z'
                // }, {
                //     message: 'db backend scripts',
                //     repo_name: 'rgscherf/cv',
                //     repo_url: 'https://github.com/rgscherf/cv',
                //     commit_url: 'https://github.com/rgscherf/cv/commit/fb8f8ab3ffdb114a299e7eeb963ab476daedb4cb',
                //     sha: 'fb8f8ab3ffdb114a299e7eeb963ab476daedb4cb',
                //     timestamp_raw: '2016-07-01T14:20:33Z',
                //     timestamp_pretty: '2016-07-01T14:20:33Z'
                // }]
            }
        };
    },
    keyDown: function(e) {
        if (e.key === 'Enter') {
            var s = e.target.value;
            this.loadCommentsFromServer(s);
        }
    },
    componentWillMount: function() {
        this.loadCommentsFromServer('rgscherf');
    },
    loadCommentsFromServer: function(query) {
        $.ajax({
            type: 'GET',
            url: '/user',
            contentType: "application/json; charset=utf-8",
            data: { user: query },
            success: function(data) {
                this.setState({
                    user: JSON.parse(data),
                    error: false
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(xhr, status);
                this.setState({
                    error: true
                });
            }.bind(this)
        });
    },
    render: function() {
        var err = this.state.error ? "Could not find that github user!" : "";
        return (
            <div>
                <div className = "searchBox shadow">
                    <div className = "titleBox">
                        <div id = "logo">
                            Twit 
                        </div>   
                        <div id = "definition"> 
                            <i> V. to taunt or ridicule <br /> with reference to anything embarrassing </i> 
                        </div> 
                    </div> 
                    <div className = "searchContainer"> 
                        <input type = "text"
                                placeholder = "Find github user to twit"
                                className = "mainSearch"
                                onKeyDown = {
                                    this.keyDown
                                }
                        /> 
                        <div className = "searchError"> {
                            err
                        } </div> 
                    </div> 
                </div> 
                <ContentContainer user = {this.state.user}/> 
            </div>
        );
    }
});

var ContentContainer = React.createClass({
    render: function() {
        return (
            <div className = "contentContainer">
                <Sidebar user = { this.props.user }/> 
                <Timeline commits = { this.props.user.commits } /> 
            </div>
        );
    }
});

var Sidebar = React.createClass({
    render: function() {
        return (
            <div className = "sideBar shadow">
                <img src = { this.props.user.avatar_url }></img> 
                <div> 
                    <span id = "userName"> { this.props.user.name} </span> 
                </div> 
                <div>
                    <span id = "userUrl">
                    <a href = { this.props.user.html_url }> { this.props.user.login } </a> - {this.props.user.public_repos} public repos 
                    </span> 
                </div> 
            </div>
        );
    }
});

var Timeline = React.createClass({
    render: function() {
        var a = $.map(this.props.commits, function(e) {
            return e;
        });
        var c = $.map(a, function(elem) {
            return (
                <div className = "twitCard shadow">
                    <div className = "twitCardHeadline">
                        Commit to <a href = { elem.repo_url }> { elem.repo_name } </a> at <a href={ elem.commit_url } > {elem.timestamp_pretty}</a>
                    </div> 
                    <div className = "twitCardBody"> 
                        { elem.message } 
                    </div> 
                </div>
            );
        });
        return (
            <div className = "timeline"> 
                { c } 
            </div>
        );
    }
});

ReactDOM.render(<SearchBox />,
    document.getElementById("app")
);