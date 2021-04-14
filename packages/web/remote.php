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
   // only process valid requests
   $valid = strncmp($url, "http://", 7) || strncmp($url, "https://", 8);
   if (! $valid) return;

   $contents = file_get_contents($url);

   $fileName = basename($url); // FIXME a default extension needs to be added
   $filePath = CACHE_PATH . "/".date("ymdHms")."-".$fileName;
   file_put_contents("./".$filePath, $contents);

   $data = array(
      'filename' => $fileName,
      'file'     => $filePath,
      'url'      => $url
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
