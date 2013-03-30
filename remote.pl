#!/usr/bin/perl

# -- Fetch Remote File into Cache, written by Rene K. Mueller <spiritdude@gmail.com>
#
$VERSION = '0.001';
#
# History:
# 2013/03/30: first version

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

   $ext = '.jscad' unless($ext);
   $local = "$dir/$local.$ext";
   
   $fn =~ s/\.\.//g;
   $fn =~ s/[\\'"]//g;
   $fn =~ s/[^!-~\s]//g;      # -- non-ascii away
   
   if(fork()==0) {
      exec('curl','--max-filesize',$maxSize,'--max-time',60,'-s',$u,'-o',"$local");
   } else { 
      wait;
   }
   print "Content-type: text/plain\n\n";
   print "{ \"filename\": \"$fn\", \"file\": \"$local\" }\n";
}   
