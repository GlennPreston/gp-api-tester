{
let profilesConfig = '';
let profiles = [];
let selectedId = 'default';

// -------------------------------------------------------------------------
// Elements
// -------------------------------------------------------------------------

const profileList = document.querySelector('.profile-list');
const profileDetailEmpty = document.querySelector("#profile-detail-empty");
const profileDetailForm = document.querySelector("#profile-detail-form");
const profileDetailTitle = document.querySelector("#profile-detail-title");
const profileName = document.querySelector("#profile-name");
const profileAppId = document.querySelector("#profile-app-id");
const profileAppKey = document.querySelector("#profile-app-key");
const profileAccount = document.querySelector("#profile-account");
const profileCurrency = document.querySelector("#profile-currency");
const profileCountry = document.querySelector("#profile-country");
const btnAdd = document.querySelector("#profile-add");
const btnSave = document.querySelector("#profile-save");
const btnDelete = document.querySelector("#profile-delete");
const modalDelete = document.querySelector("#profile-delete-modal");
const btnDeleteCancel = document.querySelector("#profile-delete-cancel");
const btnDeleteConfirm = document.querySelector("#profile-delete-confirm");
const profileFeedback = document.querySelector("#profile-feedback");

// -------------------------------------------------------------------------
// Init
// -------------------------------------------------------------------------

async function init() {
	profilesConfig = await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-read.php');
	profiles = profilesConfig.profiles || [];
	selectedId = profilesConfig.activeId || null;
	renderList();
	renderDetails(selectedId);
}

init();

// -------------------------------------------------------------------------
// Render
// -------------------------------------------------------------------------

function renderList() {
    profileList.innerHTML = profiles.map(p => `
        <button class="profile-list-item ${p.id === selectedId ? 'selected' : ''}" data-id="${p.id}">
            <span class="profile-list-item-name">${p.name}</span>
        </button>
    `).join('');

    profileList.querySelectorAll('.profile-list-item').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedId = btn.dataset.id;
            renderList();
            renderDetails(selectedId);
        });
    });
}

function renderDetails(id) {
    const profile = profiles.find(p => p.id === id);
    const visible = Boolean(profile);

    profileDetailEmpty.classList.toggle('hidden', visible);
    profileDetailForm.classList.toggle('hidden', !visible);
    btnSave.classList.toggle('hidden', !visible);
    btnDelete.classList.toggle('hidden', !visible);
    hideFeedback();

    if (!profile) return;

    profileDetailTitle.textContent = profile.name;
    profileName.value = profile.name || '';
    profileAppId.value = profile.appId || '';
    profileAppKey.value = profile.appKey || '';
    profileAccount.value = profile.account || '';
    profileCurrency.value = profile.currency || '';
    profileCountry.value = profile.country || '';
}

// ---------------------------------------------------------------------------
// Event Listeners
// ---------------------------------------------------------------------------

// Add new profile
btnAdd.addEventListener('click', async () => {
	selectedId = null;
	renderList();

	profileDetailTitle.innerHTML = '*New Profile*';
	profileName.value = '';
	profileAppId.value = '';
	profileAppKey.value = '';
	profileAccount.value = '';
	profileCurrency.value = '';
	profileCountry.value = '';

	profileDetailEmpty.classList.add('hidden');
    profileDetailForm.classList.remove('hidden');
    btnSave.classList.remove('hidden');
    btnDelete.classList.add('hidden');
	btnDelete.classList.add('hidden');
    hideFeedback();
	profileName.focus();
});

// Save profile
btnSave.addEventListener('click', async () => {
	const name = profileName.value.trim();
    if (!name) { profileName.focus(); showFeedback('Profile name is required.', 'error'); return; }

    setLoading(btnSave, true);

	if (!selectedId) {
		selectedId = crypto.randomUUID();
        profiles.push({ id: selectedId });
	}

	const profile = profiles.find(p => p.id === selectedId);
    profile.name = profileName.value.trim();
    profile.appId = profileAppId.value.trim();
    profile.appKey = profileAppKey.value.trim();
    profile.account = profileAccount.value.trim();
    profile.currency = profileCurrency.value.trim();
    profile.country = profileCountry.value.trim();

	await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-write.php', profilesConfig);

	renderList();
	renderDetails(selectedId);
	showFeedback('Saved', 'success');
    setLoading(btnSave, false);
});

// Delete profile
btnDelete.addEventListener('click', () => {
	modalDelete.style.display = "flex";
});

btnDeleteCancel.addEventListener("click", () => {
    modalDelete.style.display = "none";
});

btnDeleteConfirm.addEventListener("click", async () => {
    modalDelete.style.display = "none";

	profiles = profiles.filter(profile => profile.id !== selectedId);
	profilesConfig.profiles = profiles;
    selectedId = null;

	await callProxy(BASE_URL + '_scripts/php/_proxy-profiles-write.php', profilesConfig);

	renderList();
	renderDetails(null);
	showFeedback('Deleted', 'success');
});

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function setLoading(btn, on) {
    btn.disabled = on;
    btn.querySelector('.btn-text').classList.toggle('hidden', on);
    btn.querySelector('.btn-spinner').classList.toggle('hidden', !on);
}

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