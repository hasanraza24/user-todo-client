export const postCallApi = (api_url, body) => {
    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then((res) => res.json())
        .then(data => {
            return Promise.resolve(data);
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getCallApi = (api_url) => {
    return fetch(api_url)
        .then((res) => res.json())
        .then(data => {
            return Promise.resolve(data);
        })
        .catch((error) => {
            return Promise.reject(error);
        });

}

export const getTimeAgo = (postTime) => {
    postTime = (new Date(postTime)).getTime() ;
    let currentTime = new Date();
    currentTime = currentTime.getTime();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    let elapsed = currentTime - postTime;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }
    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ((Math.round(elapsed / msPerMinute) === 1) ? ' min ago' : ' min ago');
    }
    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ((Math.round(elapsed / msPerHour) === 1) ? ' hour ago' : ' hours ago');
    }
    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ((Math.round(elapsed / msPerDay) === 1) ? ' day ago' : ' days ago');
    }
    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ((Math.round(elapsed / msPerMonth) === 1) ? ' month ago' : ' months ago');
    }
    else {
        return Math.round(elapsed / msPerYear) + ((Math.round(elapsed / msPerYear) === 1) ? ' year ago' : ' years ago');
    }
}