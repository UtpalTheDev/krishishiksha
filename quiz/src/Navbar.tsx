import { useReduce } from "./Reducer-context";
import { useLogin } from "./Login-context";
import { Link } from "react-router-dom";
import{AppBar,Toolbar,IconButton,Avatar,Grid} from "@material-ui/core";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
export function Navbar() {
  return (
    <>
      <div>
        
        <AppBar>
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
            <h3>Quiz</h3>
            <IconButton href="/user">
              <AccountCircleRoundedIcon/>
            </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
