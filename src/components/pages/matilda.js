import { useEffect, useState } from "react"

export default function matilda() {

    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        setTimeout(() => setRotation(rotation + 1), 5)
    }, [rotation])

    return <div>
        <h1>Matildas Hemsida</h1>
        <p style={{ color: "cyan" }}>hej!</p>
        <img width={300} height={200} style={{ borderRadius: 10, transform: `rotate(${rotation}deg)` }} src="https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg" />


    </div>
}