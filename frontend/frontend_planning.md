# Component Hierarchy:
- App
	- NavBar
		- AccountDisplay
			- Avatar
		- TextSearchBar
		- ImageUploadButton
		- SearchButton
	- ContentDisplayRegion
		- ImageCard
			- CardHeader
				- Avatar
			- CardMedia

# Data:
- current user profile picture and name (hard coded)
- search text (state)
- search image (state)
- relevant photos with the poster and posted date (state)

# Where state lives:
- App (relevant photos with the poster and posted date)
	- NavBar
		- AccountDisplay
			- Avatar
		- TextSearchBar (search text)
		- ImageUploadButton (search image)
		- SearchButton
	- ContentDisplayRegion
		- ImageCard
			- CardHeader
				- Avatar
			- CardMedia

