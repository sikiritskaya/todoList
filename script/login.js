const generateToken = () => {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
const isAuthorisation = () => {
    if(!sessionStorage.getItem('user-token')){
        sessionStorage.setItem('user-token', '');
        window.location.href="index.html";
    }
}

const writeAccountData = (event) => {
    event.preventDefault();
    const userName = document.querySelector('#q1').value;
    const userPassword = document.querySelector('#q2').value;

    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userPw', userPassword);

    let accounts = JSON.parse(localStorage.getItem('accounts'));
    const currentUser = {
        userName: userName,
        userPassword: userPassword
    }
    isUser(accounts, currentUser);

}
const isUser = (allUsers, userData) => {
    const checkUser = allUsers.some((item) => {
        return (
            item.userName === userData.userName &&
            item.userPassword === userData.userPassword
        )
    })

    if(!checkUser){
        alert('Enter another name or password')
        return false;
    } else{
       sessionStorage.setItem('user-token', generateToken())
       modalLogin.classList.add('er_message')
       modal_show.classList.remove('preloader-show')
       return true
    }
}












modalLogin.addEventListener('submit',(e)=>{
    firstValid()
    secondValid()
    e.preventDefault()
   // writeAccountData()
})

modalRegist.addEventListener('submit',(e)=>{
    e.preventDefault()
    firstValid2()
    secondValid2()
    passwordValid()
    passwordRepeat()
    passwordRepeat2()
    agreement()
})
//isAuthorisation()
//renderUserAvatar()