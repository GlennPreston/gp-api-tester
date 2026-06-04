{
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");

const submitComponent = document.querySelector("submit-button-component");

submitComponent.addEventListener("click", async () => {
    resetResponse(responseBlockEmpty, responseBlockContent);

	const appID = document.querySelector("#demo-app-id").value.trim();
	const appKey = document.querySelector("#demo-app-key").value.trim();

    const payload = {
        appID,
        appKey
    }

    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        const responseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', payload);
        console.log(responseData);
        displayResponse(responseData.response.body, responseBlockEmpty, responseBlockContent);
    } catch (err) {
        console.log(err);
    } finally {
        submitComponent.setLoading(false);
    }
});
}