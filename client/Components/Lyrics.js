import React from 'react'

function Lyrics({data}) {
    return (
        <div>
           { data.map(lyric=>(
                <div className="card" style={{"width":"20%"}}>
                    <p>{lyric.content}</p>
                </div>
            ))
            }
        </div>
    )
}

export default Lyrics
