

import '../app.css';

function Contents_in({children}){//그룹이다 그리고 자식들을 갖고있다
    return(
       
         <div className="contents_in">
            {children}
         </div>
        
    )
}

export default Contents_in;