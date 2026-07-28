{
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");
const responseBlock = document.querySelector(".response-block-outer");

const linkID = document.querySelector("#getlink-linkid");

// Submit button
const submitComponent = document.querySelector("submit-button-component");

submitComponent.addEventListener("click", async () => {
    resetResponse(responseBlockEmpty, responseBlockContent);

    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
        console.log(accessTokenResponseData);
        
        if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
            const getLinkResponseData = await (await fetch(`https://apis.sandbox.globalpay.com/ucp/links/${linkID.value}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'x-gp-version': '2021-03-22',
                    'authorization': `Bearer ${accessTokenResponseData.response.body.token}`,
                }
            })).json();
            console.log(getLinkResponseData);

            if (getLinkResponseData.id != null && getLinkResponseData.id != "") {
                displayResponse(getLinkResponseData, responseBlockEmpty, responseBlockContent, responseBlock);
            }
            else {
                throw new Error(JSON.stringify(getLinkResponseData));
            }
        }
        else {
            throw new Error(JSON.stringify(accessTokenResponseData.response.body));
        }
    } catch (err) {
        console.log('Error: ' + JSON.stringify(JSON.parse(err.message)));
        showResponseBlock(JSON.parse(err.message), responseBlockEmpty, responseBlockContent, responseBlock);
    } finally {
        submitComponent.setLoading(false);
    }
});


// Payload for Create Access Token request
function accessTokenPayload() {
    const accessTokenPayload = {
        appID: document.querySelector("#demo-app-id").value.trim(),
        appKey: document.querySelector("#demo-app-key").value.trim()
    }

    return accessTokenPayload;
}
}