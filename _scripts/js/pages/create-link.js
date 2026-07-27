{
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");
const responseBlock = document.querySelector(".response-block-outer");

const linkType = document.querySelector('field-select-component[input-id="demo-linktype"]');

// Submit button
const submitComponent = document.querySelector("submit-button-component");

submitComponent.addEventListener("click", async () => {
    resetResponse(responseBlockEmpty, responseBlockContent);

    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        if (linkType.value === "Pay by Link") {
            await payByLinkSubmit();
        }
        else if (linkType.value === "Hosted Payment Page") {
            await hppLinkSubmit();
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

// -------------------------------------------------------------------------
// Pay by Link
// -------------------------------------------------------------------------

async function payByLinkSubmit() {
    const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
    console.log(accessTokenResponseData);
        
    if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
        const linkResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-link-paybylink.php', payByLinkPayload(accessTokenResponseData.response.body.token));
        console.log(linkResponseData);

        if (linkResponseData.response.body.url != null && linkResponseData.response.body.url != "")
        {
            //window.location.href = linkResponseData.response.body.url;
            displayResponse(linkResponseData.response.body, responseBlockEmpty, responseBlockContent, responseBlock);
        }
        else {
            throw new Error(JSON.stringify(linkResponseData));
        }
    }
    else {
        throw new Error(JSON.stringify(accessTokenResponseData));
    }
}


// Payload for PaybyLink Create Link request
function payByLinkPayload(accessToken) {
    let linkPayload = {
        accessToken,
        account: document.querySelector("#demo-account").value.trim(),
        amount: document.querySelector("#paybylink-amount").value.trim(),
        currency: document.querySelector("#paybylink-currency").value.trim(),
        country: document.querySelector("#paybylink-country").value.trim(),
        usageMode: document.querySelector('field-select-component[input-id="paybylink-usagemode"]').value,
        usageLimit: document.querySelector("#paybylink-usagelimit").value.trim(),
        linkName: document.querySelector("#paybylink-linkname").value.trim(),
        linkDescription: document.querySelector("#paybylink-linkdescription").value.trim(),
        shippable: document.querySelector('field-select-component[input-id="paybylink-shippable"]').value
    }

    return linkPayload;
}

// -------------------------------------------------------------------------
// Hosted Payment Page
// -------------------------------------------------------------------------

async function hppLinkSubmit() {
    if (document.querySelector("#hpp-cardstorage").checked && document.querySelector('field-select-component[input-id="hpp-payerstatus"]').value == "NEW") {
        const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
        console.log(accessTokenResponseData);

        if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
            const payerResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-payer.php', payerPayload(accessTokenResponseData.response.body.token));
            console.log(payerResponseData);

            if (payerResponseData.response.body.id != null && payerResponseData.response.body.id != "")
            {
                document.querySelector("#hpp-payerid").value = payerResponseData.response.body.id;
            }
            else {
                throw new Error(JSON.stringify(payerResponseData));
            }
        }
        else {
            throw new Error(JSON.stringify(accessTokenResponseData));
        }
    }


    const accessTokenResponseData2 = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
    console.log(accessTokenResponseData2);
        
    if (accessTokenResponseData2.response.body.token != null && accessTokenResponseData2.response.body.token != "") {
        const linkResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-link-hpp.php', hppPayload(accessTokenResponseData2.response.body.token));
        console.log(linkResponseData);

        if (linkResponseData.response.body.url != null && linkResponseData.response.body.url != "")
        {
            //window.location.href = linkResponseData.response.body.url;
            displayResponse(linkResponseData.response.body, responseBlockEmpty, responseBlockContent, responseBlock);
        }
        else {
            throw new Error(JSON.stringify(linkResponseData));
        }
    }
    else {
        throw new Error(JSON.stringify(accessTokenResponseData2));
    }
}


// Payload for Create Payer request
function payerPayload(accessToken) {
    const payerPayload = {
        accessToken,
        firstName: document.querySelector("#hpp-payerfirstname").value.trim(),
        lastName: document.querySelector("#hpp-payerlastname").value.trim()
    }

    return payerPayload;
}


// Payload for HPP Create Link request
function hppPayload(accessToken) {
    let linkPayload = {
        accessToken,
        account: document.querySelector("#demo-account").value.trim(),
        amount: document.querySelector("#hpp-amount").value.trim(),
        currency: document.querySelector("#hpp-currency").value.trim(),
        country: document.querySelector("#hpp-country").value.trim(),
        captureMode: document.querySelector('field-select-component[input-id="hpp-capturemode"]').value
    }

    // 3DS fields
    if (document.querySelector("#hpp-3ds").checked) {
        Object.assign(linkPayload, {
            threeDS: {
                email: document.querySelector("#hpp-email").value.trim(),
                phoneNumber: {
                    countryCode: document.querySelector("#hpp-phonenumber-countrycode").value.trim(),
                    subscriberNumber: document.querySelector("#hpp-phonenumber-subscribernumber").value.trim()
                },
                billingAddress: {
                    line1: document.querySelector("#hpp-billingline1").value.trim(),
                    line2: document.querySelector("#hpp-billingline2").value.trim(),
                    line3: document.querySelector("#hpp-billingline3").value.trim(),
                    city: document.querySelector("#hpp-billingcity").value.trim(),
                    state: document.querySelector("#hpp-billingstate").value.trim(),
                    postalCode: document.querySelector("#hpp-billingpostalcode").value.trim(),
                    country: document.querySelector("#hpp-billingcountry").value.trim(),
                },
                shippingAddress: {
                    line1: document.querySelector("#hpp-shippingline1").value.trim(),
                    line2: document.querySelector("#hpp-shippingline2").value.trim(),
                    line3: document.querySelector("#hpp-shippingline3").value.trim(),
                    city: document.querySelector("#hpp-shippingcity").value.trim(),
                    state: document.querySelector("#hpp-shippingstate").value.trim(),
                    postalCode: document.querySelector("#hpp-shippingpostalcode").value.trim(),
                    country: document.querySelector("#hpp-shippingcountry").value.trim(),
                },
                addressMatchIndicator: document.querySelector('field-select-component[input-id="hpp-addressmatchindicator"]').value,
                authenticationPreference: document.querySelector('field-select-component[input-id="hpp-authenticationpreference"]').value
            }
        });
    }

    // Card storage fields
    if (document.querySelector("#hpp-cardstorage").checked) {
        Object.assign(linkPayload, {
            cardStorage: {
                payerStatus: document.querySelector('field-select-component[input-id="hpp-payerstatus"]').value,
                payerID: document.querySelector("#hpp-payerid").value.trim(),
                storageMode: document.querySelector('field-select-component[input-id="hpp-storagemode"]').value
            }
        });
    }

    // Digital wallets fields
    if (document.querySelector("#hpp-digitalwallets").checked) {
        Object.assign(linkPayload, {
            digitalWallets: {
                googlePay: document.querySelector("#hpp-googlepay").checked,
                applePay: document.querySelector("#hpp-applepay").checked
            }
        });
    }

    return linkPayload;
}

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

// Link type
const payByLinkSection = document.querySelector("#createlink-paybylink");
const hostedPaymentPageSection = document.querySelector("#createlink-hpp");

linkType.addEventListener("change", () => {
    if (linkType.value === "Pay by Link") {
        payByLinkSection.classList.remove('hidden');
        hostedPaymentPageSection.classList.add('hidden');
    }
    else if (linkType.value === "Hosted Payment Page") {
        payByLinkSection.classList.add('hidden');
        hostedPaymentPageSection.classList.remove('hidden');
    }
});
}