{
let profilesConfig = '';
let profiles = [];

// Get profiles on load
init();
async function init() {
	await getProfilesConfig();
	displayProfiles();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Get user's saved params from config
async function getProfilesConfig() {
	profilesConfig = await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-read.php');
	profiles = profilesConfig.profiles;
}

// Display profiles
async function displayProfiles() {
	console.log(profilesConfig);

	profiles.forEach((profile, index) => {
		document.querySelector(".profile-list").insertAdjacentHTML(
			"beforeend",
			`
			<button class="profile-list-item${index === 0 ? " selected" : ""}" data-id="${profile["id"]}">
				<span class="profile-list-item-name">${profile["name"]}</span>
			</button>
			`
		);
	});

	// Right: detail / edit panel
	document.querySelector("#profile-detail-title").innerHTML = profiles[0]['name'];
	document.querySelector("#profile-name").value = profiles[0]['name'];
	document.querySelector("#profile-app-id").value = profiles[0]['appId'];
	document.querySelector("#profile-app-key").value = profiles[0]['appKey'];
	document.querySelector("#profile-account").value = profiles[0]['account'];
	document.querySelector("#profile-currency").value = profiles[0]['currency'];
	document.querySelector("#profile-country").value = profiles[0]['country'];
}


// Switch profile
}