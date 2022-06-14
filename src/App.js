
import './App.css';
import { useEffect, useState } from 'react';
import { app, database } from './firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
 } from 'firebase/firestore';

function App() {
  const auth = getAuth();
  const authProvider = new GoogleAuthProvider();
  const collectionRef = collection(database, 'users')
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [userData, setUserData] = useState({
    name: '',
    userEmail: '',
    age: ''
  })

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value }

    setData({ ...data, ...inputs })
  }

  const handleUserInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value }

    setUserData({ ...userData, ...inputs })
  }

  // Adds the user data to the database
  const handleSubmit = () => {
    console.log(userData)
    addDoc(collectionRef, {
      name: userData.name,
      userEmail: userData.userEmail,
      age: userData.age
    })
      .then(() => {
        alert('Data Added')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  // Gets all users
  const getUsers = () => {
    getDocs(collectionRef)
      .then((response) => {
        console.log(response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }))
      })
  }

  // Updates a single user based on id
  const updateUser = () => {
    const docToUpdate = doc(database, 'users', 'mx3DNEqNoZJ63I25S59F')
    updateDoc(docToUpdate, {
      name: 'Updated Name',
      userEmail: 'Updated Email',
      age: '1999-03-01'
    })
      .then(() => {
        alert('Data Updated')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  // Deletes a single user based on id
  const deleteUser = () => {
    const docToDelete = doc(database, 'users', 'mx3DNEqNoZJ63I25S59F')
    deleteDoc(docToDelete)
      .then(() => {
        alert('Data Deleted')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  // Registers a user with an email and password
  const register = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user)
      })
      .catch((err) => {
        alert(err.message)
        console.log(err.message)
      })
  }

  const googleSignIn = () => {
    signInWithPopup(auth, authProvider)
      .then((res) => {
        console.log(res.user)
      })
      .catch((err) => {
        alert(err.message)
        console.log(err.message)
      })
  }


  const addData = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
  }

  const handlelogout = () => {
    signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        alert("Logged In")
      }
      else {
        alert('Not Logged In')
      }
    })
  }, [])

  return (
    <div className="App-header">
      <input
        placeholder="Email"
        name="Email"
        type="email"
        className="input-fields"
        onChange={event => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={event => handleInputs(event)}
      />

      <button onClick={addData}>Log In</button>
      <button onClick={handlelogout}>Log out</button>
      <button onClick={register}>Register</button>
      <button onClick={googleSignIn}>Sign in with google</button>
      <input
        placeholder="Name"
        name="name"
        type="text"
        className="input-fields"
        onChange={event => handleUserInputs(event)}
      />
      <input
        placeholder="Email"
        name="userEmail"
        type="email"
        className="input-fields"
        onChange={event => handleUserInputs(event)}
      />
      <input
        placeholder="YYYY-MM-DD"
        name="age"
        type="text"
        className="input-fields"
        onChange={event => handleUserInputs(event)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={getUsers}>Get users</button>
      <button onClick={updateUser}>Update user</button>
      <button onClick={deleteUser}>Delete user</button>
    </div>
  );
}

export default App;