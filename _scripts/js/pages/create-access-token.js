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
    let accessTokenPayload = {
        appID: document.querySelector("#demo-app-id").value.trim(),
        appKey: document.querySelector("#demo-app-key").value.trim()
    }

    // Token Settings fields
    const restrictedToken = document.querySelector("#demo-restrictedtoken");
    if (restrictedToken.checked) {
        Object.assign(accessTokenPayload, {
            restrictedToken: "YES"
        });
    }

    // Permissions field
    const permissions = document.querySelector('field-multiselect-component[input-id="demo-permissions"]').value;
    if (document.querySelector("#demo-permissions").checked && permissions.length > 0) {
        accessTokenPayload.permissions = permissions;
    }

    // Expire fields
    const expireType = document.querySelector('field-select-component[input-id="demo-expiretype"]').value;
    if (document.querySelector("#demo-expire").checked) {
        if (expireType === "Seconds to Expire") {
            console.log("Seconds");

            Object.assign(accessTokenPayload, {
                expire: {
                    secondsToExpire: document.querySelector("#demo-secondstoexpire").value.trim()
                }
            });
        }
        else if (expireType === "Interval to Expire") {
            console.log("Interval");

            Object.assign(accessTokenPayload, {
                expire: {
                    intervalToExpire: document.querySelector('field-select-component[input-id="demo-intervaltoexpire"]').value
                }
            });
        }
    }

    return accessTokenPayload;
}

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

const expireType = document.querySelector('field-select-component[input-id="demo-expiretype"]');
const secondsToExpire = document.querySelector("#demo-secondstoexpire");
const intervalToExpire = document.querySelector('field-select-component[input-id="demo-intervaltoexpire"]');

expireType.addEventListener("change", () => {
    if (expireType.value === "Seconds to Expire") {
        secondsToExpire.closest('.field-row').classList.remove('hidden');
        intervalToExpire.closest('.field-row').classList.add('hidden');
    }
    else if (expireType.value === "Interval to Expire") {
        secondsToExpire.closest('.field-row').classList.add('hidden');
        intervalToExpire.closest('.field-row').classList.remove('hidden');
    }
});
}