#!/usr/bin/perl

# -- Fetch Remote File into Cache, written by Rene K. Mueller <spiritdude@gmail.com>
#
$VERSION = '0.002';
#
# History:
# 2013/03/31: 0.002: checking content, enforcing jscad, scad or stl
# 2013/03/30: 0.001: first version

use CGI;

my $dir = 'cache';
my $q = new CGI;
my $maxSize = 10_000_000;

cacheLocal($q->param('url'));

opendir(D,$dir);
foreach(readdir(D)) {
   next if(/^\./);
   if((stat("$dir/$_"))[9]<(time()-24*60*60)) {
      unlink("$dir/$_");
   }
}
closedir(D);

sub cacheLocal {
   my($u) = @_;
   my($fn) = ($u=~/\/([^\/]+)$/);
   my($local) = time()."-".sprintf("%05d",rand()*10_000);
   my($ext) = ($fn=~/\.([^\.]+)$/);

   if($ext eq 'jscad'||$ext eq 'scad'||$ext eq 'stl') {
      ;     # -- valid
   } else {
      $ext = 'jscad';
   }
   $local = "$dir/$local.$ext";
   
   $fn =~ s/\.\.//g;
   $fn =~ s/[\\'"]//g;
   $fn =~ s/[^!-~\s]//g;      # -- non-ascii away
   
   if(fork()==0) {
      exec('curl','--max-filesize',$maxSize,'--max-time',60,'-s',$u,'-o',"$local");
   } else { 
      wait;
   }
   open(F,$local);
   $_ = <F>;      # -- one-line (could be a lot, needs fixing)
   if($ext eq 'jscad'&&/^\/\/!OpenSCAD/i) {     # -- content is SCAD?
      my $new = $local; 
      $fn =~ s/\.jscad$/.scad/;     # -- filename
      $new =~ s/\.jscad$/.scad/;    # -- internal cache
      rename($local,$new);
      $local = $new;
   }
   close(F);
   print "Content-type: text/plain\n\n";
   print "{ \"filename\": \"$fn\", \"file\": \"$local\" }\n";
}   
