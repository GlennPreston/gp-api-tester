const submitComponent = document.querySelector("submit-button-component");

submitComponent.addEventListener("click", async () => {
	const appID = document.querySelector("#demo-app-id").value.trim();
	const appKey = document.querySelector("#demo-app-key").value.trim();

    const payload = {
        appID,
        appKey
    }

    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        const responseData = await callProxy(payload);
        console.log(responseData);
        displayResponse(responseData);
    } catch (err) {
        console.log(err);
    } finally {
        submitComponent.setLoading(false);
    }
});


async function callProxy(payload) {
    const base = typeof BASE_URL !== 'undefined' ? BASE_URL : './';
    const response = await fetch(BASE_URL + '_scripts/php/_proxy-create-access-token.php', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return response.json();
}

// Display api response in response block
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");

function displayResponse(responseData) {
    responseBlockEmpty.classList.add('hidden');
    responseBlockContent.classList.remove('hidden');

    responseBlockContent.innerHTML = '<pre>' + syntaxHighlight(responseData.response.body) + '</pre>';
}

// Function to pretty-print JSON with colors and indentation
function syntaxHighlight(json) {
    json = JSON.stringify(json, undefined, 4);
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|(\b(true|false|null)\b)|(\b-?\d+(\.\d*)?([eE][+-]?\d+)?\b)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}