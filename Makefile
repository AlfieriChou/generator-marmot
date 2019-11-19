########################################################
major:
	@yarn run release -- --release-as major
	@git push --follow-tags origin master
	@npm publish

minor:
	@yarn run release -- --release-as minor
	@git push --follow-tags origin master
	@npm publish

release:
	@yarn run release -- --release
	@git push --follow-tags origin master
	@npm publish