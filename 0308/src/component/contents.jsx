import Con1 from './con1';
import Con2 from './con2';
import Con3 from './con3';
import Con4 from './con4';
import Contents_in from './contents_in';
import '../app.css';

function Contents(){
    return(
        <div className="contents">
            <Contents_in>
                <Con1/> 
                <Con2/> 
                <Con3/> 
                <Con4/> 
            </Contents_in>    
        </div>
    )
}

export default Contents;