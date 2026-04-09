import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

interface PerfectComponentProps {
  name: string
}

export default function PerfectComponent(props: PerfectComponentProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("farms") // 👈 change this
        .select("*")

      if (error) {
        console.error("Error fetching:", error)
      } else {
        console.log('data', data)
        setData(data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  // EARLY RETURN
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>
        Farms
      </h1>

      {data.map((item, index) => (
        <div key={index}>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ))}
    </div>
  )
}