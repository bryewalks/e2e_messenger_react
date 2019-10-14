import * as React from 'react'
import axios from 'axios'

const LogoutView: React.FC = (props: any) => {

  React.useEffect(() => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    props.history.push('/')
  }, []);

  return (
    <div>
    </div>
  )
}

export default LogoutView