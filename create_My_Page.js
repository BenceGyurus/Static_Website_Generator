var datas = "";
var ids = new Array;
var last_Type;
var html_Items = new Array; //html tag; id
var style_Items = new Array; //
var element_Items = new Array;
var grid_Divs = new Array;
var last_Id;
var style_Set_Id = "";
var css_String;
var items_Colors = new Array;
var last_List;
//Megjeleníti a media divet

function control_Replaced_Ids(try_Id){
  replaced = false;
  for (var i = 0; i < window.html_Items.length; i++){
    if (try_Id == window.html_Items[i][1]){
      replaced = true;
      break;
    }
  }
  return replaced;
}

function add_New_Data(){
if (document.getElementById("media").style.display == "block"){
    document.getElementById("media").style.display = "none";}
else{
  document.getElementById("media").style.display = "block";
  document.getElementById("type").value = "default";
  document.getElementById("id").value = "";
  document.getElementById("error_Message").innerHTML = "";
}
}
//Ellenőrzi, hogy az összes bemenet ki van-e töltve
function generate_Item(){
  var type = document.getElementById("type").value;
  var id = document.getElementById("id").value;
  var next_Step = false;
  next_Array = new Array;
  for (var i = 0; i < window.ids.length; i++){
    if (document.getElementById(window.ids[i]).value != "" && document.getElementById(window.ids[i]).value != "-"){
      next_Array.push(true)
    }
    else{
      break;
    }
  }
  if (next_Array.length == window.ids.length){
    next_Step = true;
  }
  if (id == "" || type == "default" || next_Step == false){
    document.getElementById("error_Message").innerHTML = "Kérlek töltsd ki az összes mezőt!";
  }
  else{
    document.getElementById("error_Message").innerHTML = "";
    generate_This_Item();
  }
}

//Legenerálja a tageket és meghívja a segédfüggvényeket

function generate_This_Item(){
  var type = document.getElementById("type").value;
  var id = document.getElementById("id").value;
  try {
  document.getElementById(id).style;
  id += Math.floor(Math.random()*100);
  alert("Ez az id már korábban szerepelt, ezért a rendszer megváltoztatta a beírt id-t arendszer megfelelő működéséhez a következődre: "+id);
  }
  catch(err) {
  }
  if (document.getElementById("work_Place").style.display != "block"){
    document.getElementById("work_Place").style.display = "block";
  }
  var this_Item;
  var html = "";
  var style = "";
  var between_Tags = ""
  var ma = new Array();
  var h_Tag_Type = "";
  for (var i = 0; window.ids.length > i;i++){
    if (window.ids[i] == "placeholder" || window.ids[i] == "src" || window.ids[i] == "href" || window.ids[i] == "type" ||window.ids[i] == "cols" || window.ids[i] == "rows" || window.ids[i] == "width" || window.ids[i] == "height"){
      html += " "+window.ids[i]+ " = " +"\"" +document.getElementById(window.ids[i]).value+"\"";
    }
    if (window.ids[i] == "value"){
        ma.push([window.ids[i], document.getElementById(window.ids[i]).value]);
    }
    if (window.ids[i] == "text"){
      between_Tags += document.getElementById(window.ids[i]).value;
    }
    if (window.ids[i] == "h_Option"){
      h_Tag_Type = document.getElementById(window.ids[i]).value;
    }
  }
  if (type != "input" && type != "src"){
    this_Item = "<"+type+h_Tag_Type+" "+html+ " id = '"+ id +"'>"+between_Tags+"</"+type+">";

  }
  else if(type == "input"){
    this_Item = "<input type = 'text' "+html+" id = '"+id+"'/>";
  }
  else if(type == "img"){
    this_Item = "<img "+html+" />"
  }
  if (!this_Item == false){
    window.html_Items.push([this_Item, id]);
  }
  else{
    document.getElementById("error_Message").innerHTML = "Hiba történt a generálás során, kérem próbálja meg újra!";
  }
  if (style){
    window.style_Items.push(style);
  }
  document.getElementById("work_Place").innerHTML = "";
  for (var i = 0;i < window.html_Items.length;i++){
    if (!window.html_Items[i] == false){
    document.querySelector("#work_Place").innerHTML += (add_Funtion_Div(window.html_Items[i][0], id));
  }
}
run_Style();
  for (var i = 0; i < ma.length; i++){
    document.getElementById(id).value = ma[i][1];
  }
generate_String();
  for (i = 0; i < window.ids.length; i++){
    document.getElementById(window.ids[i]).value = "";
    }
    document.getElementById("id").value = "";
}

//Hozzáad egy random generált id-val rendelkező keret divet, amiben elhelyezkedik a a keretet eltütető gomb, a stílus gomb és a törlés gomb

function add_Funtion_Div(item, item_Id){
  var id = Math.random().toString(36).substring(7);
  var index;
  for (var i = 0; i < window.html_Items.length; i++){
    if (window.html_Items[i]){
    if(item == window.html_Items[i][0]){
      index = i;
      break;
    }
  }
  }
  var item = "<div id = '"+id+"' style = 'border: 3px solid black; margin-bottom: 2px;'>"+item+"<input type = 'button' onclick = 'delete_Item(\""+id+"\", "+index+")' value = 'Törlés' id = 'delete_Btn'><input type = 'button' onclick = 'display_Grid(\""+id+"\")' value = 'Keret'><input type = 'button' value = 'stílus beállítások' onclick = 'display_Css_Panel(\""+window.html_Items[i][1]+"\")'></div>"
  return item;
}

//Kitörli a bemenetként érkező id-val rendelkező divet.

function delete_Item(id, index){
  document.getElementById(id).remove();
  items_Id = window.html_Items[index][1];
  delete window.html_Items[index];
  for (i = 0; i < window.style_Items.length;i++){
    if (window.style_Items[i]){
    if (window.style_Items[i][2] == items_Id){
      delete window.style_Items[i];
      }
    }
  }
}

//Legenerálja a HTML kódot a (html_Code)-ba

function generate_String(){
  char_Code = document.getElementById("char_Code").value;
  title = "My Web Page";
  before = ["<!DOCTYPE html>", "<head>", "<meta charset = "+char_Code+">", "<title>"+title+"</title>", "</head>", "<body>"];
  after = ["</body>", "</html>"];
    document.getElementById("html_Code").innerHTML = "";
    for (var k = 0; k < before.length; k++){
      for (var i = 0; i < before[k].length; i++){
    document.getElementById("html_Code").innerHTML += before[k][i];
  }
  document.getElementById("html_Code").innerHTML += "<br />";
    }
    for (var i = 0; i < window.html_Items.length;i++){
    if (window.html_Items[i]){
      document.getElementById("html_Code").append(window.html_Items[i][1]);
      document.getElementById("html_Code").innerHTML += "<br />";
    }
  }
  for (var k = 0; k < after.length; k++){
    for (var i = 0; i <after[k].length;i++){
  document.getElementById("html_Code").innerHTML += after[k][i];
}
document.getElementById("html_Code").innerHTML += "<br />";
  }
}

//A bordert vagyis a keretet teszi láthatóvá

function display_Grid(id){
  if (document.getElementById(id).style.border != "hidden"){
  document.getElementById(id).style.border = "hidden";
  }
  else{
    document.getElementById(id).style.border = "3px solid black";
  }
}

//A css_Panel-t láthatóvá és láthatlanná teszi

function display_Css_Panel(id){
  if (document.getElementById("css_Panel").style.display === "block" && id == window.last_Id){
    document.getElementById("css_Panel").style.display = "none";
    window.style_Set_Id  = "";
  }
  else{
    document.getElementById("css_Panel").style.display ="block";
    document.getElementById("css_Panel").style.position = "absolute";
    pos = window.event;
    posX = pos.clientX;
    posY = pos.clientY;
    document.getElementById("css_Panel").style.top = posY+"px";
    document.getElementById("css_Panel").style.left  = posX+"px";
   }
  window.last_Id = id;
}

//Frissíti a stílust, minden új eleme hozzáadásakor

function run_Style(){
  if (window.style_Items){
  for (var i = 0; i < window.style_Items.length; i++){
    if (window.style_Items[i]){
      if (window.style_Items[i][0] == "color"){
      document.getElementById(window.style_Items[i][2]).style.color = window.style_Items[i][1];
    }
    else if(window.style_Items[i][0] == "background"){
      document.getElementById(window.style_Items[i][2]).style.background = window.style_Items[i][1];
    }
    else if(window.style_Items[i][0] == "border-radius"){
        document.getElementById(window.style_Items[i][2]).style.borderRadius =  window.style_Items[i][1];
      }
    else if(window.style_Items[i][0] == "border"){
      document.getElementById(window.style_Items[i][2]).style.border = window.style_Items[i][1];
    }
    else if (window.style_Items[i][0] == "margin"){
      document.getElementById(window.style_Items[i][2]).style.margin = window.style_Items[i][1];
    }
    else if (window.style_Items[i][0] == "padding"){
      document.getElementById(window.style_Items[i][2]).style.padding = window.style_Items[i][1];
    }
  }
  }
}
}

//Beállítja a bemenetként érkező színt betűszínnek, a globális (window.last_Id) alapján

function set_Color(color){
  var change = false;
  for (var i = 0; i < window.style_Items.length; i++){
    if (window.style_Items[i]){
    if (window.style_Items[i][0] == "color" && window.style_Items[i][2] == window.last_Id){
      window.style_Items[i][1] = color;
      change = true;
      break;
    }
  }
    }
  if (change == false){
  window.style_Items.push(["color",color, window.last_Id]);
}
  document.getElementById(window.last_Id).style.color = color;
  set_Css();
}

//Beállítja a háttérszínt a bemenetként érkező színt

function set_Background_Color(color){
  var change = false;
  for (var i = 0; i < window.style_Items.length; i++){
    if (window.style_Items[i]){
    if (window.style_Items[i][0] == "background" && window.style_Items[i][2] == window.last_Id){
      window.style_Items[i][1] = color;
      change = true;
      //break;
    }
    }
  }
  if (change == false){
  window.style_Items.push(["background",color, window.last_Id]);
}
  set_Css();
  document.getElementById(window.last_Id).style.background = color;
}

//Legenerálja a CSS kódot (#css_Code)

function set_Css(){
  document.getElementById("css_Code").innerHTML = "";
  for (i = 0; i < window.style_Items.length;i++){
    if (window.style_Items[i]){
    document.getElementById("css_Code").innerHTML += "#"+window.style_Items[i][2]+"{ "+window.style_Items[i][0]+":"+window.style_Items[i][1]+"; }"+"<br />";
  }
  }
}

//Eltávolítja a bementként érkező id-val rendelkező html itemet

  function close_Item(item){
    document.getElementById(item).style.display = "none";
  }

//Saját háttérszín hozzáadásához hívja meg a függvényt

function set_Custom_Background(){
  set_Background_Color(document.getElementById(background_Color_Code).value);
}

//Saját szín hozzáadásához hívja meg a függvényt

function set_Custom_Color(){
  set_Color(document.getElementById("color_Code").value);
}

function control(id, data){
  var a = true;
  var item_Id = "";
    for (i = 0; i < window.style_Items.length;i++){
      if (window.style_Items[i]){
        if (id == window.style_Items[i][2] && window.style_Items[i][0] == data){
          a = false;
          item_Id = i;
          break;
        }
      }
    }
  return[a, item_Id];
}

//Beállítja a keret színét

function set_Border_Color(color){
  if(color != "none"){
    a = control(window.last_Id, "border");
    if (a[0] == false){
      window.style_Items[a[1]] = ["border","3px solid "+color, window.last_Id];
    }
    else{window.style_Items.push(["border","3px solid "+color, window.last_Id]);}
    document.getElementById(window.last_Id).style.border = "3px solid "+color;
}
  else{
    a = control(window.last_Id, "border");
    if (a[0] == false){
      window.style_Items[a[1]] = ["border","hidden", window.last_Id];
    }
    else{window.style_Items.push(["border","hidden", window.last_Id]);}
    document.getElementById(window.last_Id).style.border = "hidden";
}
set_Css();
}

//Beállítja a keretet

function set_Border_Radius(){
  radius = document.getElementById("border_Radius").value;
  document.getElementById(window.last_Id).style.borderRadius = radius+"px";
  a = control(window.last_Id, "border-radius");
  if (a[0] == false){
    window.style_Items[a[1]] = ["border-radius",radius+"px", window.last_Id];
}else{
  window.style_Items.push(["border-radius",radius+"px", window.last_Id]);
}
  set_Css();
}

//Beállítja a külső és belső térközt, ha megnyomjuk a gombot

function set_Margin_And_Padding(){
  var margin = document.getElementById("set_margin").value;
  var padding = document.getElementById("set_Padding").value;
  if (!padding){
    padding = 0;
  }
  if (!margin){
    margin = 0;
  }
  document.getElementById(window.last_Id).style.margin = margin+"px";
  document.getElementById(window.last_Id).style.padding = padding+"px";
  a = control(window.last_Id, "padding");
  b = control(window.last_Id, "margin");
  if (a[0] == false){
    window.style_Items[a[1]] = ["padding", padding+"px", window.last_Id];
  }
  else{
  window.style_Items.push(["padding", padding+"px", window.last_Id]);
  }
  if (b[0] == false){
    window.style_Items[b[1]] = ["margin", margin+"px",window.last_Id];
  }
  else{
  window.style_Items.push(["margin", margin+"px",window.last_Id]);
  }
  set_Css();
}

function ell_Work_Place_Div(){
  var a = new Array;
  for (var i = 0; i < window.html_Items.length; i++){
    if (!window.html_Items[i]){
      a.push(false);
    }
  if (a.length == window.html_Items.length || window.html_Items.length == 0){
    document.getElementById("work_Place").style.display = "none";
  }
  }
}

//A hozzáadnadó eleme kiválasztásakor frissít

setInterval(function() {
  ell = false;
  if (document.getElementById("media").style.display == "block"){
  data = document.getElementById("type").value;
  if (data != window.last_Type){
  window.ids = [];
  document.getElementById("item_Datas").innerHTML = "";
  ids_ = [["input",[["placeholder:", "placeholder"]]], ["p",[["Szöveg:", "text"]]], ["button", [["Felirat:", "text"]]], ["h",[["Szöveg:", "text"]]], ["textarea",[["Szélesség:", "cols"],["Magasság:", "rows"]]], ["img", [["Elérési útvonal", "src"], ["Szélesség", "width"], ["Magasság", "height"]]]];
  for (var i = 0;i < ids_.length; i++){
    if (data == ids_[i][0]){
      for (var k = 0; k < ids_[i][1].length; k++){
        if (ids_[i][1][k][0] != "" || ids_[i][1] != "-"){
          window.ids.push(ids_[i][1][k][1]);
        document.getElementById("item_Datas").innerHTML += "<br/>"+ids_[i][1][k][0]+" <input type = 'text' id = '"+ids_[i][1][k][1]+"'>";
        if (ids_[i][0] == "h"){
          document.getElementById("item_Datas").innerHTML += "<br /> Nagysága - a betű mérete a fordítottan arányos a nagysággal (Ajánlott csak a főcímet h1-es taggel): <select id = 'h_Option'><option value = '-'>-</option><option value = '1'>1</option><option value = '2'>2</option><option value = '3'>3</option><option value = '4'>4</option><option value = '5'>5</option><option value = '6'>6</option><select>"
          window.ids.push("h_Option");
        }
        ell = true;
      }
      }
    }
  }
if (ell == false){
  window.ids = [];
}
}
window.last_Type = data;
}
ell_Work_Place_Div();
}, 500);
