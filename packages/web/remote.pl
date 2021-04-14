#!/usr/bin/perl

# -- Fetch Remote File into Cache, written by Rene K. Mueller <spiritdude@gmail.com>
#
$VERSION = '0.006';
#
# History:
# 2020/09/26: 0.006: support all V2 formats, fix for unknown extension
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

  return unless($u=~/^https?:\/\//i);  # -- must be http:// or https://

  my($fn) = ($u=~/\/([^\/]+)$/);
  my($local) = time()."-".sprintf("%05d",rand()*10_000);
  my($ext) = ($fn=~/\.([^\.]+)$/);

  my @extensions = ("amf", "dxf", "jscad", "json", "js", "obj", "scad", "stl");
  my @matches = grep { /^$ext$/i } @extensions;
  if(@matches) {
    ;     # -- valid
  } else {
    if ($ext eq "") {
      $fn = $fn . ".unknown"
    }
    $ext = 'unknown';
  }
  $local = "$dir/$local.$ext";

  $fn =~ s/\.\.//g;
  $fn =~ s/[\\'"]//g;
  $fn =~ s/[^!-~\s]//g;   # -- non-ascii away

  if(fork()==0) {
    exec('curl',
         '-k',                       # -- allow insecure ssl connections (invalid certs)
         '-L',                       # -- follow redirects (e.g. thingiverse.com)
         '--max-filesize',$maxSize,  # -- max file size
         '--max-time',$maxTime,      # -- max time of download
         '-s',$u,                    # -- server with URL
         '-o',"$local");             # -- save locally
  } else {
    wait;
  }
  my $buff;

  open(F,$local);
  read(F,$buff,1024);
  close(F);

  # determin type from file contents if necessary
  my $extNew;
  if ($ext eq 'unknown') {
    if($buff=~/^<\?xml/i && $buff=~/[\n\r]<amf/) {   # -- content is AMF?
      $extNew = 'amf';
    } elsif($buff=~/[\n\r] *0[\n\r]+SECTION[\n\r]+ *2[\n\r]+HEADER/) {   # -- content is DXF?
      $extNew = 'dxf';
    } elsif($buff=~/require\(/) {   # -- content is JS?
      $extNew = 'js';
    } elsif($buff=~/mtllib/ || $buff=~/usemtl/) {   # -- content is OBJ?
      $extNew = 'obj';
    } elsif($buff=~/^\/\/!OpenSCAD/i) {   # -- content is SCAD?
      $extNew = 'scad';
    } elsif($buff=~/^<\?xml/i && $buff=~/[\n\r]<svg/) {   # -- content is SVG?
      $extNew = 'svg';
    } elsif($buff=~/^solid/i || -B $buff || $buff=~/\0/) {   # -- content is STL?
      $extNew = 'stl';
    }
  }
  if($extNew) {
    my $new = $local;
    $ext = $extNew;
    $fn =~ s/\.unknown$/.$ext/;     # -- filename
    $new =~ s/\.unknown$/.$ext/;    # -- internal cache
    rename($local,$new);
    $local = $new;
  }

  $u =~ s/(["\\])/\\$1/g;

  if ($ext ne 'unknown') {
    print "Content-type: text/plain\n\n";
    print "{ \"filename\": \"$fn\", \"file\": \"$local\", \"url\": \"$u\" }\n";
  }
}
