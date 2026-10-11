{
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");
const responseBlock = document.querySelector(".response-block-outer");


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
            const payerResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-payer.php', payerPayload(accessTokenResponseData.response.body.token));
            console.log(payerResponseData);
			displayResponse(payerResponseData.response.body, responseBlockEmpty, responseBlockContent, responseBlock);
        }
        else {
            throw new Error(JSON.stringify(accessTokenResponseData));
        }
    } catch (err) {
        console.log(err);
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


// Payload for Create Payer request
function payerPayload(accessToken) {
    const payerPayload = {
        accessToken,
        firstName: document.querySelector("#createpayer-firstname").value.trim(),
        lastName: document.querySelector("#createpayer-lastname").value.trim()
    }

    return payerPayload;
}
}