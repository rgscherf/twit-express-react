var SearchBox = React.createClass({
    displayName: 'SearchBox',

    getInitialState: function () {
        return {
            error: false,
            user: {}
        };
    },
    keyDown: function (e) {
        if (e.key === 'Enter') {
            var s = e.target.value;
            this.loadCommentsFromServer(s);
        }
    },
    componentWillMount: function () {
        this.loadCommentsFromServer('rgscherf');
    },
    loadCommentsFromServer: function (query) {
        $.ajax({
            type: 'GET',
            url: '/user',
            contentType: "application/json; charset=utf-8",
            data: { user: query },
            success: function (data) {
                this.setState({
                    user: JSON.parse(data),
                    error: false
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(xhr, status);
                this.setState({
                    error: true
                });
            }.bind(this)
        });
    },
    render: function () {
        var err = this.state.error ? "Could not find that github user!" : "";
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'searchBox shadow' },
                React.createElement(
                    'div',
                    { className: 'titleBox' },
                    React.createElement(
                        'div',
                        { id: 'logo' },
                        'Twit'
                    ),
                    React.createElement(
                        'div',
                        { id: 'definition' },
                        React.createElement(
                            'i',
                            null,
                            ' V. to taunt or ridicule ',
                            React.createElement('br', null),
                            ' with reference to anything embarrassing '
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'searchContainer' },
                    React.createElement('input', { type: 'text',
                        placeholder: 'Find github user to twit',
                        className: 'mainSearch',
                        onKeyDown: this.keyDown
                    }),
                    React.createElement(
                        'div',
                        { className: 'searchError' },
                        ' ',
                        err,
                        ' '
                    )
                )
            ),
            React.createElement(ContentContainer, { user: this.state.user })
        );
    }
});

var ContentContainer = React.createClass({
    displayName: 'ContentContainer',

    render: function () {
        return React.createElement(
            'div',
            { className: 'contentContainer' },
            React.createElement(Sidebar, { user: this.props.user }),
            React.createElement(Timeline, { commits: this.props.user.commits })
        );
    }
});

var Sidebar = React.createClass({
    displayName: 'Sidebar',

    render: function () {
        return React.createElement(
            'div',
            { className: 'sideBar shadow' },
            React.createElement('img', { src: this.props.user.avatar_url }),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'span',
                    { id: 'userName' },
                    ' ',
                    this.props.user.name,
                    ' '
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'span',
                    { id: 'userUrl' },
                    React.createElement(
                        'a',
                        { href: this.props.user.html_url },
                        ' ',
                        this.props.user.login
                    ),
                    ' - ',
                    this.props.user.public_repos,
                    ' public repos'
                )
            )
        );
    }
});

var TwitCard = React.createClass({
    displayName: 'TwitCard',

    render: function () {
        return React.createElement(
            'div',
            { className: 'twitCard shadow' },
            React.createElement(
                'div',
                { className: 'twitCardMessage' },
                ' ',
                this.props.elem.message,
                ' '
            ),
            React.createElement(
                'div',
                null,
                ' ',
                React.createElement(
                    'a',
                    { href: this.props.elem.commit_url },
                    this.props.elem.sha
                ),
                ' to ',
                React.createElement(
                    'a',
                    { href: this.props.elem.repo_url },
                    this.props.elem.repo_name
                )
            ),
            React.createElement(
                'div',
                null,
                this.props.elem.timestamp_pretty
            )
        );
    }
});

var Timeline = React.createClass({
    displayName: 'Timeline',

    render: function () {
        var c = $.map(this.props.commits, function (e) {
            return React.createElement(TwitCard, { elem: e });
        });
        return React.createElement(
            'div',
            { className: 'timeline' },
            ' ',
            c,
            ' '
        );
    }
});

ReactDOM.render(React.createElement(SearchBox, null), document.getElementById("app"));