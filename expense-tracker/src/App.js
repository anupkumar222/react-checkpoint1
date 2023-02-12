import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: "",
            calender: localStorage.getItem("calender") ? JSON.parse(localStorage.getItem("calender")) : [],
            
        }
    }
    setLocalStorage = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value) )

    }
    handleChange = (event) => {
        this.setState({
            activity: event.target.value
        })
    }
    handleClick = () => {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date();
        let name = month[d.getMonth()];
        let dates = Array.from({ length: 30 }, (_, i) => i + 1)
        let object = {};
        object.month = name
        object.text = this.state.activity
        dates.forEach((date) => {
            object[date] = false
        })
        this.setState({
            calender: this.state.calender.concat(object)

        }, ()=> this.setLocalStorage("calender", this.state.calender))

    }
    handleDelete= (calenderIndex) => {
        this.setState({
            calender: this.state.calender.filter((elm, index) => index !== calenderIndex)
        }, ()=> this.setLocalStorage("calender", this.state.calender))
    }
    handleState = (index, date) => {
        let newCalender = this.state.calender
         newCalender[index][date] = !newCalender[index][date];
        
        this.setState({
            calender: newCalender
        },()=> this.setLocalStorage("calender", this.state.calender))
    }
    render() {
        let { calender } = this.state
        console.log(calender)
   
        return (
            <>
                <div className="container">
                    <h1>
                        Monthly Activity Tracker
                    </h1>
                    <input
                        onChange={this.handleChange}
                        className="input"
                        placeholder="eg: coding"
                        name="input"
                        value={this.state.activity}
                    />
                    <button
                        className="button"
                        onClick={this.handleClick}
                    >Add Activity</button>
                </div>
                {calender.map((act, index) => (
                    <div className="container-calender">
                        <div className="flex month">
                            <div className="activity">
                                <h2>
                                    {act.text} 
                                </h2>
                                <p>{act.month}</p>
                            </div>
                            <div className="dates">
                                {Object.keys(act).filter(act => act !== "text" && act !== "month" ).map((date) => (
                                    <button 
                                    onClick={() => this.handleState(index, date)}
                                    className={act[date] ? "active date" : "date"}>{date}</button>
                                ))}

                            </div>
                        </div>
                        <button name="delete" 
                        className="delete is-medium has-background-danger"
                        onClick={() => this.handleDelete(index)}
                        >
                          X
                        </button>
                    </div>
                ))} 

            </>
        )
    }
}

export default App;