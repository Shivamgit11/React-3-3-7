import React, { 
  useState, 
  useEffect, 
  useReducer, 
  useContext, 
  useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { act } from 'react-dom/test-utils';
import AuthContext from '../../Store/auth-context';
import Input from '../UI/Input/input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@') };
  }
    return {value: '', isValid: false };
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6 };
  }
    return {value: '', isValid: false };
} 

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollege, setenteredCollege] = useState('');
  const [collegeisValid, setcollegeisValid] = useState('');



  const [emailState, dispatchEmail] = useReducer(emailReducer, { 
    value: '', 
    isValid: null, 
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { 
    value: '', 
    isValid: null, 
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  
  useEffect(() => {
    console.log('running');

    return(() => {
      console.log('effect cleanup -2');
    })
  }, [])

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(
        emailIsValid && passwordIsValid
      ); 
    }, 500);
    
    return () => {
      console.log('cleanup');
      clearTimeout(identifier);
    }; 
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid(
    //         event.target.value.includes('@') && passwordState.isValid
    //       );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const collegechangeHandler = () => {
    setenteredCollege(event.target.value);
  }

  const validateCollegechangehandler = () => {
    setcollegeisValid(enteredCollege.trim().length > 3);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
        id="email" 
        label="E-Mail" 
        type="email" 
        isValid={emailIsValid} 
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        <Input
        ref={passwordInputRef}
        id="password" 
        label="Password" 
        type="password" 
        isValid={passwordIsValid} 
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
      
        <div
          className={`${classes.control} ${
            collegeisValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="clg">Enter Your college Name</label>
          <input
            type="text"
            id="clg"
            value={enteredCollege}
            onChange={collegechangeHandler}
            onBlur={validateCollegechangehandler}
            required
          />
        </div>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
