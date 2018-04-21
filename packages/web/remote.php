<?php
// error_reporting(E_ALL);

define(CACHE_PATH, 'cache');
$maxSize = 10000000;     // [bytes], max size of file
$maxTime = 60;             // [s], max download time
$cacheExpireSeconds = 60;

// echo "Fetching ".$_REQUEST['url'];

retrieveFile($_REQUEST['url']);
cleanUpExpired();

function retrieveFile($url) {
   $contents = file_get_contents($url);
   $f = CACHE_PATH . "/tmp-".time()."-".rand(0,1024*1024)."-".basename($url);
   file_put_contents("./".$f, $contents);
   $data = array(
      'filename'  => basename($url),
      'file'      => CACHE_PATH."/".basename($f),
      'url'    => $url
   );

   echo json_encode ( $data );
}

function cleanUpExpired() {
   // Remove cached files that expired
   $files = glob("".CACHE_PATH."/*");
   foreach($files as $file)
   {
      if(time() - filemtime($file) > $cacheExpireSeconds)
         @unlink($file);
   }
}
