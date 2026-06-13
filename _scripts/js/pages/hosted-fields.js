{
const responseBlockEmpty = document.querySelector(".response-block-body-empty");
const responseBlockContent = document.querySelector(".response-block-body-content");
const responseBlock = document.querySelector(".response-block-outer");

const submitComponent = document.querySelector("submit-button-component");

const hostedfieldsBlock = document.querySelector(".hosted-fields");
const hostedfieldsSpinner = document.getElementById("hosted-fields-spinner");

submitComponent.addEventListener("click", async () => {
    hideResponseBlock(responseBlockEmpty, responseBlockContent, responseBlock);
    hostedfieldsBlock.style.visibility = 'hidden';
    hostedfieldsSpinner.classList.remove('hidden');

    // Send payload to proxy
    submitComponent.setLoading(true);
    try {
        const accessTokenResponseData = await callProxy(BASE_URL + '_scripts/php/_proxy-create-access-token.php', accessTokenPayload());
        console.log(accessTokenResponseData);
        
        if (accessTokenResponseData.response.body.token != null && accessTokenResponseData.response.body.token != "") {
            initHostedFields(accessTokenResponseData.response.body.token);
        }
        else {
            throw new Error(JSON.stringify(accessTokenResponseData));
        }
    } catch (err) {
        console.log('Error: ' + JSON.stringify(JSON.parse(err.message).response.body));
        hostedfieldsBlock.classList.add("hidden");
        hostedfieldsSpinner.classList.add("hidden");
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

// Read resolved CSS variable values from the document so the hosted
// fields iframes (which are cross-origin and can't access our CSS) still
// reflect the current theme colours.
function getBrandColors() {
    const style = getComputedStyle(document.documentElement);
    return {
        brand:       style.getPropertyValue('--brand').trim(),
        brandAccent: style.getPropertyValue('--brand-accent').trim(),
        text:        style.getPropertyValue('--tertiary').trim(),
        border:      style.getPropertyValue('--border-color').trim(),
        secondary:   style.getPropertyValue('--secondary').trim(),
    };
}

// Watch for theme changes and reinitialise the card form with updated colours.
// Only reinitialise if the hosted fields are currently visible (i.e. a token
// has already been issued and the fields are showing).
new MutationObserver(() => {
    if (hostedfieldsBlock.style.visibility === 'visible') {
        hostedfieldsBlock.style.visibility = 'hidden';
        hostedfieldsSpinner.classList.remove('hidden');
        cardForm.dispose();
        cardForm = initCardForm();

        cardForm.ready(() => {
            hostedfieldsSpinner.classList.add('hidden');
            hostedfieldsBlock.style.visibility = 'visible';
        });
    }
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

function initCardForm() {
    const { brand, brandAccent, text, border, secondary } = getBrandColors();
    return GlobalPayments.ui.form({
        fields: {
            "card-number": {
                placeholder: "Card Number",
                target: "#card-number"
            },
            "card-expiration": {
                placeholder: "MM/YYYY",
                target: "#card-expiration"
            },
            "card-cvv": {
                placeholder: "Security Code",
                target: "#card-cvv"
            },
            "card-holder-name": {
                placeholder: "Cardholder Name",
                target: "#card-holder-name"
            },
            "submit": {
                text: "Pay Now", // Change the text of the button
                target: "#submit-button",
                value: "Pay Now"
            }
        },
        styles: {
            "input[type=text], input[type=tel]": {
                "color": text,
                "background-color": secondary,
                "padding": "8px 12px",
                "margin": "4px 0 !important",
                "border": `1px solid ${border}`,
                "border-radius": "8px",
                "font-size": "13px",
                "width": "100%",
                "box-sizing": "border-box",
            },
            "input[type=text]:focus-visible, input[type=tel]:focus-visible": {
                "outline": "none !important",
                "border": `1px solid ${brand}`,
            },
            "button[type=button]": {
                "background-color": brand,
                "color": "white",
                "padding": "10px 24px",
                "border": "none",
                "border-radius": "8px",
                "cursor": "pointer",
                "font-size": "14px",
                "font-weight": "600",
                "width": "100%",
            },
            "button[type=button]:hover": {
                "background-color": brandAccent,
            },
        }
    });
}

function initHostedFields(accessToken) {
    if(cardForm != null) {
        cardForm.dispose();
    }

    // Unhide before reinit so iframes can measure their container.
    // visibility:hidden keeps layout intact without showing empty fields.
    hostedfieldsBlock.style.visibility = 'hidden';
    hostedfieldsBlock.classList.remove('hidden');
    hostedfieldsSpinner.classList.remove('hidden');
    cardForm = initCardForm();

    // configuring Hosted Fields
    GlobalPayments.configure({
        accessToken: accessToken,
        apiVersion: "2021-03-22",
        env: "sandbox" // or "production"
    });
    // method to notify that hosted fields have been initialized
    cardForm.ready(() => {
        console.log("Registration of all credit card fields occurred");
        hostedfieldsSpinner.classList.add('hidden');
        hostedfieldsBlock.style.visibility = 'visible';
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