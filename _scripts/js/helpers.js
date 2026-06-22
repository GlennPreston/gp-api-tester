// Send payload to proxy
async function callProxy(filepath, payload = '') {
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
function displayResponse(responseData, responseBlockEmpty, responseBlockContent, responseBlock) {
    responseBlockEmpty.classList.add('hidden');
    responseBlockContent.classList.remove('hidden');

    responseBlockContent.innerHTML = '<pre>' + syntaxHighlight(responseData) + '</pre>';
    slowScrollTo(document.querySelector(".content"), responseBlock, 1000);
}

// Display api response in response block
function resetResponse(responseBlockEmpty, responseBlockContent) {
    responseBlockEmpty.classList.remove('hidden');
    responseBlockContent.classList.add('hidden');

    responseBlockContent.innerHTML = '<pre></pre>';
}

// Show response block
function showResponseBlock(responseData, responseBlockEmpty, responseBlockContent, responseBlock) {
    responseBlock.classList.remove('hidden');
    displayResponse(responseData, responseBlockEmpty, responseBlockContent, responseBlock);
}

// Hide response block
function hideResponseBlock(responseBlockEmpty, responseBlockContent, responseBlock) {
    responseBlock.classList.add('hidden');
    resetResponse(responseBlockEmpty, responseBlockContent);
}


// Custom slow scroll function for a scrollable container
function slowScrollTo(container, element, duration = 1000) {
    const elementPosition = element.getBoundingClientRect().top - container.getBoundingClientRect().top;
    const startPosition = container.scrollTop;
    const targetPosition = startPosition + elementPosition;
    const distance = targetPosition - startPosition;

    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const scrollY = easeInOutCubic(
            Math.min(timeElapsed, duration),
            startPosition,
            distance,
            duration
        );

        container.scrollTop = scrollY;

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Easing function for smooth acceleration and deceleration
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}