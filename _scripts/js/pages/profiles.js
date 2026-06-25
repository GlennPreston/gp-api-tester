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
// Functions
// ---------------------------------------------------------------------------

// Get user's saved params from config
async function getProfilesConfig() {
	profilesConfig = await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-read.php');
	profiles = profilesConfig.profiles;
	selectedId = profilesConfig.activeId;
}

// Display profiles
async function displayProfiles() {
	console.log(profilesConfig);

	profiles.forEach((profile) => {
		document.querySelector(".profile-list").insertAdjacentHTML(
			"beforeend",
			`
			<button class="profile-list-item${profile["id"] === selectedId ? " selected" : ""}" data-id="${profile["id"]}">
				<span class="profile-list-item-name">${profile["name"]}</span>
			</button>
			`
		);
	});

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
}