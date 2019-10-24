<?php
$html = file_get_contents('http://tidebh.kaynuy.com'); //get the html returned from the following url

$tidebh_doc = new DOMDocument();

libxml_use_internal_errors(TRUE); //disable libxml errors

if(!empty($html)){ //if any html is actually returned

	$tidebh_doc->loadHTML($html);
	
	libxml_clear_errors(); //remove errors for yucky html
	
	$tidebh_xpath = new DOMXPath($tidebh_doc);

	//get all the h2's with an id
	$tidebh_row = $tidebh_xpath->query('//p[@id]');

	if($tidebh_row->length > 0){
		foreach($tidebh_row as $row){
			echo $row->nodeValue . "<br/>";
		}
	}
		
}
?>