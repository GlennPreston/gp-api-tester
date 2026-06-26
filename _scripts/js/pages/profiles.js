{
let profilesConfig = '';
let profiles = [];
let selectedId = 'default';

// -------------------------------------------------------------------------
// Elements
// -------------------------------------------------------------------------

const profileDetailTitle = document.querySelector("#profile-detail-title");
const profileName = document.querySelector("#profile-name");
const profileAppId = document.querySelector("#profile-app-id");
const profileAppKey = document.querySelector("#profile-app-key");
const profileAccount = document.querySelector("#profile-account");
const profileCurrency = document.querySelector("#profile-currency");
const profileCountry = document.querySelector("#profile-country");

const btnSave = document.querySelector("#profile-save");

const profileFeedback = document.querySelector("#profile-feedback");

// -------------------------------------------------------------------------
// Init
// -------------------------------------------------------------------------

async function init() {
	await getProfilesConfig();
	displayProfiles();
}

// Get profiles on load
init();

// ---------------------------------------------------------------------------
// Read functions
// ---------------------------------------------------------------------------

// Get user's saved params from config
async function getProfilesConfig() {
	profilesConfig = await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-read.php');
	profiles = profilesConfig.profiles;
	selectedId = profilesConfig.activeId;
}

// Display profiles
function displayProfiles() {
	console.log(profilesConfig);

	// Left: profile list
	/*profiles.forEach((profile) => {
		document.querySelector(".profile-list").insertAdjacentHTML(
			"beforeend",
			`
			<button class="profile-list-item${profile["id"] === selectedId ? " selected" : ""}" data-id="${profile["id"]}">
				<span class="profile-list-item-name">${profile["name"]}</span>
			</button>
			`
		);
	});*/

	document.querySelector(".profile-list").innerHTML = profiles.map(profile => `
        <button class="profile-list-item${profile["id"] === selectedId ? ' selected' : ''}" data-id="${profile["id"]}">
            <span class="profile-list-item-name">${profile["name"]}</span>
        </button>
    `).join('');

	// Right: detail / edit panel
	showProfileDetails();

	// Add click listeners to profile buttons
	document.querySelectorAll('.profile-list-item').forEach(btn => {
        btn.addEventListener('click', () => viewProfile(btn.dataset.id));
    });
}


function viewProfile(id) {
	selectedId = id;

	setSelectedProfileList();
	showProfileDetails();
}

// Set selected profile in profile list column (left column)
function setSelectedProfileList() {
	document.querySelectorAll('.profile-list-item').forEach(btn => {
		if (btn.dataset.id === selectedId) {
			btn.classList.add('selected');
		}
		else {
			btn.classList.remove('selected');
		}
    });
}

// Show details of selected profile in profile details column (right column)
function showProfileDetails() {
	const selectedProfileIndex = getSelectedProfileIndex();

	profileDetailTitle.innerHTML = profiles[selectedProfileIndex]['name'];
	profileName.value = profiles[selectedProfileIndex]['name'];
	profileAppId.value = profiles[selectedProfileIndex]['appId'];
	profileAppKey.value = profiles[selectedProfileIndex]['appKey'];
	profileAccount.value = profiles[selectedProfileIndex]['account'];
	profileCurrency.value = profiles[selectedProfileIndex]['currency'];
	profileCountry.value = profiles[selectedProfileIndex]['country'];
}

function getSelectedProfileIndex() {
	let selectedProfileIndex = 0;

	profiles.forEach((profile, index) => {
		if (profile['id'] === selectedId) {
			selectedProfileIndex = index;
		}
	});

	return selectedProfileIndex;
}

// ---------------------------------------------------------------------------
// Write functions
// ---------------------------------------------------------------------------

btnSave.addEventListener('click', async () => {
	console.log("Saving");
	const name = profileName.value.trim();
    if (!name) { profileName.focus(); showFeedback('Profile name is required.', 'error'); return; }

    btnSave.disabled = true;
    btnSave.querySelector('.btn-text').classList.add('hidden');
    btnSave.querySelector('.btn-spinner').classList.remove('hidden');

	const selectedProfileIndex = getSelectedProfileIndex();

	profiles[selectedProfileIndex]['name'] = profileName.value;
	profiles[selectedProfileIndex]['appId'] = profileAppId.value;
	profiles[selectedProfileIndex]['appKey'] = profileAppKey.value;
	profiles[selectedProfileIndex]['account'] = profileAccount.value;
	profiles[selectedProfileIndex]['currency'] = profileCurrency.value;
	profiles[selectedProfileIndex]['country'] = profileCountry.value;

	profilesConfig.profiles = profiles;

	const saveResponse = await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-write.php', profilesConfig);

	displayProfiles();
	showFeedback('Saved.', 'success');

    btnSave.disabled = false;
    btnSave.querySelector('.btn-text').classList.remove('hidden');
    btnSave.querySelector('.btn-spinner').classList.add('hidden');
});

// -------------------------------------------------------------------------
// Feedback
// -------------------------------------------------------------------------

function showFeedback(msg, type) {
    profileFeedback.textContent = msg;
    profileFeedback.className = `profile-feedback profile-feedback-${type}`;
    profileFeedback.classList.remove('hidden');
    setTimeout(hideFeedback, 2500);
}

function hideFeedback() {
    profileFeedback.classList.add('hidden');
}
}