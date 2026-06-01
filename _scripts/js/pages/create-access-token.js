{
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
        const responseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', payload);
        console.log(responseData);
        displayResponse(responseData.response.body);
    } catch (err) {
        console.log(err);
    } finally {
        submitComponent.setLoading(false);
    }
});
}