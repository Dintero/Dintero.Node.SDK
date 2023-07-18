YARN?=yarn --silent
YARN_SCRIPTS=build test lint

node_modules: package.json yarn.lock
	@$(YARN) install
	@touch $@

.PHONY: $(YARN_SCRIPTS)
$(YARN_SCRIPTS): node_modules
	@$(YARN) $@
