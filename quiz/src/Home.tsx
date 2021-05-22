import { quizdata } from "./Data/getQuiz";
import { Link } from "react-router-dom";
import { useReduce } from "./Reducer-context";
import userEvent from "@testing-library/user-event";
import {CardActionArea,Card,Grid,CardActions,Button,Typography,CardContent,CardMedia} from "@material-ui/core"
export function Home() {
  
  let { dispatch, categorydata, user } = useReduce();
  return (
    <>
     <Grid container justify="center" alignItems="center" spacing={3}>
      {Object.keys(quizdata).map((item) => {
        return (
          <>

        <Grid item lg={3} md={3} sm={5} xs={7} style={{height:"100%"}}>
          <Card style={{height:"inherit"}}>
            <CardActionArea style={{}}>
              <CardMedia
              style={{height:"140px"}}
              image="https://images.unsplash.com/photo-1621375096401-0eb246cca66e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
              <CardContent style={{}}>
              <Typography gutterBottom variant="h5" component="h2">
            {item}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
        <Link
              key={item}
              to={`/${item}`}
              style={{textDecoration:"none",color:"inherit"}}
              onClick={() => dispatch({ type: "CURRENTQUIZ", payload: item })}
            >
              Practice
        </Link>
        </Button>
        <Button size="small" color="primary">
        <Link
              key={item}
              to={`/learningcurve/${item}`}
              style={{textDecoration:"none",color:"inherit"}}
              onClick={() => dispatch({ type: "CURRENTQUIZ", payload: item })}
            >
              Learning Curve
        </Link>
        </Button>
              </CardActions>

          </Card>
          </Grid>
          
          </>
          
        );
      })}
      </Grid>
    </>
  );
}
