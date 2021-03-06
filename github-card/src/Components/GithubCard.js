import React from 'react'
import axios from 'axios'
import './GithubCard.css'

class GithubCard extends React.Component {
    state = {
        username: "",
        userData: [],
        myData: []
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

        axios.get(`https://api.github.com/users/${username}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    myData: res.data
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
                <div 
                    className="followers-container"
                    key={follower.id}
                >
                    <p>{follower.login}</p>
                    <img
                    width="200"
                    height="200" 
                    src={follower.avatar_url} 
                    alt={follower.id}/>
                    <p>github link : {follower.url}</p>
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
                <div className="followers">
                    {renderedFollowers}
                </div>
                <div className="followers">
                    {this.state.myData.login}
                    {this.state.myData.bio}
                    <img src={this.state.myData.avatar_url} />
                </div>
            </div>
        )
    }
}

export default GithubCard