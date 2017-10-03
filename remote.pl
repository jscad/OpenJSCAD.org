#!/usr/bin/perl

# -- Fetch Remote File into Cache, written by Rene K. Mueller <spiritdude@gmail.com>
#
$VERSION = '0.005';
#
# History:
# 2017/09/23: 0.005: fix vulnerability: disallow file://
# 2017/03/20: 0.004: allows insecure ssl connections (invalid/outdated ssl)
# 2013/04/08: 0.003: support of amf
# 2013/03/31: 0.002: checking content, enforcing jscad, scad or stl
# 2013/03/30: 0.001: first version

use CGI;

my $dir = 'cache';
my $q = new CGI;
my $maxSize = 10_000_000;     # [bytes], max size of file
my $maxTime = 60;             # [s], max download time

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

   return unless($u=~/^https?:\/\//i);                # -- must be http:// or https://

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
      exec('curl',
         '-k',                         # -- allow insecure ssl connections (invalid certs)
         '-L',                         # -- follow redirects (e.g. thingiverse.com)
         '--max-filesize',$maxSize,    # -- max file size
         '--max-time',$maxTime,        # -- max time of download
         '-s',$u,                      # -- server with URL
         '-o',"$local");               # -- save locally
   } else { 
      wait;
   }
   my $extNew;
   my $buff;
   
   open(F,$local);
   read(F,$buff,1024);
   
   if($ext eq 'jscad'&&$buff=~/^\/\/!OpenSCAD/i) {     # -- content is SCAD?
      $extNew = 'scad';

   } elsif($ext eq 'jscad'&&($buff=~/^<\?xml/i&&$buff=~/[\n\r]<amf/)) {    # -- content is AMF?
      $extNew = 'amf';

   } elsif($ext eq 'jscad'&&($buff=~/^solid/i||-B $buff||$buff=~/\0/)) {   # -- content is STL?
      $extNew = 'stl';
   }

   if($extNew) {
      my $new = $local; 
      $fn =~ s/\.jscad$/.$extNew/;     # -- filename
      $new =~ s/\.jscad$/.$extNew/;    # -- internal cache
      rename($local,$new);
      $local = $new;
   }
   close(F);
   $u =~ s/(["\\])/\\$1/g;
   print "Content-type: text/plain\n\n";
   print "{ \"filename\": \"$fn\", \"file\": \"$local\", \"url\": \"$u\" }\n";
}   
