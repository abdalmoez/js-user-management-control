function registerStates()
{
    var states = ["Ariana","Beja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Kef","Mahdia","Mannouba","Medenine","Monastir","Nabeul","Sfax","Sidi  Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"];
    localStorage.setItem('states',JSON.stringify(states)); 
}
function LoadStates()
{
    var str='<option selected=""> Select your state</option>';
    JSON.parse(localStorage.getItem('states')).forEach(state => {str+=`<option value='${state}'>${state}</option>`;});
    document.getElementById('state').innerHTML=str;
}
LoadStates();

var firstname=document.getElementById('firstname');
var lastname=document.getElementById('lastname');
var phone=document.getElementById('phone');
var email=document.getElementById('email');
var birthday=document.getElementById('birthday');
var state=document.getElementById('state');
var rpassword=document.getElementById('rpassword');
var password=document.getElementById('password');

function CheckInputs()
{

    var result=true;
    if(verif(firstname,3,30)){
        firstname.classList.remove('is-invalid');
        firstname.classList.add('is-valid');
    }else{
        result=false;
        firstname.classList.add('is-invalid');
        firstname.classList.remove('is-valid');
    }
    if(verif(lastname,3,30)){
        lastname.classList.remove('is-invalid');
        lastname.classList.add('is-valid');
    }else{
        result=false;
        lastname.classList.add('is-invalid');
        lastname.classList.remove('is-valid');
    }
    if(phone.value.length==8){
        var digit=phone.value.charAt(0);
        document.getElementById('erroroperator').setAttribute('hidden','');

        if(digit=='9')
            document.getElementById('operatorname').innerText="Tunisie Telecom";
        else if(digit=='5')
            document.getElementById('operatorname').innerText="Orange Tunisie";
        else if(digit=='2')
            document.getElementById('operatorname').innerText="Ooredoo";
        else {
            document.getElementById('operatorname').innerText="";
            document.getElementById('erroroperator').removeAttribute('hidden');
        }
        
        if((digit=='9')||(digit=='5')||(digit=='2')){
            phone.classList.remove('is-invalid');
            phone.classList.add('is-valid');
        }else{
            result=false;
            phone.classList.add('is-invalid');
            phone.classList.remove('is-valid');
        }
    }else{
            result=false;
            phone.classList.add('is-invalid');
            phone.classList.remove('is-valid');        
    }

    if(email.validity.typeMismatch==false && email.value!=""){
        //email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }else{
        result=false;
        //email.classList.add('is-invalid');
        email.classList.remove('is-valid');
    }

    if(getAge(birthday.value)>=10){
        birthday.classList.remove('is-invalid');
        birthday.classList.add('is-valid');
        document.getElementById('errorbirthday').setAttribute('hidden','');
    }else{ 
        result=false;
        birthday.classList.add('is-invalid');
        birthday.classList.remove('is-valid');
        document.getElementById('errorbirthday').removeAttribute('hidden');
    }

    if(state.selectedIndex!=0){
        state.classList.remove('is-invalid');
        state.classList.add('is-valid');
    }else{ 
        result=false;
        state.classList.add('is-invalid');
        state.classList.remove('is-valid');
    }

    if(password.value.length>=8){
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
    }else{ 
        result=false;
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
    }

    if(password.value.length>=8 && password.value==rpassword.value){
        rpassword.classList.remove('is-invalid');
        rpassword.classList.add('is-valid');
    }else{ 
        result=false;
        rpassword.classList.add('is-invalid');
        rpassword.classList.remove('is-valid');
    }
    
    return result;
}

function verif(inputtxt, minlength, maxlength) {
    return (inputtxt.value.length >= minlength && inputtxt.value.length <= maxlength);
}

function getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age
}
function clearInputs(){

    firstname.value='';
    lastname.value='';
    phone.value='';
    email.value='';
    birthday.value='';
    state.selectedIndex=0;
    rpassword.value='';
    password.value='';

    firstname.classList.remove('is-invalid');
    firstname.classList.remove('is-valid');
    lastname.classList.remove('is-invalid');
    lastname.classList.remove('is-valid');
    rpassword.classList.remove('is-invalid');
    rpassword.classList.remove('is-valid');
    password.classList.remove('is-invalid');
    password.classList.remove('is-valid');
    state.classList.remove('is-invalid');
    state.classList.remove('is-valid');
    birthday.classList.remove('is-invalid');
    birthday.classList.remove('is-valid');
    //email.classList.remove('is-invalid');
    email.classList.remove('is-valid');
    phone.classList.remove('is-invalid');
    phone.classList.remove('is-valid');
    document.getElementById('errorbirthday').setAttribute('hidden','');
    document.getElementById('erroroperator').setAttribute('hidden','');
    document.getElementById('operatorname').innerText="";
}
function registerUser()
{
    if(CheckInputs())
    {
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        var newId = 0;
        (users).forEach(p => {
            if (p.Id > newId)
                newId = p.Id;
        });
        users.push({
            Id: newId,
            Firstname:firstname.value,
            Lastname:lastname.value,
            Phone:phone.value,
            Email:email.value,
            Birthday:birthday.value,
            State:state.selectedIndex,
            Password:password.value
        });
        localStorage.setItem('users', JSON.stringify(users));
        clearInputs();
        DisplayModal('successRegistration');
    }

    return false;
}


/**
 * Modal script
 */

function DisplayModal(id) {
    document.getElementById(id).style.display = "block";
}
function HideModal(id) {
    document.getElementById(id).style.display = "none";
}
function InitModals()
{
    var spans = document.getElementsByClassName("modal-close");
    for (let s of spans) {
        s.onclick = function() {
            s.parentElement.parentElement.style.display = "none" ;
        }
    }

    window.onclick = function(event) {// When the user clicks anywhere outside of the modal, close it
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

}

InitModals();
/**
 * End Modal script
 */