YARN?=yarn --silent
YARN_SCRIPTS=build test lint

help:
	@printf "\033[36m%-30s\033[0m %s\n" "$(YARN_SCRIPTS)" "run yarn scripts"

node_modules: package.json yarn.lock
	@$(YARN) install
	@touch $@

test: ARGS:=--coverage
.PHONY: $(YARN_SCRIPTS)
$(YARN_SCRIPTS): node_modules
	@$(YARN) $@ $(ARGS)
