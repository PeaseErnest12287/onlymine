import React from 'react'

function TeamMember(props) {
    const {name, qualification, message} = props.member
    return (
        <div>
            <div><h1>{name}</h1></div>
            <div><h4>{qualification}</h4></div>
            <div><p>{message}</p></div>
            {/* <div><img/>{image}</div> */}

            
        </div>
    )
}

export default TeamMember
