const request = require('request');
var https = require('https');

function options(urlString) {
    // constructs options object for makeRequest()
    return {
        method: 'GET',
        hostname: 'api.github.com',
        path: urlString,
        headers: {
            Authorization: 'token 68622003dbbabc59e105f357be2390c3ab418087',
            'User-Agent': 'rgscherf/twit3',
        }
    };
}

function makeRequest(opt, errorcb, callback) {
    // handle streaming response from API server.
    // args
    // opt: options object
    // errorcb: callback to main controller
    // callback: callback function with signature cb(response-body)
    body = [];
    https.get(opt, (result) => {
        if (result.statusCode === 404) {
            errorcb('error');
        }
        result.on('data', (d) => {
            body.push(d);
        });
        result.on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            callback(body);
        });
    });
}

function getBasicInfo(string, callback) {
    // retrieve user's top-level info.
    // args
    // string: user's login
    // callback: callback to controller with function cb(json)
    var o = options('/users/' + string);
    makeRequest(o, callback, (body) => {
        var user = {
            avatar_url: body.avatar_url,
            html_url: body.html_url,
            login: body.login,
            name: body.name,
            public_repos: body.public_repos
        };
        getCommits(user, callback);
    });
}

function getCommits(user, callback) {
    // add user's commit stream to user object.
    // args
    // user: user object
    // callback: callback to controller with signature cb(json)
    var o = options(`/users/${user.login}/events`);
    makeRequest(o, callback, (body) => {
        var cleanEvents = [];
        body.forEach((e) => {
            if (e.type === 'PushEvent') {
                e.payload.commits.forEach((c) => {
                    repo_url = 'https://github.com/' + e.repo.name;
                    out = {
                        message: c.message,
                        repo_name: e.repo.name,
                        repo_url: repo_url,
                        commit_url: `${repo_url}/commit/${c.sha}`,
                        sha: c.sha.substring(0, 7), // only take first 7 chars
                        timestamp_raw: e.created_at,
                        // datefromtimestamp should do something!
                        timestamp_pretty: dateFromTimestamp(e.created_at)
                    };
                    cleanEvents.push(out);
                });
            }
        });
        // sort cleanEvents
        user.commits = cleanEvents;
        callback(user);
    });
}

function dateFromTimestamp(d) {
    return d;
}

function getUser(userString, callback) {
    getBasicInfo(userString, callback);
}

module.exports.getUser = getUser;