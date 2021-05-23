import {useReduce} from "./Reducer-context";
import {Grid,Button,Box} from "@material-ui/core";
import {  quiz } from "./Data/quiz.types";

export function Answer({ typedata }: { typedata: quiz }){
    let {  currentQsnNo} = useReduce();


    return(
        <Box textAlign="center">
            <h3>Answers</h3>
        {   
        typedata.questions.map(current=>{

            return(
                <>
                <hr/>
                <Box style={{padding:"1rem,0"}}>
                 <h2>{current.question}</h2>
                 <Grid container spacing={3} justify="center">
                   {current.options.map((item, index) => {
                    return (
              
                            <Grid item xs={10} sm={5} md={4} lg={3}>
                              <Button
                                
                                style={{width:"100%",background:item.isRight?"lightgreen":"#f2f2f2",height:"100%"}}
                                
                              >
                                {` ${item.text}`}
                              </Button>
                            </Grid>
              
                          );
                   })}
                 </Grid>
               </Box>
                </>
            )
        }) 
       
}</Box>
    )
}