VERSION=0.014
LIB = /usr/local/lib/openjscad/
NODE_MODULES = /usr/local/lib/node_modules/

all::
	@echo "make install deinstall tests clean" 

install::
	test -d ${NODE_MODULES}/openscad-openjscad-translator || sudo npm -g install openscad-openjscad-translator
	sudo scp openjscad /usr/local/bin/
	sudo mkdir -p ${LIB}
	sudo scp *.js ${LIB}
	mkdir -p cache; chmod a+rw cache
                                
deinstall::
	sudo rm -rf ${NODE_MODULES}/openscad-openjscad-translator
	sudo rm -f ${LIB}/*.js 

tests::
	openjscad examples/example000.jscad
	openjscad examples/example001.jscad
	openjscad examples/example001.jscad -o examples/example001-fromJSCAD.stl
	openjscad examples/example001.scad -o examples/example001-fromSCAD.stl
	openjscad examples/example001.scad -o examples/example001-fromSCAD.jscad
	cd examples/example050 && make
	cd examples/example051 && make
	# -- enable if you have openscad installed ('unsetenv DISPLAY' perhaps too)
	# openscad examples/example001.scad -o examples/example001-fromSCADviaOpenSCAD.stl

clean::
	rm -f examples/example000.stl examples/example001.stl examples/example001-from*
	cd examples/example050 && make clean
	cd examples/example051 && make clean

# TODO:                                        
# - locally submodule of openscad-openjscad-translator, see http://git-scm.com/book/en/Git-Tools-Submodules

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
	dee4 index.html Makefile README.md *.css *.js openjscad

live::
	# -- do not enable --delete is it will destroy stats folder
	rsync -av --exclude=.git --exclude=cache/ ./ the-labs.com:Sites/openjscad.org/ 
