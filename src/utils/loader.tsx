import React from 'react'

const Loader = () =>{
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.loader}></div>
    </div>
  )
}

const styles = {
  loaderContainer: {
    position: 'absolute',
    top:'0px',
    left:'0px',
    width: '100vw',
    height:'100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties,
  loader: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  } as React.CSSProperties
}

export default Loader