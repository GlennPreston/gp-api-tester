const submitComponent = document.querySelector("submit-button-component");

submitComponent.addEventListener("click", async () => {
    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
        console.log(accessTokenResponseData);
        
        if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
            const linkResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-link.php', linkPayload(accessTokenResponseData.response.body.token));
            console.log(linkResponseData);

            if (linkResponseData.response.body.url != null && linkResponseData.response.body.url != "")
            {
                window.location.href = linkResponseData.response.body.url;
            }
        }
        else {
            console.log("No access token");
        }
    } catch (err) {
        console.log(err);
    } finally {
        submitComponent.setLoading(false);
    }
});


function accessTokenPayload() {
    const appID = document.querySelector("#demo-app-id").value.trim();
	const appKey = document.querySelector("#demo-app-key").value.trim();

    const accessTokenPayload = {
        appID,
        appKey
    }

    return accessTokenPayload;
}


function linkPayload(accessToken) {
    const account = document.querySelector("#demo-account").value.trim();
    const orderID = document.querySelector("#demo-orderid").value.trim();
    const amount = document.querySelector("#demo-amount").value.trim();
    const currency = document.querySelector("#demo-currency").value.trim();
    const country = document.querySelector("#demo-country").value.trim();
    const captureMode = document.querySelector("#demo-capturemode").value.trim();

    const linkPayload = {
        accessToken,
        account,
        orderID,
        amount,
        currency,
        country,
        captureMode
    }

    return linkPayload;
}