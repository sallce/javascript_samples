// Code goes here

var in_str = "Hope you will be joining me and @BillieFaiers when we come to the @Bullring on the 27th. For more details visit http:\/\/t.co\/RfxP1jPa5H #AFF";
var in_str2 = "I\u2019m hosting #AFF Catwalk Show @Bullring on 27th Sept with @BillieFaiers. Find out more here &gt; http:\/\/t.co\/adjrejBLwI.";

var format_characters = function(str){
  
  var characters = [];
  var indexes = [];
  var right_indexes = [];
  
  var start_tag = "<b>";
  var end_tag = "</b>";
  
  var patt = new RegExp(/^\w+$/);
  
  for(var i=0;i<str.length;i++){
    
    if(str[i] == "@" || str[i] == "#")
    {
      characters.push(str[i]);
      indexes.push(i);
    }else if(!patt.test(str[i]) && characters.length > 0){
      var char = characters.pop();
      right_indexes.push(i);
    }
    
  }
  
  var out_str = "";
  
  var current_left = 0, current_right = 0;
  for(var i=0; i<str.length; i++){
    if(i == indexes[current_left])
    {
      out_str += (start_tag+str[i]);
      current_left++;
    }
    else if(i == right_indexes[current_right])
    {
      out_str += (end_tag+str[i]);
      current_right++;
    }else{
      out_str += str[i];
    }
    
  }
  
  if(characters.length > 0)
  {
    if(patt.test(str[str.length - 1]))
    {
      out_str += end_tag;
    }
  }
  return out_str;
};


var format_url = function(str){
  var str_array = str.split("http:\/\/");
  var out_str = "";
  var patt = new RegExp(/^\w+$/);
  
  if(str_array.length == 1)
  {
    return str;
  }
  out_str += str_array[0];
  
  for(var index=1; index<str_array.length;index++)
  {
    if(str_array[index].indexOf(' ') != -1)
    {
      //the link is not the end of the string
      var temp_string = str_array[index].slice(0,str_array[index].indexOf(' '));
      
      var after_link = str_array[index].slice(str_array[index].indexOf(' '));
      
      if(patt.test(temp_string[temp_string.length-1]))
      {
        temp_string = "http:\/\/"+temp_string;
        temp_string = "<a href='"+temp_string+"'>"+temp_string+"</a>";
        out_str+=temp_string;
      }else{
        temp_string = "http:\/\/"+temp_string;
        var temp_url = temp_string.slice(0,temp_string.length-2);
        temp_string = "<a href='"+temp_url+"'>"+temp_string+"</a>";
        out_str+=temp_string;
      }
      
      out_str+=after_link;
      
    }else{
      //only the link left in the string
      var temp = str_array[index];
      if(patt.test(temp[temp.length-1]))
      {
        temp = "http:\/\/"+temp;
        temp = "<a href='"+temp+"'>"+temp+"</a>";
        out_str+=temp;
      }else{
        temp = "http:\/\/"+temp;
        var url = temp.slice(0,temp.length-2);
        temp = "<a href='"+url+"'>"+temp+"</a>";
        out_str+=temp;
      }
    }
    
  }
  return out_str;
  
};


var text = document.getElementById('text');

text.innerHTML = format_url(format_characters(in_str));


console.log(format_characters(in_str), format_url(in_str2));