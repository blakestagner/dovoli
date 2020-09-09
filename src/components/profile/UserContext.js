import { context } from './Context'
import {getUserInfo} from '../../autho/Repository'

const userContext = ({children}) =>{
    const [data, setData] = useState(null)

    useEffect(() =>{
        getUserInfo().then(res => setData(res.data))
    },[])

   const { Provider } = context
   return(
       <Provider value={data}>
           {children}
       </Provider>
   )
}