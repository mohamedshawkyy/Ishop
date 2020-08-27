$(function(){
   if($('textarea#ta').length){
       CKEDITOR.replace('ta')
   }
   $('a.cd').on('click',function(){
       if(!confirm('Confirm deletion?')) return false;
       
   });
});