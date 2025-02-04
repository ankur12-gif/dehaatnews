import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

const Viewfull = () => {
    const params = useParams();
    const { user } = useSelector((state) => state.user)

    console.log(user)
    console.log(params)

    return (
        <div>Viewfull</div>
    )
}

export default Viewfull