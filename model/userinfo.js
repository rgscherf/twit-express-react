const https = require('https');
const timezone = require('moment-timezone');
const moment = require('moment');

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

function makeRequest(opt, callback) {
    // handle streaming response from API server.
    // args
    // opt: options object
    // callback: callback function with signature cb(error?, response-body)
    body = [];
    https.get(opt, (result) => {
        if (result.statusCode === 404) {
            callback(Error("Could not find Github user"));
        } else {
            result.on('data', (d) => {
                body.push(d);
            });
            result.on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                callback(null, body);
            });
        }
    });
}

function getBasicInfo(string, callback) {
    // retrieve user's top-level info.
    // args
    // string: user's login
    // callback: callback to controller with function cb(error?, json)
    var o = options('/users/' + string);
    makeRequest(o, (err, body) => {
        if (err) {
            callback(err);
        } else {
            var user = {
                avatar_url: body.avatar_url,
                html_url: body.html_url,
                login: body.login,
                name: body.name,
                public_repos: body.public_repos
            };
            getCommits(user, callback);
        }
    });
}

function getCommits(user, callback) {
    // add user's commit stream to user object.
    // args
    // user: user object
    // callback: callback to controller with function cb(error?, json)
    var o = options(`/users/${user.login}/events`);
    makeRequest(o, (err, body) => {
        if (err) {
            callback(err);
        } else {
            cleanEvents = getCleanEvents(body);
            // sort cleanEvents by timstamp
            cleanEvents.sort((a, b) => {
                return a.timestamp_raw < b.timestamp_raw ? 1 : -1;
            });
            user.commits = cleanEvents;
            callback(null, user);
        }
    });
}

function getCleanEvents(body) {
    cleanEvents = [];
    var b = body.filter(e => e.type === 'PushEvent');
    // this is ugly, but cleaner than nested .map() + concat
    b.forEach((e) => {
        e.payload.commits.forEach((c) => {
            repo_url = 'https://github.com/' + e.repo.name;
            out = {
                message: c.message,
                repo_name: e.repo.name,
                repo_url: repo_url,
                commit_url: `${repo_url}/commit/${c.sha}`,
                sha: c.sha.substring(0, 7), // only take first 7 chars
                timestamp_raw: e.created_at,
                timestamp_pretty: dateFromTimestamp(e.created_at)
            };
            cleanEvents.push(out);
        });
    });
    return cleanEvents;
}

function dateFromTimestamp(d) {
    d = moment(d).tz('America/Toronto');
    // gives i.e 'Jul 00, 12:11 EST'
    d = d.format('MMM DD, hh:mma z');
    return d;
}

function getUser(userString, callback) {
    getBasicInfo(userString, callback);
}

module.exports.getUser = getUser;