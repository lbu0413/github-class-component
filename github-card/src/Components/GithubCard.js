import React from 'react'
import axios from 'axios'

class GithubCard extends React.Component {
    state = {
        username: "",
        userData: []
    }
    
    fetchUser = (username) => {
        axios.get(`https://api.github.com/users/${username}/followers`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    userData: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    changeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.fetchUser(this.state.username)
        this.setState({ username: "" })
    }


    render(){
        const renderedFollowers = this.state.userData.map(follower => {
            return(
                <div>
                    {follower.login}
                    <img
                    width="200"
                    height="200" 
                    src={follower.avatar_url} 
                    alt={follower.id}/>
                    github link : {follower.url}
                </div>
            )
        })
        
        return(
            <div>
                <h1>Github Followers Card</h1>
                <form onSubmit={this.submitHandler}>
                    <input 
                        type="text"
                        onChange={this.changeHandler}
                        value={this.state.username}
                    />
                    <button>Submit</button>
                </form>
                <div>
                    {renderedFollowers}
                </div>
            </div>
        )
    }
}

export default GithubCard