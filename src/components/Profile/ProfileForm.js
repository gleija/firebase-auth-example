import { useRef, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const passwordEntered = useRef();
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();
    setErrorMessage(null);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBbd96S32LNTWO_mLo67vB_2fWomfxe0sI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authContext.token,
          password: passwordEntered.current.value,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        console.log(res);
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={passwordEntered} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default ProfileForm;
