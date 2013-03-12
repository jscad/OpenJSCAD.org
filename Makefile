VERSION=0.006
LIB = /usr/local/lib/openjscad/

all::
	@echo "make install deinstall" 


install::
	sudo scp openjscad /usr/local/bin/
	sudo mkdir -p ${LIB}
	sudo scp *.js ${LIB}
                                
deinstall::
	sudo rm -f ${LIB}/*.js 
                                        
# --- developers only below

push::
	git remote set-url origin git@github.com:Spiritdude/OpenJSCAD.org.git
	git push -u origin master

pull::
	git remote set-url origin git@github.com:Spiritdude/OpenJSCAD.org.git
	git pull -u origin master

dist::	
	cd ..; tar cfz Backup/openjscad.org-${VERSION}.tar.gz "--exclude=*.git/*" OpenJSCAD.org/

backup::	
	scp ../Backup/openjscad.org-${VERSION}.tar.gz the-labs.com:Backup/

edit::
	dee4 index.html Makefile README.md *.css *.js
