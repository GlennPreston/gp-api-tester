{
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");
const responseBlock = document.querySelector(".response-block-outer");

const submitComponent = document.querySelector("submit-button-component");

const dropinuiBlock = document.querySelector(".drop-in-ui");
const dropinuiSpinner = document.getElementById("drop-in-ui-spinner");

submitComponent.addEventListener("click", async () => {
    hideResponseBlock(responseBlockEmpty, responseBlockContent, responseBlock);
    dropinuiBlock.style.visibility = 'hidden';
    dropinuiSpinner.classList.remove('hidden');

    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
        console.log(accessTokenResponseData);
        
        if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
            initDropInUI(accessTokenResponseData.response.body.token);
        }
        else {
            throw new Error(JSON.stringify(accessTokenResponseData));
        }
    } catch (err) {
        console.log('Error: ' + JSON.stringify(JSON.parse(err.message).response.body));
        dropinuiBlock.classList.add("hidden");
        dropinuiSpinner.classList.add("hidden");
        showResponseBlock(JSON.parse(err.message).response.body, responseBlockEmpty, responseBlockContent, responseBlock);
    } finally {
        submitComponent.setLoading(false);
    }
});


// Payload for Create Access Token request
function accessTokenPayload() {
    const appID = document.querySelector("#demo-app-id").value.trim();
	const appKey = document.querySelector("#demo-app-key").value.trim();
    const permissions = [
        "PMT_POST_Create_Single"
    ]

    const accessTokenPayload = {
        appID,
        appKey,
        permissions
    }

    return accessTokenPayload;
}

// -------------------------------------------------------------------------
// Hosted Fields
// -------------------------------------------------------------------------

let cardForm = null;
const cardFormContainer = document.querySelector("#credit-card-form");

function initCardForm() {
    return GlobalPayments.creditCard.form("#credit-card-form", {
        style: "gp-default"
    });
}

function initDropInUI(accessToken = '') {
    if(cardForm != null) {
        cardForm = null;
        cardFormContainer.innerHTML = "";
    }

    // configuring Hosted Fields
    if(accessToken != '') {
        GlobalPayments.configure({
            accessToken: accessToken,
            apiVersion: "2021-03-22",
            env: "sandbox" // or "production"
        });
    }

    // Unhide before reinit so iframes can measure their container.
    // visibility:hidden keeps layout intact without showing empty fields.
    dropinuiBlock.style.visibility = 'hidden';
    dropinuiBlock.classList.remove('hidden');
    dropinuiSpinner.classList.remove('hidden');
    cardForm = initCardForm();

    // method to notify that hosted fields have been initialized
    cardForm.ready(() => {
        console.log("Registration of all credit card fields occurred");
        dropinuiSpinner.classList.add('hidden');
        dropinuiBlock.style.visibility = 'visible';
        slowScrollTo(document.querySelector(".content"), dropinuiBlock, 1000);
    });
   
    // Display the tokenisation response in the response block instead of
    // submitting the form — this is a test tool, not a checkout page.
    cardForm.on("token-success", (resp) => {
        console.log(resp);
        showResponseBlock(resp, responseBlockEmpty, responseBlockContent, responseBlock);
    });

    // add error handling if token generation is not successful
    cardForm.on("token-error", (resp) => {
        // TODO: Add your error handling
        console.log(resp);
        showResponseBlock(resp, responseBlockEmpty, responseBlockContent, responseBlock);
    });

    // field-level event handlers. example:
    cardForm.on("card-number", "register", () => {
        console.log("Registration of Card Number occurred");
    });
}
}