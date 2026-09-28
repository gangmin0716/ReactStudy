import {useParams} from "react-router";

function IntroDetail() {
  const {id} = useParams();

  return(
      <div>
        IntroDetail : {id}
      </div>
  )
}

export default IntroDetail;