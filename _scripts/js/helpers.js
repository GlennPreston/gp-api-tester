// Send payload to proxy
async function callProxy(filepath, payload) {
    const response = await fetch(filepath, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return response.json();
}

// Pretty-print JSON with colors and indentation
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

// Display api response in response block
function displayResponse(responseData, responseBlockEmpty, responseBlockContent) {
    responseBlockEmpty.classList.add('hidden');
    responseBlockContent.classList.remove('hidden');

    responseBlockContent.innerHTML = '<pre>' + syntaxHighlight(responseData) + '</pre>';
}

// Display api response in response block
function resetResponse(responseBlockEmpty, responseBlockContent) {
    responseBlockEmpty.classList.remove('hidden');
    responseBlockContent.classList.add('hidden');

    responseBlockContent.innerHTML = '<pre></pre>';
}