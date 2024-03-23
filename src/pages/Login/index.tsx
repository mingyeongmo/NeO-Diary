import React from "react";
// import { db } from "../../firebase";
import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [test, setTest] = useState<any>();

  // async function getTest() {
  //   const docRef = doc(db, "items", "1");

  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     setTest(docSnap.data());
  //   }
  // }

  useEffect(() => {
    // getTest();
  }, []);

  return (
    <div>
      로그인 페이지
      {/* <p>{test !== undefined && <div>{test.name}</div>}</p> */}
    </div>
  );
};

export default Login;
