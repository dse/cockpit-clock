default: FORCE
	@echo make publish

publish: FORCE
	ssh dse@webonastick.com '(cd git/dse.d && [[ -e cockpit-clock ]] || git clone git@github.com:dse/cockpit-clock.git)'
	ssh dse@webonastick.com '(cd git/dse.d/clocks.d/cockpit-clock && git pull)'

.PHONY: FORCE
