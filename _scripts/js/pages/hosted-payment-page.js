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

    let linkPayload = {
        accessToken,
        account,
        orderID,
        amount,
        currency,
        country,
        captureMode
    }

    if (document.querySelector("#demo-3ds").checked) {
        console.log("Checked");

        Object.assign(linkPayload, {
            threeDS: {
                email: document.querySelector("#demo-email").value.trim(),
                phoneNumber: {
                    countryCode: document.querySelector("#demo-phonenumber-countrycode").value.trim(),
                    subscriberNumber: document.querySelector("#demo-phonenumber-subscribernumber").value.trim()
                },
                billingAddress: {
                    line1: document.querySelector("#demo-billingline1").value.trim(),
                    line2: document.querySelector("#demo-billingline2").value.trim(),
                    line3: document.querySelector("#demo-billingline3").value.trim(),
                    city: document.querySelector("#demo-billingcity").value.trim(),
                    state: document.querySelector("#demo-billingstate").value.trim(),
                    postalCode: document.querySelector("#demo-billingpostalcode").value.trim(),
                    country: document.querySelector("#demo-billingcountry").value.trim(),
                },
                shippingAddress: {
                    line1: document.querySelector("#demo-shippingline1").value.trim(),
                    line2: document.querySelector("#demo-shippingline2").value.trim(),
                    line3: document.querySelector("#demo-shippingline3").value.trim(),
                    city: document.querySelector("#demo-shippingcity").value.trim(),
                    state: document.querySelector("#demo-shippingstate").value.trim(),
                    postalCode: document.querySelector("#demo-shippingpostalcode").value.trim(),
                    country: document.querySelector("#demo-shippingcountry").value.trim(),
                },
                addressMatchIndicator: document.querySelector("#demo-addressmatchindicator").value.trim(),
                authenticationPreference: document.querySelector("#demo-authenticationpreference").value.trim()
            }
        });
    }
    else {
        console.log("Not checked");
    }

    console.log(linkPayload);

    return linkPayload;
}