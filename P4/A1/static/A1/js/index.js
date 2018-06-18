firebase.auth().onAuthStateChanged(function(user) 
{
  if (user) 
  {
    // User is signed in.
    document.getElementById("user-div").style.display = "block";
    document.getElementById("login-div").style.display =  "none";
    var user = firebase.auth().currentUser;
    
    if (user != null) 
    {
      var name = user.displayName;
      var email_id = user.email;
      var uid = user.uid; 
      var firebaseRef = firebase.database().ref("users/");
      data = {"email":email_id, "name": name, "status":1};
      firebaseRef.child(uid).child("details").set(data);
      document.getElementById("user_para").innerHTML = "welcome user " + name
    }
  } else 
    {
      // No user is signed in.
      document.getElementById("user-div").style.display  = "none";
      document.getElementById("login-div").style.display = "block";
    }
});


function visit()
{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user){
  if (user != null){


  var database = firebase.database();
  var userId = firebase.auth().currentUser.uid;
  var ref = database.ref('/users/'+userId+"/blogs/");
  var scorelistings = document.querySelectorAll('.storelisting');
  for(var i = 0; i < scorelistings.length; i++)
  {
    scorelistings[i].remove();
  }
  ref.once('value', function(snapshot) 
  {
    snapshot.forEach(function(childSnapshot) 
    {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      //console.log(childKey);
      //console.log(childData);   
      var x = document.createElement("TABLE");
      x.setAttribute("id", "myTable");
      document.body.appendChild(x);

      var y = document.createElement("TR");
      y.setAttribute("id", "myTr");
      document.getElementById("myTable").appendChild(y);

      var z = document.createElement("TD");
      var t = document.createTextNode(childKey + " : " + childData);
      z.appendChild(t);

      document.getElementById("myTable").appendChild(z);
      z.classList.add("storelisting");
  
    });
  });
        }

      }
}


function login()
{ 
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error)  
  {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("error: "+ errorMessage + errorCode)
   //  // ...
  });
}

function logout()
{
  firebase.auth().signOut().then(function()
  {
    // Sign-out successful.
  }).catch(function(error) 
    {
  // An error happened.
    });
}
var mainText = document.getElementById("main_text");
var input_text = document.getElementById("input_text");
var input_text_ref = firebase.database().ref().child("heading")
input_text_ref.on('value', function(datasnap)
{
  input_text.innerText = datasnap.val();
});


function submit()
{
  var userId = firebase.auth().currentUser.uid;
  var firebaseRef = firebase.database().ref("users/"+ userId +"/blogs/");
  var message = input_text.value;
  firebaseRef.push(message);
  var postId = firebaseRef.push().key;
}