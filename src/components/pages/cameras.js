import { API_URL } from "../pages/login";
import { useEffect, useState } from "react"
import { checkAuth, logout } from "../../util/auth"
import VideoStreamRTC from "../molecules/videoStreamRTC";



export default function Cameras() {

    const [sources, setSources] = useState([])
    const [error, setError] = useState("")

    // TODO: Refactor this into own util hook
    const [token, setToken] = useState(null)


    useEffect(() => {
        checkAuth().then(({ token }) => setToken(token)).catch(() => logout())
    }, [])

    useEffect(() => {
        if (!token) {
            return
        }
        fetch(`${API_URL}/video_sources`, { headers: { "Authorization": `bearer ${token}` } }).then(result => {
            if (!result.ok) {
                console.log(`${result.status} - ${result.statusText}`)
                throw new Error(`${result.status} - ${result.statusText}`)
            } else {
                return result.json()
            }
        }).then(sources => setSources(sources))
    }, [token])

    return <div className="p-surveillance">
        <h2>Cameras</h2>
        {error.lenght > 0 && <p>Something went wrong: {error}</p>}
        <div className="p-surveillance--cameras">
            {sources.map(source => <VideoStreamRTC key={source} source={source} token={token} width={640} height={480} />)}
        </div>
        {sources.length === 0 && <p>No video sources available at the moment! Please start a camera.</p>}
    </div>
}