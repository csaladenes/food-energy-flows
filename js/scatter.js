/*This software is released under the MIT License

Copyright (C) 2015 Denes Csala http://www.csaladen.es

This website accompanies the research paper entitled
A Net Energy-based Target Setting for a Climate-constrained Energy Transition 
by Sgouris Sgouridis, Ugo Bardi & Denes Csala

*/

//set global database path
////////////
//DEPRECATED
////////////
//var datapath = "https://dl.dropboxusercontent.com/u/333992592/Food-Energy/"  //old MIT dropbox
//var datapath = "https://dl.dropboxusercontent.com/u/531697/datarepo/Food-Energy/" //default
//var datapath = "http://food.csaladen.es/"  //if data on github server
//var datapath = "" //for local testing
////////////////////
//NEW DYNAMIC METHOD
///////////////////
//check if in dev mode and on local server
var datapath =  ((window.location.hostname=='localhost')
				?'http://localhost:7000/'
				:"https://dl.dropboxusercontent.com/u/531697/datarepo/"
				)
				+'Food-Energy/';
//////////////////

//<!--DYNAMIC SELECTORS-->

d3.select("#main").style("width", Math.min(document.getElementById("chart").offsetWidth - 40, document.getElementById("chart").offsetHeight*1.28));

var dropdown2 = d3.select("#json_sources2");
var dropdown3 = d3.select("#json_sources3");
var scrollscatter=function(a){};

d3.json(datapath+"json/countries.json", function(d) {
	dropdown2.selectAll("option").remove();
    for (var key in d.countries) {
        dropdown2.append("option").text(d.countries[key]);
    };
	dropdown2.node().value="~ World"; //select initial country, optional, otherwise defaults to first entry in list
	
	for (var i=1961;i<2012;i++) {
        dropdown3.append("option").text(i);
    };
	dropdown3.node().value=2010;
	
	d3.select("#main").attr("src",datapath+"plots/"+dropdown2.node().value+"_energy"+themeid+".png");
	
	var source=function(){
	var genders = document.getElementsByName("r11");
	for(var i = 0; i < genders.length; i++) {
	   if(genders[i].checked == true) {
		   selectedGender = genders[i].value;
	   }
	 }
	 return selectedGender;
	}
	
	var source2=function(){
	var genders = document.getElementsByName("r12");
	for(var i = 0; i < genders.length; i++) {
	   if(genders[i].checked == true) {
		   selectedGender = genders[i].value;
	   }
	 }
	 return selectedGender;
	}
	
	var dr2=true;	
	
	var dropdown2click=function(){dr2=true;d3.select("#main").attr("src",datapath+"plots/"+dropdown2.node().value+"_energy"+themeid+".png");};
	var dropdown3click=function(){dr2=false;d3.select("#main").attr("src",datapath+"plots/"+dropdown3.node().value+"_log"+source2()+"_"+source()+themeid+".png");};
	var dropdown3plus=function(){
		dropdown3.node().selectedIndex=Math.min(dropdown3.node().length-1,dropdown3.property("selectedIndex")+1);
		dropdown3click();
	};
	var dropdown3minus=function(){
		dropdown3.node().selectedIndex=Math.max(0,dropdown3.property("selectedIndex")-1);
		dropdown3click();
	};
	var dropdown2plus=function(){
		dropdown2.node().selectedIndex=Math.min(dropdown2.node().length-1,dropdown2.property("selectedIndex")+1);
		dropdown2click();
	};
	var dropdown2minus=function(){
		dropdown2.node().selectedIndex=Math.max(0,dropdown2.property("selectedIndex")-1);
		dropdown2click();
	};
	
	dropdown2.on("change", dropdown2click);
	dropdown2.on("click", dropdown2click);
	dropdown3.on("change", dropdown3click);
	dropdown3.on("click", dropdown3click);
	
	d3.select("#json_sources3_minus").on("click", dropdown3minus);
	d3.select("#json_sources3_plus").on("click", dropdown3plus);
	
	scrollscatter=function(a){
		if (a<0) {
			if (dr2) dropdown2plus()
			else  dropdown3plus()
		}
		else {
			if (dr2) dropdown2minus()
			else  dropdown3minus()
		}
	}
	
	d3.selectAll(".r11").on("click", function(){dr2=false;d3.select("#main").attr("src",datapath+"plots/"+dropdown3.node().value+"_log"+source2()+"_"+source()+themeid+".png");});
	d3.selectAll(".r12").on("click", function(){dr2=false;d3.select("#main").attr("src",datapath+"plots/"+dropdown3.node().value+"_log"+source2()+"_"+source()+themeid+".png");});
});