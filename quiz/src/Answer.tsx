import {useReduce} from "./Reducer-context";
import {Grid,Button,Box} from "@material-ui/core";
import { Quizdata, quiz } from "./Data/quiz.types";

export function Answer({ typedata }: { typedata: quiz }){
    let { score, status, currentQsnNo, dispatch, user,currentquiz } = useReduce();
    let { question, options, points } = typedata.questions[currentQsnNo - 1];

    return(
        <Box textAlign="center">
            <h3>Answers</h3>
        {   
        typedata.questions.map(current=>{

            return(
                <>
                 <h2>{current.question}</h2>
        <Grid container spacing={3} justify="center">
          {current.options.map((item, index) => {
            return (
              
                <Grid item xs={12} sm={6}>
                  <Button
                    
                    style={{width:"100%",background:item.isRight?"green":"#f2f2f2"}}
                    
                  >
                    {` ${item.text}`}
                  </Button>
                </Grid>
              
            );
          })}
        </Grid>
                </>
            )
        }) 
       
}</Box>
    )
}