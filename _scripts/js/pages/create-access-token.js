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
        const responseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
        console.log(responseData);
        displayResponse(responseData.response.body, responseBlockEmpty, responseBlockContent, responseBlock);
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
}