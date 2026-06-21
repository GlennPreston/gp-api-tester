{
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");
const responseBlock = document.querySelector(".response-block-outer");


// Submit button
const submitComponent = document.querySelector("submit-button-component");

submitComponent.addEventListener("click", async () => {
    hideResponseBlock(responseBlockEmpty, responseBlockContent, responseBlock);

    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
        console.log(accessTokenResponseData);
        
        if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
            const linkResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-link-paybylink.php', linkPayload(accessTokenResponseData.response.body.token));
            console.log(linkResponseData);

            if (linkResponseData.response.body.url != null && linkResponseData.response.body.url != "")
            {
                window.location.href = linkResponseData.response.body.url;
            }
            else {
                throw new Error(JSON.stringify(linkResponseData));
            }
        }
        else {
            throw new Error(JSON.stringify(accessTokenResponseData));
        }
    } catch (err) {
        console.log('Error: ' + JSON.stringify(JSON.parse(err.message).response.body));
        showResponseBlock(JSON.parse(err.message).response.body, responseBlockEmpty, responseBlockContent, responseBlock);
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


// Payload for Create Link request
function linkPayload(accessToken) {
    let linkPayload = {
        accessToken,
        account: document.querySelector("#demo-account").value.trim(),
        amount: document.querySelector("#demo-amount").value.trim(),
        currency: document.querySelector("#demo-currency").value.trim(),
        country: document.querySelector("#demo-country").value.trim(),
        usageMode: document.querySelector("#demo-usagemode").value.trim(),
        usageLimit: document.querySelector("#demo-usagelimit").value.trim(),
        linkName: document.querySelector("#demo-linkname").value.trim(),
        linkDescription: document.querySelector("#demo-linkdescription").value.trim(),
        shippable: document.querySelector("#demo-shippable").value.trim()
    }

    return linkPayload;
}
}