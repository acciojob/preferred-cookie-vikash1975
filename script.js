//your JS code here. If required.

function setCookie(name,value,days=365){
	const date=new Date();
	date.setTime(date.getTime()+days * 24 * 60 * 60 *1000);
	document.cookie=`${name}=${value};expires=${date.toUTCString()};path=/`;
	
}

function getCookie(name){
	const cookieArr=document.cookie.split("; ");
	for(let cookie of cookieArr){
		const [key,val]= cookie.split("=");
		if(key===name) return val;
	}
	return null;
} 


function applyFontSettings(fontSize,fontColor) {
	document.documentElement.style.setProperty("--fontsize",fontSize+"px");
	document.documentElement.style.setProperty("--fontcolor", fontColor);
	
}
window.addEventListener("DOMContentLoaded",()=>{
	const savedFontSize=getCookie("fontsize");
	const savedFontColor=getCookie("fontcolor");

	if(savedFontSize)document.getElementById("fontsize").value=savedFontSize;
	if(savedFontColor)document.getElementById("fontcolor").value=savedFontColor;

	applyFontSettings(savedFontSize || 16, savedFontColor || "#000000");
});

document.querySelector("form").addEventListener("submit",(e)=>{
	e.preventDefault();

	
  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save in cookies
  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  // Apply to CSS variables immediately
  applyFontSettings(fontSize, fontColor);

  alert("Preferences saved!");
});

