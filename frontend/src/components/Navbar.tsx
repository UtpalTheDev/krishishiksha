import { useReduce } from "../reducer-context/Reducer-context";
import { useLogin } from "../reducer-context/Login-context";
import { Link } from "react-router-dom";
import{AppBar,Toolbar,IconButton,Grid,Button} from "@material-ui/core";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
export function Navbar() {
  const {user,dispatch} =useReduce();
  const {isUserLogin,setLogin}=useLogin();

function logout(){
  localStorage.removeItem("user");
  dispatch({type:"LOGOUT"});
  setLogin(false);
}

  return (
    <>
      <div>
        
        <AppBar style={{color:"black",background:"white"}}>
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
            <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
            <h3>KrishiShiksha</h3>
            </Link>

            <Grid item>
            {isUserLogin && <Button variant="contained" size="small" onClick={logout}>Logout</Button>}

            <Link to="/user" style={{textDecoration:"none", color:"inherit"}}><IconButton>
              <AccountCircleRoundedIcon/>
            </IconButton>
            {user.name!==""?`Hi, ${user.name}`:""}
            </Link>
            </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
