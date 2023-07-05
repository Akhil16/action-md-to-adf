const axios = require('axios');

function commentOnJiraTicket() {
    const jiraBaseUrl = 'https://nidhi-kumari-tricon-infotech.atlassian.net';
    const jiraTicketKey = process.env.JIRA_TICKET_ID;

    const data = ((process.env.COMMENT_DATA).replace(/\n/g, ""))

    const auth = {
        username: 'nidhi.kumari@triconinfotech.com',
        password: 'ATATT3xFfGF0KrgaQYro3-Bt5aZXEyXCfIhD6oWxIoKvvmB09up3jC6vTHYXVu_J87zmCTex6ZbI66ZUVkE9qV6jUmkcGShWJIMPfGO9lKbsP0B-SLM2488JyfVyfxfYQ9wIfATTaaFVARbB7MtE-2eRJZx1RZHi3XkgRUGz-C3X2h33CJLs7qc=96B2CC22'// process.env.JIRA_API_TOKEN,
    };

    var config = {
        method: 'post',
        url: `${jiraBaseUrl}/rest/api/3/issue/${jiraTicketKey}/comment`,
        headers: {
            'Authorization': `Basic ${Buffer.from(
                `${auth.username}:${auth.password}`
            ).toString('base64')}`,
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        console.log('jiraTicketKey----------------->', jiraTicketKey);
        console.log('password------------------>', auth.password);
        console.log('comment---------------->', data);
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('Comment posted successfully!');
    } catch (error) {
        console.error('Failed to post comment:', error.response);
        process.exit(1);
    }
}

commentOnJiraTicket();
