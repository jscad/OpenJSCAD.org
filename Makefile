VERSION = 0.5.2
LIB = /usr/local/lib/openjscad/
NODE_MODULES = /usr/local/lib/node_modules/

all::
	@echo "make install deinstall tests clean" 

install::
	test -d ${NODE_MODULES}/openscad-openjscad-translator || sudo npm -g install openscad-openjscad-translator
	#test -d ${NODE_MODULES}/jquery || sudo npm -g install jquery
	sudo scp openjscad /usr/local/bin/
	sudo mkdir -p ${LIB}
	sudo scp *.js ${LIB}
	mkdir -p cache; chmod a+rw cache
                                
deinstall::
	sudo rm -rf ${NODE_MODULES}/openscad-openjscad-translator
	sudo rm -f ${LIB}/*.js 

tests::
	openjscad examples/logo.jscad
	openjscad examples/logo.jscad -of stlb -o examples/logo-binary.stl
	openjscad examples/logo.jscad -of amf
	openjscad examples/logo.amf -o examples/logo-fromAMF.jscad
	openjscad examples/example001.jscad
	openjscad examples/example001.jscad -o examples/example001-fromJSCAD.stl
	openjscad examples/example001.jscad -o examples/example001-fromJSCAD.amf
	openjscad examples/example001.scad -o examples/example001-fromSCAD.stl
	openjscad examples/example001.scad -o examples/example001-fromSCAD.amf
	openjscad examples/example001.scad -o examples/example001-fromSCAD.jscad
	openjscad examples/transparency.jscad -o examples/transparency.amf
	cd examples/platonics && make
	cd examples; openjscad globe.jscad
	cd examples/include-test && make
	# -- enable if you have openscad installed ('unsetenv DISPLAY' perhaps too)
	# openscad examples/example001.scad -o examples/example001-fromSCADviaOpenSCAD.stl
	openjscad examples/name_plate.jscad --name "Just Me" --title "Geek" -o examples/JustMe_Geek_name_plate.amf
	openjscad examples/benchmark.jscad

clean::
	rm -f examples/logo.stl examples/logo-binary.stl examples/example001.stl examples/example001-from* examples/benchmark.stl
	cd examples/platonics && make clean
	cd examples/include-test && make clean

# TODO:                                        
# - locally submodule of openscad-openjscad-translator, see http://git-scm.com/book/en/Git-Tools-Submodules

# --- developers only below

push::
	git remote set-url origin git@github.com:Spiritdude/OpenJSCAD.org.git
	git push -u origin master

push-dev::
	git remote set-url origin git@github.com:Spiritdude/OpenJSCAD.org.git
	git push -u origin dev

pull::
	git remote set-url origin git@github.com:Spiritdude/OpenJSCAD.org.git
	git pull -u origin master

dev-to-master::
	git checkout dev
	git merge -s ours master
	git checkout master
	git merge dev

master-to-dev::
	git checkout master
	git merge -s ours dev
	git checkout dev
	git merge master

dist::	
	cd ..; tar cfz Backup/openjscad.org-${VERSION}.tar.gz "--exclude=*.git/*" OpenJSCAD.org/

backup::	
	scp ../Backup/openjscad.org-${VERSION}.tar.gz the-labs.com:Backup/

edit::
	dee4 index.html Makefile LICENSE README.md *.css *.js openjscad

live::
	# -- do not enable --delete as it will destroy stats folder
	rsync -av --exclude=.git --exclude=cache/ ./ delta:Sites/openjscad.org/ 
