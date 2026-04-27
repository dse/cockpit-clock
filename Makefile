publish: FORCE
	ssh dse@webonastick.com '(cd git/dse.d/cockpit-clock && git pull)'

.PHONY: FORCE
