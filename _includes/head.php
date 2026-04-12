<?php
if (!isset($pageTitle)) {
    $pageTitle = "GP API Tester";
}
?>

<head>
		<title><?= htmlspecialchars($pageTitle) ?></title>
		<base href="<?= BASE_URL ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<script>
			const saved = localStorage.getItem("theme");
			if (saved) document.documentElement.setAttribute("data-theme", saved);
		</script>

		<!-- CSS -->
		<link href="./_css/main.css" rel="stylesheet">

		<!-- Fonts -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
		
		<!-- Components -->
		<script src="./_components/navbar-component.js" type="text/javascript" defer></script>
		<script src="./_components/sidebar-component.js" type="text/javascript" defer></script>
</head>