YARN?=yarn --silent
YARN_SCRIPTS=build test lint

help:
	@printf "\033[36m%-30s\033[0m %s\n" "$(YARN_SCRIPTS)" "run yarn scripts"
	@printf "\033[36m%-30s\033[0m %s\n" "convert-spec" "convert latest version of spec to types"

node_modules: package.json yarn.lock
	NODE_OPTIONS="--no-warnings=DEP0169" $(YARN) config set enableScripts false
	NODE_OPTIONS="--no-warnings=DEP0169" $(YARN) install --frozen-lockfile
	@touch $@

dependencies: node_modules

.PHONY: $(YARN_SCRIPTS)
$(YARN_SCRIPTS): node_modules
	NODE_OPTIONS="--no-warnings=DEP0169" $(YARN) $@ $(ARGS)

convert-spec:
	NODE_OPTIONS="--no-warnings=DEP0169" $(YARN) $@
