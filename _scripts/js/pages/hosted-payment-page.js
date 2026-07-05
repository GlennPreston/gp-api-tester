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
        if (document.querySelector("#demo-cardstorage").checked && document.querySelector('field-select-component[input-id="demo-payerstatus"]').value == "NEW") {
            const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
            console.log(accessTokenResponseData);

            if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
                const payerResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-payer.php', payerPayload(accessTokenResponseData.response.body.token));
                console.log(payerResponseData);

                if (payerResponseData.response.body.id != null && payerResponseData.response.body.id != "")
                {
                    document.querySelector("#demo-payerid").value = payerResponseData.response.body.id;
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
            const linkResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-link-hpp.php', linkPayload(accessTokenResponseData2.response.body.token));
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
            throw new Error(JSON.stringify(accessTokenResponseData2));
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


// Payload for Create Payer request
function payerPayload(accessToken) {
    const payerPayload = {
        accessToken,
        firstName: document.querySelector("#demo-payerfirstname").value.trim(),
        lastName: document.querySelector("#demo-payerlastname").value.trim()
    }

    return payerPayload;
}


// Payload for Create Link request
function linkPayload(accessToken) {
    let linkPayload = {
        accessToken,
        account: document.querySelector("#demo-account").value.trim(),
        amount: document.querySelector("#demo-amount").value.trim(),
        currency: document.querySelector("#demo-currency").value.trim(),
        country: document.querySelector("#demo-country").value.trim(),
        captureMode: document.querySelector('field-select-component[input-id="demo-capturemode"]').value
    }

    // 3DS fields
    if (document.querySelector("#demo-3ds").checked) {
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

    // Card storage fields
    if (document.querySelector("#demo-cardstorage").checked) {
        Object.assign(linkPayload, {
            cardStorage: {
                payerStatus: document.querySelector('field-select-component[input-id="demo-payerstatus"]').value,
                payerID: document.querySelector("#demo-payerid").value.trim(),
                storageMode: document.querySelector('field-select-component[input-id="demo-storagemode"]').value
            }
        });
    }

    // Digital wallets fields
    if (document.querySelector("#demo-digitalwallets").checked) {
        Object.assign(linkPayload, {
            digitalWallets: {
                googlePay: document.querySelector("#demo-googlepay").checked,
                applePay: document.querySelector("#demo-applepay").checked
            }
        });
    }

    return linkPayload;
}

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

// Use attribute selector to get the component element (not the inner button which carries the id)
const payerStatus = document.querySelector('field-select-component[input-id="demo-payerstatus"]');
const payerFirstName = document.querySelector("#demo-payerfirstname");
const payerLastName = document.querySelector("#demo-payerlastname");
const storageMode = document.querySelector('field-select-component[input-id="demo-storagemode"]');
const payerID = document.querySelector("#demo-payerid");

payerStatus.addEventListener("change", () => {
    if (payerStatus.value === "NEW") {
        payerFirstName.closest('.field-row').classList.remove('hidden');
        payerLastName.closest('.field-row').classList.remove('hidden');
        payerID.closest('.field-row').classList.add('hidden');
    }
    else if (payerStatus.value === "ACTIVE") {
        payerFirstName.closest('.field-row').classList.add('hidden');
        payerLastName.closest('.field-row').classList.add('hidden');
        payerID.closest('.field-row').classList.remove('hidden');
    }
});
}