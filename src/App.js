import React, {useState, useEffect, useRef} from 'react';
import Axios from 'axios';

import Sidebar from './components/sidebar-components/Sidebar.js'
import Logo from './components/sidebar-components/Logo.js'
import NavList from './components/sidebar-components/NavList.js'
import NavItem from './components/sidebar-components/NavItem.js'
import PlayLists from './components/sidebar-components/PlayLists.js'
import FeaturedPlaylist from './components/sidebar-components/FeaturedPlaylist.js'
import FeaturedItem from './components/sidebar-components/FeaturedItem.js'
import OtherPlaylist from './components/sidebar-components/OtherPlaylist.js'
import InstallCTA from './components/sidebar-components/InstallCTA.js'
import Footer from './components/footer-components/Footer.js'
import CTAbanner from './components/footer-components/CTAbanner'
import Player from './components/footer-components/Player'
import Featured from './components/featured-components/Featured.js'
import Loading from './components/featured-components/Loading.js'


import getHashParams from './utilities/getHashParams'
import reqWithToken from './utilities/reqWithToken'
import {UserContext, LoginContext, TokenContext, MessageContext, PlayContext} from './utilities/context'

function App() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setloggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfo, setuserInfo] = useState({})
  const [playlists, setPlaylists] = useState([])

  const [status, setStatus] = useState(false) 
  const [message, setMessage] = useState('')

  const timerRef = useRef(null)

  useEffect(() => {
    var params = getHashParams();
    const {access_token, error} = params

    var cancelSource = Axios.CancelToken.source()
    if (error){
      setLoading(false)
      setStatusMessage(`ERROR: ${error}`)
    }else{
      if (access_token) {
        setToken(access_token)
        setloggedIn(true)
        window.location.hash = ''

        const makeRequests = async() => {
          const requestUserInfo = reqWithToken('https://api.spotify.com/v1/me', access_token, cancelSource) 
          const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, access_token, cancelSource)

          try{
            const [_userInfo, _playlists] = await Promise.all([requestUserInfo(), requestPlayList()])
            setuserInfo(_userInfo.data)
            setPlaylists(_playlists.data.items)
          }catch(error){
            setStatusMessage(`LOGIN ERROR: ${error}`)
          }
        }
        
        makeRequests()

        setLoading(false)
      //If nothing is found on in the hash params -> check with the server if there is a valid refresh token in the cookie
      }else{
        Axios(`${process.env.REACT_APP_BACK_URI}/refresh_token`, {withCredentials: true})
          .then((response) => {
            const access_token = response.data.access_token
            setToken(access_token)
            setloggedIn(true)
            
            const makeRequests = async() => {
              const requestUserInfo = reqWithToken('https://api.spotify.com/v1/me', access_token, cancelSource) 
              const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, access_token, cancelSource)
    
              try{
                const [_userInfo, _playlists] = await Promise.all([requestUserInfo(), requestPlayList()])
                setuserInfo(_userInfo.data)
                setPlaylists(_playlists.data.items)

              }catch(error){
                console.log(error)
              }
            }
            
            makeRequests()
            setLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setLoading(false)
            return
          })
      }
    }
    return (()=> {
      cancelSource.cancel()
      clearTimeout(timerRef.current)
    })
  }, [])

  const refreshPlaylist= () =>{
    const source = Axios.CancelToken.source()
    const requestPlayList = reqWithToken(`https://api.spotify.com/v1/me/playlists`, token, source)
    requestPlayList()
      .then(response => setPlaylists(response.data.items))
      .catch(error => console.log(error))
  }

  const setStatusMessage = (message) => {
      clearTimeout(timerRef.current)
      setStatus(true)
      setMessage(message)
      timerRef.current = setTimeout(() => {
          setStatus(false)
      }, 3000)
  }


  const playerRef = useRef(null)
  const updatePlayer = () => {
    playerRef.current.updateState()
  }

  return (
    <div className="App">
      {loading? 
        <Loading type='app'/> :
        <MessageContext.Provider value={setStatusMessage}>
          <LoginContext.Provider
            value={loggedIn}>
              
              <Sidebar>
                <Logo />
                <NavList>
                  <NavItem to='/' exact={true} name='Home' label='Home' />
                  <NavItem to='/search' exact={true} name='Search' label='Search' />
                  <NavItem to='/collection' exact={false} name='Library' label='Your Library' data_tip='library' data_for='tooltip' data_event='click' style={{ pointerEvents: loggedIn? 'auto':'none'}}/>
                </NavList>
                <PlayLists 
                  top={<FeaturedPlaylist>
                          <FeaturedItem label='Liked Songs' loggedIn={loggedIn} />
                        </FeaturedPlaylist>}
                  bottom={<OtherPlaylist playlists={playlists}/>}
                />
                {loggedIn? <InstallCTA /> : null}
              </Sidebar>
              
              <PlayContext.Provider value={updatePlayer}>
                <TokenContext.Provider value={token}>
                    <UserContext.Provider value={userInfo}>
                      <Featured loggedIn={loggedIn} playlists={playlists} refreshPlaylist={() => refreshPlaylist()} message={message} status={status} />
                    </UserContext.Provider>
                </TokenContext.Provider>
              </PlayContext.Provider>

              <Footer>
                {loggedIn? <Player token={token} ref={playerRef}/>: <CTAbanner/>}
              </Footer>
                  
          </LoginContext.Provider>

        </MessageContext.Provider>
      }
    </div>
  );
}



export default App;
