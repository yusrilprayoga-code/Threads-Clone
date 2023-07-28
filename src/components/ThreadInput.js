import React from 'react'

const ThreadInput = ({user, text, setText, postThread}) => {
  return (
    <>
        <p>{user.handle}</p>
        <input 
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className='primary' onClick={postThread}>Post</button>
    </>
  )
}

export default ThreadInput