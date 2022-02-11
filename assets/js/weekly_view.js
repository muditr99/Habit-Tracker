var check = document.getElementsByClassName('check');
console.log(check);
for(var i=0;i<check.length;i++){
    if(check[i].innerText == 'Complete'){
        check[i].style.color = 'green';
    }else if(check[i].innerText == 'Incomplete'){
        check[i].style.color = 'red';
    }else{
        check[i].style.color = 'grey';
    }
}