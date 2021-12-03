import React, { useContext } from "react";
import Signin from "../components/Log/Signin";
import UpdateProfil from "../components/Profil/UpdateProfil";
import { UidContext } from "../components/UserIdConnect";

const Profil = () => {
  const uid = useContext(UidContext);
  return <div>{uid ? <UpdateProfil /> : <Signin />}</div>;
};

export default Profil;
