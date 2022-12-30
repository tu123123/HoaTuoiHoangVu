import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { collection, getDocs,addDoc, doc, updateDoc,deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDBor-yNScm2Oq-IJ0O6AloyQCwpCLolM0",
  authDomain: "fbapp-ce8ce.firebaseapp.com",
  projectId: "fbapp-ce8ce",
  storageBucket: "fbapp-ce8ce.appspot.com",
  messagingSenderId: "458942500126",
  appId: "1:458942500126:web:08434aafe4e2d9570d8d0f",
  measurementId: "G-B47RZHN8PZ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const getData =async (db,action) => {
  const newData=[]
  await getDocs(collection(firestore, db))
      .then((querySnapshot)=>{               
         action(querySnapshot.docs
          .map((doc) => ({...doc.data(), id:doc.id })))
                       
      })
 
}
 const addData = async (db,data,success,err) => {
  
  try {
     await addDoc(collection(firestore,db),data).then(()=>   success());
    
    } catch (e) {
      console.error("Error adding document");
    }
  
}
 const delData = async (db,id,success,err) => {
  
  try {
    await deleteDoc(doc(firestore, db, id)).then(()=>   success());
   
   } catch (e) {
     console.error("Error adding document");
   }
  
  
}
 const upload = async (db,id,file,success,err) => {
  
  const storage = getStorage();
  const storageRef = ref(storage, 'img.png');
  
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
  
  
}
 const updateData = async (db,id,data,success,err) => {
  const docRef = doc(firestore, db, id);
  updateDoc(docRef, data)
  .then(docRef => {
    success();
  })
  .catch(error => {
    err()
      console.log(error);
  })
  
}
export {firestore,getData,addData,updateData,delData,upload}