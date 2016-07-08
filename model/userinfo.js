const request = require('request');
var https = require('https');

function options(urlString) {
    return {
        method: 'GET',
        hostname: 'api.github.com',
        path: urlString,
        headers: {
            'User-Agent': 'rgscherf/twit3',
            username: '68622003dbbabc59e105f357be2390c3ab418087'
        }
    };
}

function getBasicInfo(s, cb) {
    var o = options('/users/' + s);
    body = [];
    https.get(o, (result) => {
        result.on('data', (d) => {
            body.push(d);
        });
        result.on('end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            var user = {
                avatar_url: body.avatar_url,
                html_url: body.html_url,
                login: body.login,
                name: body.name,
                public_repos: body.public_repos
            };
            getCommits(user, cb);
        });
    });
}

function getCommits(user, callback) {
    var o = options(`/users/${user.login}/events`);
    body = [];
    https.get(o, (result) => {
        result.on('data', (chunk) => {
            body.push(chunk);
        });
        result.on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            var cleanEvents = [];
            body.forEach((e, _, __) => {
                if (e.type === 'PushEvent') {
                    e.payload.commits.forEach((c, ___, ____) => {
                        repo_url = 'https://github.com/' + e.repo.name;
                        out = {
                            message: c.message,
                            repo_name: e.repo.name,
                            repo_url: repo_url,
                            commit_url: `${repo_url}/commit/${c.sha}`,
                            sha: c.sha,
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
    });
}

function dateFromTimestamp(d) {
    return d;
}

function getCommitsOld(user, callback) {
    if (!user) {
        return null;
    }

    var o = options(`https://api.github.com/users/${user.login}/events`);
    request(o, (err, res, bod) => {
        if (err) {
            return null;
        }

        var dirtyEvents = JSON.parse(bod);
        var cleanEvents = [];
        dirtyEvents.forEach((e, _, __) => {
            if (e.type === 'PushEvent') {
                e.payload.commits.forEach((c, ___, ____) => {
                    repo_url = 'https://github.com/' + e.repo.name;
                    out = {
                        message: c.message,
                        repo_name: e.repo.name,
                        repo_url: repo_url,
                        commit_url: `${repo_url}/commit/${c.sha}`,
                        sha: c.sha,
                        timestamp_raw: e.created_at,
                        timestamp_pretty: dateFromTimestamp(e.created_at)
                    };
                    cleanEvents.push(out);
                });
            }
        });
        return cleanEvents;
    });
}

getUser = function(userString, callback) {
    getBasicInfo(userString, callback);
};

module.exports.getUser = getUser;