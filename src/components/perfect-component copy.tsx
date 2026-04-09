interface PerfectComponentProps{
    name: string
}

export default function PerfectComponent(props : PerfectComponentProps) {
    // HOOKS
// const auth = useAuth()
// const [count, setCount] = useState(0)
// const ref = useRef(null)

// Add to Chat #L Quick EditK

//  console.log('count', count)
//}, [count])

//  EFFECTS
//  useEffect(()={
//      console.log('count', count)
//  }, [count])

// HELPERS
// const calculateCount = () = {}

// EVENT HANDLERS
// const handleClick = () = {}

// EARLY RETURNS
// if (!pagedata) return <div>loading ... </div>

// RENDER LOGIC
// const buttonName = loading ? 'Loading ... ' : 'Click me'

  return(
    <h1>{props.name}</h1>
  )

}